import React, { useState, useEffect } from 'react';
import ReactWordcloud from 'react-wordcloud';

import './dashboard.css';

function WordCloud({userId}) {
    const [words, setWords] = useState([]);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        getEmotionStats();
      }, []);

    const options = {
    fontSizes: [30, 100], // Increase these values to make the font size bigger
    spiral: 'rectangular',
    rotationAngles: [0, 90],
    padding: 20,
    rotations: 1,
    scale: 'sqrt',
    deterministic: true,
    // Other options...
    };

    function getEmotionStats() {
    
    if (fetching) {
        return;
    }
    setFetching(true);
    const body = {
        user_id: userId,
    }
    const apiUrl = process.env.REACT_APP_API_URL;
    fetch(`${apiUrl}/api/dashboard/get-emotion-stats`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
        setWords(data);
        setFetching(false);
        })
        .catch(error => {
        console.error('Error:', error);
        setFetching(false);
        });
    }
  return (
    <div className="wordcloud-container">
        {words.length === 0 && <div className='wordcloud-title'>Create your first entry now!</div>}
        {words.length > 0 && (<div className='wordcloud-title'>How you felt</div>)}
        <ReactWordcloud words={words} options={options} size={[700, 400]} />
    </div>
    
);
}

export default WordCloud;