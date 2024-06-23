import React, { useState } from 'react';
import './dashboard.css';
import { FaTags } from "react-icons/fa";

const JournalTag = (props) => {   //JournalTagsMap={JournalTagsMap} setFilteredTags={setFilteredTags}
    const [isTagBoard, setIsTagBoard] = useState(false);
    const [selectedTags, setSelectedTags] = useState(props.filteredTags);

    const openTagBoard = (event) => {
        event.preventDefault();
        setIsTagBoard(!isTagBoard);
    }

    const handleDivClick = (key) => {   //this will colour the selected tags n group them + only include entries with selected tags
        setSelectedTags(selectedTags => {
            let updatedTags;
            if (selectedTags[key] == undefined) {
                updatedTags = {
                    ...selectedTags,
                    [key]: true
                };
            } else {
                updatedTags = {
                    ...selectedTags
                };
                delete updatedTags[key];
            }
            props.setFilteredTags(updatedTags);
            return updatedTags;
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