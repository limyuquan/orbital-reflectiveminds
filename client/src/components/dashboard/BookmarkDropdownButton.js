import React from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";


const BookmarkDropdownButton = (props) => {
    return (
        <div>
            {props.showBookmarks ? (
                <div className="bookmark-dropdown-button" onClick={() => props.setShowBookmarks(false)}>
                    <IoIosArrowDropdownCircle size={28}/>
                </div>
            ) : (<div className="bookmark-dropdown-button" onClick={() => props.setShowBookmarks(true)}>
                <IoIosArrowDropdownCircle size={28} style={{ transform: 'rotate(-90deg)' }}/>
            </div>)}
        </div>
    )
}

export default BookmarkDropdownButton;