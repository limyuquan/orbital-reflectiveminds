import React, { useState } from "react";
import { RiUnpinLine } from "react-icons/ri";

import './dashboard.css';

const UnpinBookmark = (props) => {
    return (
        <div>
            {props.isBookmarked.indexOf(props.entryId) !== -1 ? (
                <div onClick={() => props.addEntry(props.entryId)} className="entry-bookmark">
                    <RiUnpinLine size={22} style = { {color: 'red'} }/> 
                </div>
            ) : (
                <div onClick={() => props.addEntry(props.entryId)} className="entry-bookmark">
                    <RiUnpinLine size={22}/> 
                </div>
            )}
        </div>
        )
}

export default UnpinBookmark;