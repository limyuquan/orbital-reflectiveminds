import React, { useState, useEffect, useRef } from 'react';
import './dashboard.css';
import SearchButton from './SearchButton';
import JournalTag from './JournalTags';
import Loader from '../shared/loader';

function PreviousEntries({ userId }) {
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState('');
  const [curPage, setCurPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [showLoader, setShowLoader] = useState(false);

  const JournalTagsMap = new Map();

  useEffect(() => {
    getJournalEntries();
  }, [curPage]); // Add this useEffect hook

  function getJournalEntries() {
    // Replace this with a fetch call to the server
    const body = {
      curPage: curPage,
      user_id: userId,
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
        setMaxPages(data.maxPages);
        setShowLoader(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setShowLoader(false);
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


  const addToJournalTagsMap2 = (entries) => {
    entries.map(entry => {
      entry.tags.split(',').map(tag => {
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


  addToJournalTagsMap2(entries);
  return (
    <div className="previous-entries-container">
      {showLoader && <Loader />}
      <div className="previous-entries-header">
        <h1 className="previous-entries-title">Previous Entries</h1>
        <div className='previous-entries-journaltag-search'>
          <JournalTag JournalTagsMap={JournalTagsMap} />
          <SearchButton />
        </div>
      </div>
      <div className="all-entries-container">
        {entries.map(entry => {
          return (
            <div key={entry.id} className="entry">
              <div className="entry-header">

                <div className='entry-title-tags'>
                  <p className="entry-title">{entry.title}</p>
                  <p className="entry-tags">{showTags(entry.tags)}</p>
                </div>

                <p className="entry-emotion">Emotion: {entry.emotion}</p>
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
  );
}

export default PreviousEntries;