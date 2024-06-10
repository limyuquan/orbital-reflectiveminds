import React, { useState, useEffect } from 'react';
import './journalEntry.css';
import { useNavigate, useLocation } from 'react-router-dom'; // Import the useHistory hook
import EmotionMenu from './EmotionComponent/EmotionMenu';
import Loader from '../shared/loader';

function JournalEntry() {
    const navigate = useNavigate();

    const location = useLocation();
    const userId = location.state?.userId || null;

    useEffect(() => {
        if (userId === null) {
            navigate('/login');
        }
    }, [userId, navigate]);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [emotion, setEmotion] = useState('');
    const [emotionMenu, setEmotionMenu] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleEmotionChange = (feeling) => {  //changed from event to feeling, using event causes runtime errors when passed into child component EmotionMenu
        setEmotion(feeling);
    };

    const showEmotionMenu = (event) => {
        setEmotionMenu(!emotionMenu);
    }

    const resetFields = () => {
        setTitle('');
        setContent('');
        setEmotion('');
    }

    const handleReturnDashboard = () => {
        navigate('/dashboard', { state: { userId: userId } });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert('Both title and content must be filled out.');
            return;
        }

        if (!content.trim()) {
            alert('Content must be filled out.');
            return;
        }

        if (!emotion.trim()) {
            alert('Emotion must be filled out.');
            return;
        }

        const journalEntry = {
            user_id: userId,
            title: title,
            content: content,
            emotion: emotion
        }

        const apiUrl = process.env.REACT_APP_API_URL;
        setShowLoader(true);
        fetch(`${apiUrl}/api/entry/submit-new-journal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(journalEntry)
        }).then(() => {
            resetFields();
            alert('Journal entry created successfully!');
            navigate('/dashboard', { state: { userId: userId } });
            setShowLoader(false);
        }
        ).catch((error) => {
            console.error('Error:', error);

        });
    }

    return (
        <div className="journal-entry">
            <div>
                {showLoader && <Loader />}
            </div>
            <div className="exit" onClick={handleReturnDashboard}><i className="fas fa-angle-left"></i>Dashboard</div>
            <div className="new-title">NEW JOURNAL ENTRY</div>
            <div id="wrapper">

                <form id="paper" method="get" action="">
                    <div className="new-journal-header">
                        <div id="margin">Title:
                            <input id="title" type="text" name="title" value={title} onChange={handleTitleChange} />
                        </div>

                        <div id="margin">Emotion:
                        </div>

                        <div className='emotion-button'>
                            {!emotionMenu && (<button className='choose-emotion-button' onClick={showEmotionMenu}>
                                {emotion || `Choose emotions`}
                                </button>)}
                            {emotionMenu && (<button className='hide-emotion-button' onClick={showEmotionMenu}>
                                {emotion || `Hide emotions`}
                                </button>)}
                        </div>

                        {emotionMenu &&
                            (<div>
                                <h1 className='emotion-menu'>{<EmotionMenu handleEmotionChange={handleEmotionChange} showEmotionMenu={showEmotionMenu}/>}</h1>
                            </div>)
                        }
                    </div>



                    <textarea placeholder="What's on your mind today?" id="text" name="text" rows="10"
                        value={content}
                        onChange={handleContentChange}
                        style={{
                            outline: "none",
                            border: "none",
                            overflow: 'auto',
                            wordWrap: 'break-word',
                            resize: 'none',
                            height: '700px',
                            width: '510px'
                        }}>
                    </textarea>
                    <br />
                    <input id="button" type="submit" value="Create" onClick={handleSubmit} />
                </form>

            </div>

        </div>
    );
}

export default JournalEntry;