import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'animate.css';
import './UpcomingElections.css';

const UpcomingElections = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email,voterId } = location.state || {};

  const handleVoteClick = (election) => {
    if (email) {
      navigate(`/elections/${election}`, { state: { email, election,voterId } });
    } else {
      console.error('Email is missing!');
    }
  };

  return (
    <div className="elections-container">
      {/* Header */}
      <h1 className="page-title animate__animated animate__fadeInDown">
        🌍 Upcoming Elections
      </h1>
      
      {/* Flex container for Election Cards */}
      <div className="election-cards-container">
        
        {/* India Election Card */}
        <div className="election-card india-card animate__animated animate__fadeInLeft">
          <div>
            <div className="card-header">
              <span className="flag">🇮🇳</span>
              <h3 className="election-title">2024 India General Election</h3>
            </div>
            <p className="election-info">
              Scheduled from April 19 to June 1, 2024, this election will determine the 543 members of the 18th Lok Sabha. Results will be announced on June 4, 2024.
            </p>
          </div>
          <div>
            <button
              onClick={() => handleVoteClick('india')}
              className="vote-button"
            >
              Vote Now
            </button>
          </div>
        </div>

        {/* US Election Card */}
        <div className="election-card us-card animate__animated animate__fadeInRight">
          <div>
            <div className="card-header">
              <span className="flag">🇺🇸</span>
              <h3 className="election-title">2024 US Presidential Election</h3>
            </div>
            <p className="election-info">
              The 60th quadrennial presidential election in the United States will take place on November 5, 2024, determining the nation’s next leader.
            </p>
          </div>
          <div>
            <button
              onClick={() => handleVoteClick('us')}
              className="vote-button"
            >
              Vote Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UpcomingElections;
