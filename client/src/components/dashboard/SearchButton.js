import React, { useState } from 'react';
import './dashboard.css';

function SearchButton() {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState(''); // Add a state variable for the text


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (event) => { // Add an event handler for the text change
    setText(event.target.value);
  };

  const handleSubmitQuery = () => {
    console.log('Search query:', text);
    // Perform a search with the text, TODO: fetch 
  }

  const handleKeyDown = (event) => { // Add an event handler for the key down event
    if (event.key === 'Enter') {
      handleSubmitQuery();
      setIsFocused(false);
        setText('');
    }
  };

  return (
    <div className="search-button">
        {isFocused && <input type="text" onBlur={handleBlur} onChange={handleChange} onKeyDown={handleKeyDown} value={text} autoFocus />}
        {!isFocused && <i className="fas fa-search" onClick={handleFocus}> </i>}
    </div>
  );
}

export default SearchButton;