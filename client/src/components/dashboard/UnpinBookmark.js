import React, { useState } from "react";
import { RiUnpinLine } from "react-icons/ri";

import './dashboard.css';

const UnpinBookmark = (props) => {
    
    const handleBookmarkClick = (e) => {
        props.bookmarkButton(props.entryId);
        e.stopPropagation();
    };

    return (
        <div>
            <div onClick={handleBookmarkClick} className="entry-bookmark">
                <RiUnpinLine size={22} style = { {color: 'red'} }/> 
            </div>
        </div>
        )
}

export default UnpinBookmark;