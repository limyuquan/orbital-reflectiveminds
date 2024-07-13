import './achievementpopup.css';
import './deletepopup.css';
import React, { useState } from 'react';

import { CgDanger } from "react-icons/cg";

function DeletePopup({ isOpen, setIsDelete, deleteEntry }) {
    const [inputValue, setInputValue] = useState('');

    if (isOpen === false) {
        return null;
    }

    const handlePopupClick = (e) => {
        e.stopPropagation();
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="popup-overlay" onClick={() => setIsDelete(false)}>
            <div className="popup" onClick={handlePopupClick}>
                <h2 className="popup-heading"><CgDanger size={32} className='danger-icon'/> Delete entry?</h2>
                <p className="popup-delete-1">This is permanent, all entry data here will be deleted.</p>
                <p className="popup-delete-2">Type 'delete' in the input below to delete.</p>
                <input
                    className='delete-input'
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder=''
                />
                <div>
                    <button onClick={(event) => {
                        deleteEntry(event, inputValue)
                    }}>Confirm</button>
                    <button onClick={() => setIsDelete(false)}>Cancel</button>
                </div>

            </div>
        </div>
    );
}

export default DeletePopup;