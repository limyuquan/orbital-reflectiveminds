import React, { useState, useEffect, useRef } from 'react';
import './dashboard.css';
import SearchButton from './SearchButton';
import JournalTag from './JournalTags';
import Loader from '../shared/loader';

import Bookmark from './Bookmark';
import BookmarkDropdownButton from './BookmarkDropdownButton';
import UnpinBookmark from './UnpinBookmark';

function PreviousEntries({ userId }) {
  const [entries, setEntries] = useState([]);
  const [allEntries, setAllEntries] = useState([]);

  const [tags, setTags] = useState([]);  //all tags in string array
  const [filteredTags, setFilteredTags] = useState({});

  const [search, setSearch] = useState('');
  const [curPage, setCurPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  const [showLoader, setShowLoader] = useState(false);
  const [journalEntriesLoaded, setJournalEntriesLoaded] = useState(false); // Flag to track journal entries loading state
  const [showBookmarks, setShowBookmarks] = useState(false);

  const [bookmarkEntries, setBookmarkEntries] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState([]);

  const JournalTagsMap = new Map();

  useEffect(() => {
    getJournalEntries();
  }, [curPage]); // Add this useEffect hook 

  useEffect(() => {
    getJournalEntries();
  }, [filteredTags])

  useEffect(() => {
    if (journalEntriesLoaded) {
      postBookmarkEntries();
    }
  }, [journalEntriesLoaded, isBookmarked])

  useEffect(() => {
    if (journalEntriesLoaded) {
      bookmarkEntry(isBookmarked);
    }
  }, [journalEntriesLoaded]);

  function postBookmarkEntries() {
    let newIsBookmarked = [...isBookmarked].map(num => num.toString());

    const body = {
      user_id: userId,
      bookmark_entries: newIsBookmarked
    }

    const apiUrl = process.env.REACT_APP_API_URL;

    fetch(`${apiUrl}/api/dashboard/post-bookmark-entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => response.json())
      .then(data => console.log(data.message))
      .catch(error => {
        console.error('Error:', error);
      })
  }

  function getJournalEntries() {
    // Replace this with a fetch call to the server
    const body = {
      curPage: curPage,
      user_id: userId,
      filtered_tags: filteredTags,
    }
    setShowLoader(true);

    const apiUrl = process.env.REACT_APP_API_URL;

    fetch(`${apiUrl}/api/dashboard/get-entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        setIsBookmarked(data.bookmark);
        setEntries(data.journals);
        setAllEntries(data.all_journals);
        setMaxPages(data.maxPages);
        setTags(data.tags);
        setShowLoader(false);
        setJournalEntriesLoaded(true);
      })
      .catch(error => {
        console.error('Error:', error);
        setShowLoader(false);
      });
  }

  const checkLengthBookmark = () => {  //checks if any bookmarked entries exist, returns a boolean
    let result = false;
    bookmarkEntries.forEach(entry => {
      if (entry) {
        result = true;
      }
    });
    console.log(result);
    return result;
  }

  const addToJournalTagsMap = (tagName) => {
    if (tagName == 'default_value' || tagName == '') {
      return null;
    }
    if (!JournalTagsMap.has(tagName)) {
      JournalTagsMap.set(tagName, 1)
    }
    else {
      JournalTagsMap.set(tagName, JournalTagsMap.get(tagName) + 1);
    }
  }

  const convertEntriesToStringArray = (entries) => {
    entries.map(entry => {
      entry.split(',').map(tag => {
        //add each string element into map
        addToJournalTagsMap(tag);
      });
    })
  }

  const showTags = (tags) => {  //shows the tag for respective entries + adds the tags to the tag map ^^^
    if (!tags || tags == 'default_value') {
      return null;
    }
    const tagArray = tags.split(',');

    return (
      <div className="tag-row">
        {tagArray.map((tag) => {
          return (
            <div className="tag">
              {tag.trim()}
            </div>
          )
        })}
      </div>
    );
  }


  //Kept in PreviousEntry so that bookmarked entries will be saved, and not get lost for each re render
  const bookmarkEntry = (isBookmarked, target = undefined) => {   //adds bookmarked entries to be displayed
    let newBookmarkedEntries = [...bookmarkEntries];

    //remove the target first
    if (target !== undefined && newBookmarkedEntries[target] !== undefined) {
      newBookmarkedEntries[target] = undefined;
    }

    for (const index of isBookmarked) {
      newBookmarkedEntries[index] = { index, ...allEntries[index] };
    }

    setBookmarkEntries(newBookmarkedEntries);
  }

  const bookmarkButton = (index) => {    //adds the buttonID to a collection of active bookmarks
    let newIsBookmarked = [...isBookmarked];
    if (newIsBookmarked.includes(index)) {
      const indexToRemove = newIsBookmarked.indexOf(index);
      newIsBookmarked.splice(indexToRemove, 1);
    } else { 
      newIsBookmarked.push(index);
    }
    setIsBookmarked(newIsBookmarked);
    return newIsBookmarked;
  }

  const addEntry = (index) => {   //adds the EntryID to the marked bookmarks & bookmarked entries
    let newIsBookmarked = bookmarkButton(index);
    bookmarkEntry(newIsBookmarked, index);
  }


  convertEntriesToStringArray(tags);
  return (
    <div>
      {checkLengthBookmark()
        ? <div className='bookmark-entries-container'>
          <div className='bookmark-entries-header'>
            <h1 className='previous-entries-title'>Bookmarked Entries</h1>
            <BookmarkDropdownButton setShowBookmarks={setShowBookmarks} showBookmarks={showBookmarks}/>
          </div>

          {showBookmarks && <div className="all-entries-container">
            {bookmarkEntries.map((bookmarkEntry) => {

              if (bookmarkEntry === undefined) {
                return null; // Skip rendering if bookmarkEntry is undefined
              }
              return (
                <div key={bookmarkEntry.id} className="entry">
                  <div className="entry-header">

                    <div className='entry-title-tags'>
                      <p className="entry-title">{bookmarkEntry.title}</p>
                      <p className="entry-tags">{showTags(bookmarkEntry.tags)}</p>
                    </div>

                    <div className='entry-emotion-bookmark'>
                      <p className="entry-emotion">Emotion: {bookmarkEntry.emotion}</p>
                      <UnpinBookmark entryId={bookmarkEntry.id} addEntry={addEntry} isBookmarked={isBookmarked} />
                    </div>
                  </div>
                  <p className="entry-text" style={{ whiteSpace: 'pre-wrap' }}>{bookmarkEntry.content}</p>
                  <b className="entry-date">{bookmarkEntry.date}</b>
                </div>
              )
            })}
          </div>}
        </div>

        : null

      }

      <div className="previous-entries-container">
        {showLoader && <Loader />}
        <div className="previous-entries-header">
          <h1 className="previous-entries-title">Previous Entries</h1>
          <div className='previous-entries-journaltag-search'>
            <JournalTag JournalTagsMap={JournalTagsMap} filteredTags={filteredTags} setFilteredTags={setFilteredTags} />
            <SearchButton />
          </div>
        </div>
        <div className="all-entries-container">
          {entries.map((entry) => {
            return (
              <div key={entry.id} className="entry">
                <div className="entry-header">

                  <div className='entry-title-tags'>
                    <p className="entry-title">{entry.title}</p>
                    <p className="entry-tags">{showTags(entry.tags)}</p>
                  </div>

                  <div className='entry-emotion-bookmark'>
                    <p className="entry-emotion">Emotion: {entry.emotion}</p>
                    <Bookmark entryId={entry.id} addEntry={addEntry} isBookmarked={isBookmarked} />
                  </div>
                </div>
                <p className="entry-text" style={{ whiteSpace: 'pre-wrap' }}>{entry.content}</p>
                <b className="entry-date">{entry.date}</b>
              </div>
            )
          })}
          {(entries.length === 0) && (<p>You haven't created any journal entries yet.</p>)}
        </div>

        <div className="pagination-container">
          {curPage !== 1 && <div className="pagination-btn" onClick={() => setCurPage(curPage - 1)}><i className="fas fa-arrow-left" /></div>}
          {(curPage !== maxPages) && <div className="pagination-btn" onClick={() => setCurPage(curPage + 1)}><i className="fas fa-arrow-right" /></div>}
        </div>
      </div>
    </div>
  );
}

export default PreviousEntries;