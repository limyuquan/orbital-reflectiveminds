import React, { useState } from 'react';
import './dashboard.css';
import { FaTags } from "react-icons/fa";

const JournalTag = (props) => {
    const [isTagBoard, setIsTagBoard] = useState(false);

    const openTagBoard = (event) => {
        event.preventDefault();
        setIsTagBoard(!isTagBoard);
    }

    const renderJournalTags = (map) => {
        let JournalTagsMap = map;
        return Array.from(JournalTagsMap.entries()).map(([key, value]) => (
            <div className='journal-tag'>
                {key} {value}
            </div>
        ))
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