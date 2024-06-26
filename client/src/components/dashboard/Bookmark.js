import React, { useState } from "react";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";

import './dashboard.css';

const Bookmark = (props) => {
    return (
        <div>
            {props.isBookmarked.indexOf(props.entryId) !== -1 ? (
                <div onClick={() => props.addEntry(props.entryId)} className="entry-bookmark">
                    <IoBookmark size={22} style = { {color: 'red'} }/> 
                </div>
            ) : (
                <div onClick={() => props.addEntry(props.entryId)} className="entry-bookmark">
                    <IoBookmarkOutline size={22}/> 
                </div>
            )}
        </div>
        )
}

export default Bookmark;