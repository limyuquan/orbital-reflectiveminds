import React from 'react';
import './index.css';
import '../dashboard/dashboard.css';
import { useNavigate } from 'react-router-dom'; // Import the useHistory hook

function Index() {
    const navigate = useNavigate(); // Get the navigate function



  return (
    <div className="index">
        <h1 className="app-title">REFLECTIVE MINDS</h1>
        <div className="index-container">
            <div className="index-title">Your Personal Growth <span className="journal-underline">Journal</span></div>
            <h3 className="index-secondary">A minimal online journaling app with daily prompts and powerful guides to help you grow into your best self.</h3>
            <div className="index-btn" onClick={ () => {navigate('/login')}}>Start Your Journal Journey Today</div>
        </div>

    </div>
  );
}

export default Index;