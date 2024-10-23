import React from 'react';
import modiPhoto from '../assets/modi.jpg';  // Adjust the path to your image directory
import akhileshPhoto from '../assets/akhilesh.jpeg';
import rahulPhoto from '../assets/rahul.jpeg'; 
import mamtaPhoto from '../assets/mamta.jpeg'; 
import arvindPhoto from '../assets/arvind.jpeg'; 
import mayawatiPhoto from '../assets/mayawati.jpeg'; // Adjust the path

const ElectionCandidates = () => {
  const candidates = [
    {
      id: 1,
      name: 'Narendra Modi',
      party: 'Bharatiya Janata Party (BJP)',
      symbol: '🌸',
      photo: modiPhoto,  // Use imported image
    },
    {
      id: 2,
      name: 'Rahul Gandhi',
      party: 'Indian National Congress (INC)',
      symbol: '✋',
      photo: rahulPhoto,  // External URL for online images
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
      photo: akhileshPhoto,  // Use imported image
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

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Candidates for Election</h1>
      <div className="row justify-content-center">
        {candidates.map((candidate) => (
          <div className="col-md-4 col-sm-6 mb-4" key={candidate.id}>
            <div className="card h-100 text-center shadow">
              <img
                src={candidate.photo}
                className="card-img-top mx-auto img-fluid"
                style={{ width: '150px', height: '150px', objectFit: 'contain' }}
                alt={candidate.name}
              />
              <div className="card-body">
                <h5 className="card-title">{candidate.name}</h5>
                <p className="card-text">Party: {candidate.party}</p>
                <p className="card-text">
                  Symbol: <span className="text-lg">{candidate.symbol}</span>
                </p>
                <button className="btn btn-success mt-2">Vote</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectionCandidates;
