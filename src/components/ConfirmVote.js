import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ConfirmVote.css';

const ConfirmVote = () => {
  const [voteCasted, setVoteCasted] = useState(false);
  const location = useLocation();
  const voterId=localStorage.getItem("vid");
  const firstName=localStorage.getItem("name") || '';
  const { email, selectedCandidate } = location.state || {}; 

  useEffect(() => {
    if (!email || !selectedCandidate || !voterId || !firstName) {
      console.error('Missing required data.');
    }
  }, [email, selectedCandidate, voterId,firstName]);

  const handleConfirmVote = async () => {
    if (email && selectedCandidate && voterId&&firstName) {
      const voteDetails = { 
        email, 
        voterId,  
        candidate: selectedCandidate.name ,
        firstName:firstName
      };

      try {
        console.log("Submitting vote for", voteDetails);
        const response = await fetch('http://localhost:5001/api/saveVote', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(voteDetails),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();
        console.log('Vote submission result:', result);

        if (result.success) {
          setVoteCasted(true); 
        }
      } catch (error) {
        console.error('Error submitting vote:', error);
      }
    } else {
      // console.log(email,selectedCandidate,voterId);
      console.error('Required data not available.');
    }
  };

  if (!selectedCandidate) {
    return <p>No candidate selected.</p>;
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card animate__animated animate__fadeIn">
        <h2 className="text-blue-800 font-bold">Confirm Your Vote</h2>
        <div className="candidate-details text-center mt-3">
          <img
            src={selectedCandidate.photo}
            alt={selectedCandidate.name}
            className="candidate-photo"
          />
          <h5 className="candidate-name">{selectedCandidate.name}</h5>
          <p className="candidate-party">Party: {selectedCandidate.party}</p>
          <p className="vote-symbol">{selectedCandidate.symbol}</p>
          {!voteCasted ? (
            <button className="confirm-button" onClick={handleConfirmVote}>
              Confirm Vote
            </button>
          ) : (
            <div className="vote-success-message animate__animated animate__fadeInDown">
              <span>Vote casted successfully</span>
              <svg className="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmVote;
