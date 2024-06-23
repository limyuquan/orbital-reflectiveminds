import React, { useState } from 'react';
import './dashboard.css';
import { FaTags } from "react-icons/fa";

const JournalTag = (props) => {
    const [isTagBoard, setIsTagBoard] = useState(false);
    const [currentTag, setCurrentTag] = useState(false);
    const [selectedTags, setSelectedTags] = useState({})

    const openTagBoard = (event) => {
        event.preventDefault();
        setIsTagBoard(!isTagBoard);
    }

    const handleDivClick = (key) => {
        setSelectedTags(selectedTags => {
            if (selectedTags[key] == undefined) {
                return {
                    ...selectedTags,
                    [key]: true
                };
            } else {
                return {
                    ...selectedTags,
                    [key]: !selectedTags[key]
                };
            }
        })
    };

    const renderJournalTags = (map) => {
        let JournalTagsMap = map;
        return Array.from(JournalTagsMap).sort((a, b) => b[1] - a[1]).map(([key, value]) => {
            return (<div key={key} className='journal-tag' onClick={() => handleDivClick(key)} style={{ backgroundColor: selectedTags[key] ? '#f5ecb9' : '#ffffff' }}>
                {key} {value}
            </div>)
        })
    }

    return (
        <div className='journal-tag-section' >
            {isTagBoard &&
                <div className='journal-tag-board'>
                    {renderJournalTags(props.JournalTagsMap)}
                </div>
            }
            <button className='journal-tag-button' onClick={e => openTagBoard(e)}>
                <FaTags size={36} />
            </button>
        </div>
    )
}

export default JournalTag;