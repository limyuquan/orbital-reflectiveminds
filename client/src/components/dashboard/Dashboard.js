import {React, useEffect, useState } from 'react';
import './dashboard.css';
import PreviousEntries from './PreviousEntries'; // Import the PreviousEntries component
import { useNavigate, useLocation} from 'react-router-dom'; // Import the useHistory hook
import WordCloud from './WordCloud';
import DateCalendarServerRequest from './calendar';

function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate(); // Get the navigate function
    const userId = location.state?.userId || null;
    const [streakCount, setStreakCount] = useState(0);
    useEffect(() => {
      if (userId === null) {
        navigate('/login');
      }
    }, [userId, navigate]); // Add userId and navigate as dependencies

    const handleNewEntryClick = () => {
        navigate('/journalEntry', { state: { userId: userId} }); // Navigate to the newEntry page
    };

    const getStreakCount = (dates) => {
      // Step 1: Sort the dates in descending order
      dates.sort((a, b) => b - a);
    
      let streak = 0;
      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Normalize current date to remove time part
    
      for (let i = 0; i < dates.length; i++) {
        const entryDate = new Date(dates[i]);
        entryDate.setHours(0, 0, 0, 0); // Normalize entry date
    
        // Calculate the difference in days
        const diffTime = Math.abs(currentDate - entryDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
        if (diffDays === 1) {
          streak++;
          currentDate = entryDate; // Update current comparison date for the next iteration
        } else if (diffDays > 1) {
          break; // Streak ends if there's a gap of more than one day
        } else if (diffDays === 0 && i === 0) {
          // Special case for the first entry being today
          streak++;
          currentDate = entryDate;
        }
      }
      setStreakCount(streak); // Update the state with the calculated streak
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
            {streakCount !== 0 && <div className="dashboard-streaks">Streaks: 🔥 {streakCount} {streakCount > 1 ? "Days": "Day"}</div>}
        </div>
        <div className="dashboard-mid">
          <div className="dashboard-left">
            <WordCloud userId={userId} />
          </div>
          <div className="dashboard-right">
            <DateCalendarServerRequest userId={userId} />
          </div>
        </div>
        <PreviousEntries userId={userId} getStreakCount={getStreakCount}/> 
      </div>
    </div>
  );
}

export default Dashboard;