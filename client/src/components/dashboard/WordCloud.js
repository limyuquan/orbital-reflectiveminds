import React, { useState, useEffect } from 'react';
import ReactWordcloud from 'react-wordcloud';


import './dashboard.css';

function WordCloud({userId}) {
    const [words, setWords] = useState([]);

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
    // Replace this with a fetch call to the server
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
        })
        .catch(error => {
        console.error('Error:', error);
        });
    }
  return (
    <div className="wordcloud-container">
        {words.length > 0 && <div className='wordcloud-title'>Your Emotional Landscape, Visualised.</div>}
        {words.length === 0 && <div className='wordcloud-title'>Create your first entry now!</div>}
        <ReactWordcloud words={words} options={options} size={[700, 400]} />
    </div>
    
);
}

export default WordCloud;