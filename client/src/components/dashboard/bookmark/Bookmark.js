import React, { useState } from "react";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import './dashboard.css';

const Bookmark = (props) => {
    const [isBookmarkedButton, setIsBookmarkedButton] = useState(props.isBookmarked === 1)

    const handleBookmarkClick = (e) => {
        props.bookmarkButton(props.entryId);
        setIsBookmarkedButton(!isBookmarkedButton)
        e.stopPropagation();
    };

    return (
        <div>
            {isBookmarkedButton ? (
                <div onClick={handleBookmarkClick} className="entry-bookmark">
                    <IoBookmark size={22} style={{ color: 'red' }} />
                </div>
            ) : (
                <div onClick={handleBookmarkClick} className="entry-bookmark">
                    <IoBookmarkOutline size={22} />
                </div>
            )}
        </div>
    );
};

export default Bookmark;
