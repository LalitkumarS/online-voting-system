// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';  // Make sure this file exists and is correctly implemented
import SignUp from './SignUp';  // Ensure this component is defined correctly
import Login from './Login';  // This seems to be working
import Admin from './Admin';  
import UpcomingElections from './UpcomingElections';
import ElectionCandidates from './ElectionCandidates';
import 'animate.css';


// Ensure this component is correctly implemented
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* This is your default Home route */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upcoming-elections" element={<UpcomingElections />} />
        <Route path="/elections/:election" element={<ElectionCandidates />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;