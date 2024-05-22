import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/Dashboard'; // import your Dashboard component
import JournalEntry from './components/journalEntry/JournalEntry'; // import your JournalEntry component]

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journalEntry" element={<JournalEntry />} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;