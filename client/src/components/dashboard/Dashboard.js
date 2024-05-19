import React, { useState } from 'react';
import './dashboard.css';
import PreviousEntries from './PreviousEntries'; // Import the PreviousEntries component
import { useNavigate } from 'react-router-dom'; // Import the useHistory hook

function Dashboard() {
    const navigate = useNavigate(); // Get the navigate function

    const handleNewEntryClick = () => {
        navigate('/newEntry'); // Navigate to the newEntry page
    };

  return (
    <div className="dashboard">
      <h1 className="app-title">REFLECTIVE MINDS</h1>
      <div className="dashboard-main">
        <div className="journal-intro">
            <h1 className="journal-text">JOURNAL</h1>
            <p className="journal-intro-p">Start writing your <span className="mind">mind</span>.</p>
        </div>
        <div className="new-entry-container">
            <div className="new-entry-btn" onClick={handleNewEntryClick}>
                <i className="fas fa-pen-fancy"></i>
                <p>New Entry</p>
            </div>
        </div>
        <PreviousEntries/> 
      </div>
    </div>
  );
}

export default Dashboard;