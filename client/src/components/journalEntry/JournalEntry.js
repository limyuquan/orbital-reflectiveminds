import React, { useState, useEffect } from 'react';
import './journalEntry.css';
import { useNavigate, useLocation } from 'react-router-dom'; // Import the useHistory hook
import EmotionMenu from './EmotionComponent/EmotionMenu'; //Import EmotionMenu
import Template from './TemplateHub/Templates'; //Import TemplateMenu

import Loader from '../shared/loader';

import TemplateDefault from './TemplateHub/TemplateDefault';
import GratitudeForm from './TemplateHub/Gratitude';
import GoalSetting from './TemplateHub/GoalSetting';
import EventTemplate from './TemplateHub/EventTemplate';
import DailyReflection from './TemplateHub/DailyReflection';
import Book from './TemplateHub/Book';
import Travel from './TemplateHub/Travel';
import Weekend from './TemplateHub/Weekend';
import AchievementPopup from '../shared/AchievementPopup';

import OpenAI from './OpenAI';

function JournalEntry() {
    const navigate = useNavigate();

    const location = useLocation();
    const userId = location.state?.userId || null;
    const oldTitle = location.state?.entry?.title || '';
    const oldContent = location.state?.entry?.content || '';
    const oldEmotion = location.state?.entry?.emotion || '';
    const oldJournalTags = location.state?.entry?.journalTags || '';
    const oldJournalId = location.state?.entry?.entryID || null;

    useEffect(() => {
        if (userId === null) {
            navigate('/login');
        }
    }, [userId, navigate]);


    const [openAIPrompt, setOpenAIPrompt] = useState('');
    const [isPrompt, setIsPrompt] = useState(false);

    const [title, setTitle] = useState(oldTitle || '');
    const [content, setContent] = useState(oldContent || '');
    const [emotion, setEmotion] = useState(oldEmotion || '');

    const [tagName, setTagName] = useState('');
    const [tags, setTags] = useState(oldJournalTags || []);
    const [isTagInput, setIsTagInput] = useState(true);

    const [emotionMenu, setEmotionMenu] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showAchievementPopup, setShowAchievementPopup] = useState(false);
    const [templateNumber, setTemplateNumber] = useState(0);
    const [achievement, setAchievement] = useState({
        title: '',
        description: ''
    });

    const ACHIEVEMENT_LIST = [
        {
            index: 0,
            title: "First Entry 🎉",
            description: "Write your first journal entry",
        },
        {
            index: 1,
            title: "5-Day Streak 🌟",
            description: "Write a journal entry for 5 consecutive days",
        },
        {
            index: 2,
            title: "10-Day Streak 🌟🌟",
            description: "Write a journal entry for 10 consecutive days",
        },
        {
            index: 3,
            title: "25-Day Streak 🌟🌟🌟",
            description: "Write a journal entry for 25 consecutive days",
        },
        {
            index: 4,
            title: "50-Day Streak 🌟🌟🌟🌟",
            description: "Write a journal entry for 50 consecutive days",
        },
        {
            index: 5,
            title: "100-Day Streak 🌟🌟🌟🌟🌟",
            description: "Write a journal entry for 100 consecutive days",
        },
        {
            index: 6,
            title: "500 Words 📝",
            description: "Write a total of 500 words",
        },
        {
            index: 7,
            title: "1000 Words 📝📝",
            description: "Write a total of 1000 words",
            status: "Incomplete"
        },
        {
            index: 8,
            title: "2000 Words 📝📝📝",
            description: "Write a total of 2000 words",
        },
    ];
    

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (content) => {
        setContent(content);
    };

    const handleEmotionChange = (feeling) => {  //changed from event to feeling, using event causes runtime errors when passed into child component EmotionMenu
        setEmotion(feeling);
    };

    const showEmotionMenu = (event) => {
        setEmotionMenu(!emotionMenu);
    }

    const chooseTemplate = (number) => {
        setTemplateNumber(number);
    }

    const handleTagInput = (event) => {
        event.preventDefault();
        setIsTagInput(!isTagInput);
        if (tagName.trim()) {
            setTags([...tags, tagName.trim()]);
            setTagName('');
        }
    };

    const handleDelete = (event, index) => {
        event.preventDefault();
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);
    };

    const handleInputChange = (e) => {
        setTagName(e.target.value);
    };

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
            emotion: emotion,
            journalTags: tags.join(','),
            entry_id: oldJournalId
        }

        const apiUrl = process.env.REACT_APP_API_URL;
        setShowLoader(true);
        
        if (oldJournalId) {
            fetch(`${apiUrl}/api/entry/update-journal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(journalEntry)
            })
            .then(response => response.json())
            .then(data => {
                setShowLoader(false);
                resetFields();
                alert('Journal entry updated successfully!');
                navigate('/dashboard', { state: { userId: userId } });
                
            }).catch((error) => {
                console.error('Error:', error);
            });
            return;
        }

        fetch(`${apiUrl}/api/entry/submit-new-journal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(journalEntry)
        }).then(response => response.json())
          .then(data => {
            resetFields();
            setShowLoader(false);
            console.log(data.new_achievements)
            if (data.new_achievements.length > 0) {
                const achievementIndex = data.new_achievements.pop();
                console.log(achievementIndex)
                console.log(ACHIEVEMENT_LIST[achievementIndex])
                setAchievement(ACHIEVEMENT_LIST[achievementIndex]);
                setShowAchievementPopup(true);
            } else {
                alert('Journal entry added successfully!');
                navigate('/dashboard', { state: { userId: userId } });
            }
        }
        ).catch((error) => {
            console.error('Error:', error);

        });
    }

    const navigateAchievements = () => {
        setShowAchievementPopup(false);
        navigate('/achievements', { state: { userId: userId } });
    }

    return (
        <div className="journal-entry">
            <div>
                {showLoader && <Loader />}
                <AchievementPopup isOpen={showAchievementPopup} achievement={achievement} onClose={navigateAchievements}/>
            </div>
            <div className="exit" onClick={handleReturnDashboard}><i className="fas fa-angle-left journal-exit"></i>Dashboard</div>
            <div className="new-title">{oldTitle === "" ? "NEW JOURNAL ENTRY" : "EDIT JOURNAL ENTRY"}</div>
            <div className='new-prompt'>
                {isPrompt && (<> <div className='prompt-set-title'>Today's Journaling Prompt <div className='set-prompt-title-button' onClick={() => setTitle(openAIPrompt)}>Set as Title</div></div>  <br/> <br  />{openAIPrompt}</>)}
                
            </div>

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
                                <h1 className='emotion-menu'>{<EmotionMenu handleEmotionChange={handleEmotionChange} showEmotionMenu={showEmotionMenu} />}</h1>
                            </div>)
                        }

                        <OpenAI setOpenAIPrompt={setOpenAIPrompt} setIsPrompt={setIsPrompt} isPrompt={isPrompt}></OpenAI>
                    </div>

                    <div className='journal-tags'>

                        {tags.map((tag, index) => (
                            <div key={index} id='tag'>
                                {tag}
                                <button onClick={(event) => handleDelete(event, index)} className='delete-button'>X</button>
                            </div>
                        ))}

                        <div>
                            {isTagInput && (

                                <div id='tag-input'>
                                    <input
                                        type='text'
                                        value={tagName}
                                        onChange={handleInputChange}
                                        placeholder='New tag'
                                        onKeyDown={(e) => e.key === 'Enter' && handleTagInput(e)}
                                    />
                                </div>
                            )}

                        </div>

                        {tags.length >= 5 ? null : <button className="add-tag-button" onClick={e => handleTagInput(e)}>Add tag</button>}
                    </div>

                    <div className='text-area'>
                        {
                            templateNumber == 0
                                ? <TemplateDefault content={content} handleContentChange={handleContentChange} />
                                : templateNumber == 1
                                    ? <GratitudeForm content={content} handleContentChange={handleContentChange} />
                                    : templateNumber == 2
                                        ? <GoalSetting content={content} handleContentChange={handleContentChange} />
                                        : templateNumber == 3
                                            ? <DailyReflection content={content} handleContentChange={handleContentChange} />
                                            : templateNumber == 4
                                                ? <EventTemplate content={content} handleContentChange={handleContentChange} />
                                                : templateNumber == 5
                                                    ? <Book content={content} handleContentChange={handleContentChange} />
                                                    : templateNumber == 6
                                                        ? <Travel content={content} handleContentChange={handleContentChange} />
                                                        : <Weekend content={content} handleContentChange={handleContentChange} />
                        }
                    </div>

                    <br />

                    <Template chooseTemplate={chooseTemplate} />

                    <input id="button" type="submit" value={oldTitle ? "Edit" : "Create"} onClick={handleSubmit} />
                </form>

            </div>

        </div>
    );
}

export default JournalEntry;