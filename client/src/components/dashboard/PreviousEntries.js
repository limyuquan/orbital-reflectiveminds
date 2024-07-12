import React, { useState, useEffect, useRef } from 'react';
import './dashboard.css';
import SearchButton from './SearchButton';
import JournalTag from './JournalTags';
import Loader from '../shared/loader';
import { useNavigate, useLocation } from 'react-router-dom'; // Import the useHistory hook
import { IoBookmarkOutline } from "react-icons/io5";


import Bookmark from './Bookmark';
import BookmarkDropdownButton from './BookmarkDropdownButton';
import UnpinBookmark from './UnpinBookmark';
import BookmarkDropdownMenu from './BookmarkDropdownMenu';

function PreviousEntries({ userId, getStreakCount }) {

  const navigate = useNavigate(); // Get the navigate function

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
  const [isBookmarkedButtons, setIsBookmarkedButtons] = useState([]);

  const [isFocused, setButtonIsFocused] = useState(false);
  const [buttonText, setButtonText] = useState(''); // Add a state variable for the text
  const [gettingJournalEntries, setGettingJournalEntries] = useState(false);

  const JournalTagsMap = new Map();
  const entryRefs = useRef({});

  useEffect(() => {
    getJournalEntries();
  }, [curPage, filteredTags]);

  const handleFocus = () => {
    setButtonIsFocused(true);
  };

  const handleBlur = () => {
    setButtonIsFocused(false);
  };

  const handleChange = (event) => { // Add an event handler for the text change
    setButtonText(event.target.value);
  };

  const handleKeyDown = (event) => { // Add an event handler for the key down event
    if (event.key === 'Enter') {
      getJournalEntries();
      setButtonIsFocused(false);
      setButtonText('');
    }
  };

  function getDatesFromEntries(entries) {
    let dates = [];
    entries.forEach(entry => {
      let date = new Date(entry.date);
      dates.push(date);
    });
    return getStreakCount(dates);
  }

  function getJournalEntries() {
    // Replace this with a fetch call to the server
    if (gettingJournalEntries) {
      return;
    }
    setGettingJournalEntries(true);
    const body = {
      curPage: curPage,
      user_id: userId,
      filtered_tags: filteredTags,
      search_query: buttonText,
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
        setEntries(data.journals);
        setAllEntries(data.all_journals);
        setMaxPages(data.maxPages);
        setTags(data.tags);
        setShowLoader(false);
        setJournalEntriesLoaded(true);
        bookmarkEntriesSetup(data.all_journals)
        getDatesFromEntries(data.all_journals)
        setGettingJournalEntries(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setShowLoader(false);
        setGettingJournalEntries(false);
      });
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


  const bookmarkEntriesSetup = (allEntries) => {
    let tempBookmarkEntries = []
    allEntries.forEach(entry => {
      if (entry.bookmark === 1) {
        tempBookmarkEntries.push(entry)
      }
    })
    setBookmarkEntries(tempBookmarkEntries)
    renderBookmarkEntries(tempBookmarkEntries)
  }

  const bookmarkButton = (index) => {    //adds the buttonID to a collection of active bookmarks
    //change bookmark to true
    const apiUrl = process.env.REACT_APP_API_URL;

    fetch(`${apiUrl}/api/dashboard/put-bookmark`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        entry_id: index
      })
    }).then(response => response.json())
      .then(data => console.log(data.message))
      .catch(error => {
        console.error('Error:', error);
      })

    let entrySaved = allEntries.find(entry => entry.entryID === index)

    if (bookmarkEntries.findIndex(entry => entry.entryID === entrySaved.entryID) !== -1) {

      const entryDiv = entryRefs.current[index];
      

      let tempBookmarkEntries = bookmarkEntries.filter(entry => entry.entryID !== index)

      setBookmarkEntries(tempBookmarkEntries)
      renderBookmarkEntries(tempBookmarkEntries)
    } else {
      entrySaved.bookmark = 1;
      setBookmarkEntries(prevBookmarkEntries => [...prevBookmarkEntries, entrySaved].sort((a, b) => b.entryID - a.entryID));
    }
  }

  const checkLengthBookmark = (bookmark_entries) => {  //checks if any bookmarked entries exist, returns a boolean
    if (bookmark_entries.length > 0) {
      return true;
    }
    return false;
  }

  const renderBookmarkEntries = (bookmark_entries) => {
    console.log('rendering ', bookmark_entries)
    console.log('got bookmark? ', checkLengthBookmark(bookmark_entries))
  }

  const handleEditEntryClick = (entry, e) => {
    e.stopPropagation();
    navigate('/journalEntry', { state: { userId: userId, entry: entry } }); // Navigate to the newEntry page
  };

  convertEntriesToStringArray(tags);
  return (
    <div>

      <BookmarkDropdownMenu bookmarkEntries={bookmarkEntries} showTags={showTags} bookmarkButton={bookmarkButton} userId={userId} handleEditEntryClick={handleEditEntryClick}/>

      <div className="previous-entries-container">
        {showLoader && <Loader />}
        <div className="previous-entries-header">
          <h1 className="previous-entries-title">Previous Entries</h1>
          <div className='previous-entries-journaltag-search'>
            <JournalTag JournalTagsMap={JournalTagsMap} filteredTags={filteredTags} setFilteredTags={setFilteredTags} />
            <div className="search-button">
              {isFocused && <input type="text" onBlur={handleBlur} onChange={handleChange} onKeyDown={handleKeyDown} value={buttonText} autoFocus />}
              {!isFocused && <i className="fas fa-search" onClick={handleFocus}> </i>}
            </div>
          </div>
        </div>
        <div className="all-entries-container">
          {entries.map((entry) => {
            
            return (
              <div key={entry.entryID} className="entry" onClick={(e) => handleEditEntryClick(entry, e)}>
                <div className="entry-header">

                  <div className='entry-title-tags'>
                    <p className="entry-title">{entry.title}</p>
                    <p className="entry-tags">{showTags(entry.tags)}</p>
                  </div>

                  <div className='entry-emotion-bookmark'>
                    <p className="entry-emotion">Emotion: {entry.emotion}</p>
                    <Bookmark entryId={entry.entryID} bookmarkButton={bookmarkButton} isBookmarked={entry.bookmark} />
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
          {curPage !== 1 && <div className="pagination-btn" onClick={() => setCurPage(curPage - 1)}><i className="fas fa-angle-left" /></div>}
          {(curPage !== maxPages) && <div className="pagination-btn" onClick={() => setCurPage(curPage + 1)}><i className="fas fa-angle-right" /></div>}
        </div>
      </div>
    </div>
  );
}

export default PreviousEntries;