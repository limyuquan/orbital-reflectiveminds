import React, { useState, useEffect } from 'react';
import './dashboard.css';
import SearchButton from './SearchButton';

function PreviousEntries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getJournalEntries();
  }, []); // Add this useEffect hook

  function addJournalEntry() {
    const entry = getJournalEntries();
    setEntries([...entries, entry]);
  }

  function getJournalEntries() {
    // Replace this with a fetch call to the server
    fetch('/api/get-entries')
      .then(response => response.json())
      .then(data => {
        const journalEntries = data.journals
        setEntries(journalEntries);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="previous-entries-container">
      <div className="previous-entries-header">
        <h1 className="previous-entries-title">Previous Entries</h1>
        <SearchButton />
      </div>
      <div className="all-entries-container">
        {entries.map(entry => (
          <div key={entry.id} className="entry">
            <div className="entry-header">
              <p className="entry-title">{entry.title}</p>
              <p className="entry-emotion">Emotion: {entry.emotion}</p>
            </div>
            <p className="entry-text">{entry.content}</p>
            <b className="entry-date">{entry.date}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreviousEntries;