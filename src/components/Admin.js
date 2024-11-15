import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // For navigation
import modiPhoto from '../assets/modi.jpg';
import akhileshPhoto from '../assets/akhilesh.jpeg';
import rahulPhoto from '../assets/rahul.jpeg';
import mamtaPhoto from '../assets/mamta.jpeg';
import arvindPhoto from '../assets/arvind.jpeg';
import mayawatiPhoto from '../assets/mayawati.jpeg';
import './Admin.css';

const candidateData = [
    { id: 1, name: 'Narendra Modi', party: 'Bharatiya Janata Party (BJP)', symbol: '🌸', photo: modiPhoto },
    { id: 2, name: 'Rahul Gandhi', party: 'Indian National Congress (INC)', symbol: '✋', photo: rahulPhoto },
    { id: 3, name: 'Mamata Banerjee', party: 'All India Trinamool Congress (AITC)', symbol: '🌾', photo: mamtaPhoto },
    { id: 4, name: 'Akhilesh Yadav', party: 'Samajwadi Party', symbol: '🚲', photo: akhileshPhoto },
    { id: 5, name: 'Arvind Kejriwal', party: 'Aam Aadmi Party', symbol: '🧹', photo: arvindPhoto },
    { id: 6, name: 'Mayawati', party: 'Bahujan Samaj Party', symbol: '🐘', photo: mayawatiPhoto },
];

const Admin = () => {
    const [candidates, setCandidates] = useState([]);
    const navigate = useNavigate();  // Hook for navigation

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/fetchVotes');
                const votesData = response.data;

                const updatedCandidates = candidateData.map(candidate => {
                    const candidateVotes = votesData.find(v => v.candidate === candidate.name);
                    return { ...candidate, count: candidateVotes ? candidateVotes.count : 0 };
                });

                // Sort candidates by vote count in descending order
                updatedCandidates.sort((a, b) => b.count - a.count);
                setCandidates(updatedCandidates);
            } catch (error) {
                console.error("Error fetching vote data:", error);
            }
        };
        fetchVotes();
    }, []);

    const handleCardClick = (candidateName) => {
        // Navigate to the new page for the candidate
        navigate(`/voters/${candidateName}`);
    };

    return (
        <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {candidates.map((candidate, index) => (
                    <div key={candidate.id} className="card" onClick={() => handleCardClick(candidate.name)}>
                        <img src={candidate.photo} alt={candidate.name} className="w-24 h-24 object-cover rounded-md" />
                        <div className='symbol'>Symbol: {candidate.symbol}</div>
                        <div className="text-center mt-2">
                            <div className="vote-count">
                                Votes: {candidate.count}
                            </div>
                            <div className="rank">
                                Rank: {index + 1}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;
