import React from "react";
import UnpinBookmark from "./UnpinBookmark";

//<UnpinBookmark entryId={bookmarkEntry.entryID} bookmarkButton={props.bookmarkButton} isBookmarked={bookmarkEntry.bookmark} />

const BookmarkDropdownMenu = (props) => {
    return (
        <div>
            {props.bookmarkEntries.length > 0 ?
                (
                    <div className='bookmark-entries-container'>
                        <div className='bookmark-entries-header'>
                            <h1 className='previous-entries-title'>Bookmarked Entries</h1>
                        </div>

                        <div className="all-entries-container">
                            {props.bookmarkEntries.map(bookmarkEntry=> {
                                return (
                                    <div key={bookmarkEntry.id} className="entry" onClick={(e) => {props.handleEditEntryClick(bookmarkEntry, e)}}>
                                        <div className="entry-header">

                                            <div className='entry-title-tags'>
                                                <p className="entry-title">{bookmarkEntry.title}</p>
                                                <p className="entry-tags">{props.showTags(bookmarkEntry.tags)}</p>
                                            </div>

                                            <div className='entry-emotion-bookmark'>
                                                <p className="entry-emotion">Emotion: {bookmarkEntry.emotion}</p>
                                            </div>
                                        </div>
                                        <p className="entry-text" style={{ whiteSpace: 'pre-wrap' }}>{bookmarkEntry.content}</p>
                                        <b className="entry-date">{bookmarkEntry.date}</b>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
                : null}
        </div>
    )
}

export default BookmarkDropdownMenu