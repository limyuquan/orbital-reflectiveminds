import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/Dashboard'; // import your Dashboard component
import JournalEntry from './components/journalEntry/JournalEntry'; // import your JournalEntry component
import LoginForm from './components/loginform/LoginForm'; //import login form
import RegisterForm from './components/loginform/RegisterForm'; //import register form

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="/journalEntry" element={<JournalEntry/>} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;