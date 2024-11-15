import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';  
import SignUp from './SignUp';  
import Login from './Login';  
import Admin from './Admin';  
import UpcomingElections from './UpcomingElections';
import ElectionCandidates from './ElectionCandidates';
import ConfirmVote from './ConfirmVote';
import 'animate.css';  // For animations
import VoterDetails from './VoterDetails'; 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upcoming-elections" element={<UpcomingElections />} />
        <Route path="/elections/:election" element={<ElectionCandidates />} />
        <Route path="/confirm-vote" element={<ConfirmVote />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/voters/:candidateName" element={<VoterDetails />} /> 
      </Routes>
    </Router>
  );
}

export default App;
