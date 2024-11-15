import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';  // Import useNavigate for navigation
import modiPhoto from '../assets/modi.jpg';  
import akhileshPhoto from '../assets/akhilesh.jpeg';
import rahulPhoto from '../assets/rahul.jpeg'; 
import mamtaPhoto from '../assets/mamta.jpeg'; 
import arvindPhoto from '../assets/arvind.jpeg'; 
import mayawatiPhoto from '../assets/mayawati.jpeg';
import './ElectionCandidates.css';

const ElectionCandidates = () => {
  const navigate = useNavigate();  
  const location = useLocation();  
  const { email, voterId } = location.state || {};  // Extract email and voterId from location state passed from UpcomingElections


  const candidates = [
    {
      id: 1,
      name: 'Narendra Modi',
      party: 'Bharatiya Janata Party (BJP)',
      symbol: '🌸',
      photo: modiPhoto,
    },
    {
      id: 2,
      name: 'Rahul Gandhi',
      party: 'Indian National Congress (INC)',
      symbol: '✋',
      photo: rahulPhoto,
    },
    {
      id: 3,
      name: 'Mamata Banerjee',
      party: 'All India Trinamool Congress (AITC)',
      symbol: '🌾',
      photo: mamtaPhoto,
    },
    {
      id: 4,
      name: 'Akhilesh Yadav',
      party: 'Samajwadi Party',
      symbol: '🚲',
      photo: akhileshPhoto,
    },
    {
      id: 5,
      name: 'Arvind Kejriwal',
      party: 'Aam Aadmi Party',
      symbol: '🧹',
      photo: arvindPhoto,
    },
    {
      id: 6,
      name: 'Mayawati',
      party: 'Bahujan Samaj Party',
      symbol: '🐘',
      photo: mayawatiPhoto,
    },
  ];

  const handleVoteClick = (candidate) => {
    navigate('/confirm-vote', { state: {email, selectedCandidate: candidate, voterId }});
  };

  return (
    <div className="election-container">
      <h1 className="election-header">Candidates for Election</h1>
      <div className="candidate-cards">
        {candidates.map((candidate) => (
          <div className="candidate-card" key={candidate.id}>
            <div className="card-inner">
              <div className="card-front">
                <img
                  src={candidate.photo}
                  className="candidate-photo"
                  alt={candidate.name}
                />
                <h5 className="candidate-name">{candidate.name}</h5>
                <p className="candidate-party">{candidate.party}</p>
              </div>
              <div className="card-back">
                <p className="candidate-symbol">
                  Symbol: <span>{candidate.symbol}</span>
                </p>
                <button
                  className="vote-button"
                  onClick={() => handleVoteClick(candidate)}
                >
                  Vote
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectionCandidates;
    