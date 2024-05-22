import React, { useState } from 'react';
import './journalEntry.css';
import { useNavigate } from 'react-router-dom'; // Import the useHistory hook

function JournalEntry() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [emotion, setEmotion] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleEmotionChange = (event) => {
        setEmotion(event.target.value);
    };

    const resetFields = () => {
        setTitle('');
        setContent('');
        setEmotion('');
    }

    const handleReturnDashboard = () => {
        navigate('/dashboard');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() ) {
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
            title: title,
            content: content,
            emotion: emotion
        }

        fetch('/api/submit-new-journal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(journalEntry)
        }).then(() => {
            resetFields();
            alert('Journal entry created successfully!');
            navigate('/dashboard')
        }
        ).catch((error) => {
            console.error('Error:', error);

        });
    }

    return (
        <div className="journal-entry">
            <div className="exit" onClick={handleReturnDashboard}><i className="fas fa-angle-left"></i>Dashboard</div>
            <div className="new-title">NEW JOURNAL ENTRY</div>
            <div id="wrapper">

                <form id="paper" method="get" action="">
                    <div className="new-journal-header">
                        <div id="margin">Title: 
                            <input id="title" type="text" name="title" value={title} onChange={handleTitleChange}/>
                        </div>
                        <div id="margin">Emotion: 
                            <input id="title" className="emotion" type="text" name="title" value={emotion} onChange={handleEmotionChange}/>
                        </div>
                    </div>
                    
                    <textarea placeholder="What's on your mind today?" id="text" name="text" rows="10"
                        value={content}
                        onChange={handleContentChange}
                        style={{
                            outline:"none",
                            border:"none",
                            overflow: 'auto', 
                            wordWrap: 'break-word', 
                            resize: 'none', 
                            height: '700px',
                            width: '510px'
                        }}>
                    </textarea>  
                    <br/>
                    <input id="button" type="submit" value="Create" onClick={handleSubmit}/>
                </form>

            </div>
           
        </div>
    );
}

export default JournalEntry;