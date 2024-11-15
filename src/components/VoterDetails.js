import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './VoterDetails.css';

const VoterDetails = () => {
    const [voters, setVoters] = useState([]);
    const { candidateName } = useParams();  // Get the candidate name from the URL

    useEffect(() => {
        const fetchVoters = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/getVoters/${candidateName}`);
                setVoters(response.data);
            } catch (error) {
                console.error("Error fetching voter details:", error);
            }
        };

        fetchVoters();
    }, [candidateName]);

    return (
        <div className="container">
            <h2>Voters for {candidateName}</h2>
            <div className="voter-cards">
                {voters.length > 0 ? (
                    voters.map((voter, index) => (
                        <div key={index} className="voter-card">
                            <h5 className="voter-name">{voter.firstName || 'N/A'}</h5>
                            <p><strong>Email:</strong> {voter.email}</p>
                            <p><strong>Voter ID:</strong> {voter.voterId}</p>
                        </div>
                    ))
                ) : (
                    <p>No voters found for this candidate.</p>
                )}
            </div>
        </div>
    );

};

export default VoterDetails;
