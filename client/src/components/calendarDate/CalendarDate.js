import {React, useEffect} from 'react';
import '../dashboard/dashboard.css';
import './calendarDate.css';
import { useNavigate, useLocation } from 'react-router-dom'; // Import the useHistory hook
import { useState } from 'react';
import Loader from '../shared/loader';


function CalendarDate() {
    const location = useLocation();
    const navigate = useNavigate(); // Get the navigate function
    const userId = location.state?.userId || null;

    const [entries, setEntries] = useState([]);
    const [date, setDate] = useState(location.state?.date || new Date());
    const [dayOfWeek, setDayOfWeek] = useState(date ? new Date(date).toLocaleDateString('en-US', { weekday: 'long' }) : '');
    const [dateOfYear, setDateOfYear] = useState(date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '');
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
      if (userId === null) {
        navigate('/login');
      }
    }, [userId, navigate]); // Add userId and navigate as dependencies

    useEffect(() => {
        getEntries();
        setDayOfWeek(new Date(date).toLocaleDateString('en-US', { weekday: 'long' }));
        setDateOfYear(new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    }, [date]);

    const handleReturnDashboard = () => {
        navigate('/dashboard', { state: { userId: userId } });
    }
    
    const handleEditEntryClick = (entry, e) => {
        e.stopPropagation();
        navigate('/journalEntry', { state: { userId: userId, entry: entry} }); // Navigate to the newEntry page
    };

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

    const getEntries = () => {
        const body = {
            user_id: userId,
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        }
        const apiUrl = process.env.REACT_APP_API_URL;
        setShowLoader(true);
        fetch(`${apiUrl}/api/dashboard/get-entries-with-date`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(data => {
            setEntries(data);
            setShowLoader(false);
            })
            .catch(error => {
            console.error('Error:', error);
            setShowLoader(false);
            });
    }
    const incrementDay = () => {
        let newDate = new Date(date); // Create a new Date object based on the current date
        newDate.setDate(newDate.getDate() + 1); // Increment the day
        setDate(newDate); // Update the state
    }
    
    const decrementDay = () => {
        let newDate = new Date(date); // Create a new Date object based on the current date
        newDate.setDate(newDate.getDate() - 1); // Decrement the day
        setDate(newDate); // Update the state

    }

    return (
        <div className="dashboard">
        {showLoader && <Loader />}
        <h1 className="app-title calendar-exit" onClick={handleReturnDashboard}>REFLECTIVE MINDS</h1>
        <div className="calendar-header">
            <i className="fas fa-angle-left calendar-arrow" onClick={decrementDay}></i>
            <div className="calendar-title">{dayOfWeek} {dateOfYear}</div>
            <i className="fas fa-angle-right calendar-arrow" onClick={incrementDay}></i>
        </div>
        <div className="calendar-entries">
            <div className="all-entries-container">
            {entries.map((entry) => {
                return (
                <div key={entry.entryID-1} className="entry" onClick={(e) => handleEditEntryClick(entry, e)}>
                    <div className="entry-header">

                    <div className='entry-title-tags calendar-tag'>
                        <p className="entry-title">{entry.title}</p>
                        <div className="entry-tags">{showTags(entry.tags)}</div>
                    </div>

                    <div className='entry-emotion-bookmark'>
                        <p className="entry-emotion">Emotion: {entry.emotion}</p>
                    </div>
                    </div>
                    <p className="entry-text" style={{ whiteSpace: 'pre-wrap' }}>{entry.content}</p>
                    <b className="entry-date">{entry.date}</b>
                </div>
                )
            })}
            {(entries.length === 0) && (<p>No entries on this day</p>)}
            </div>
        </div>
        
        </div>
    );
}

export default CalendarDate;