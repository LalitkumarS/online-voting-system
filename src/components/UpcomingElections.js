import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'animate.css';

const UpcomingElections = () => {
  const navigate = useNavigate();

  const handleVoteClick = (election) => {
    navigate(`/elections/${election}`);
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-500 min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl text-white font-bold mb-8 animate__animated animate__fadeInDown">
        Upcoming Elections
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {/* Election Card */}
        <div className="bg-white w-80 p-6 rounded-lg shadow-xl transform transition duration-500 hover:scale-105 animate__animated animate__fadeInUp">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">2024 India General Election</h3>
          <p className="text-gray-600 mb-4">
            General elections will be held in India from 19 April 2024 to 1 June 2024 to elect the 543 members of the 18th Lok Sabha. The results will be announced on 4 June 2024.
          </p>
          <button
            onClick={() => handleVoteClick('india')}
            className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-blue-700 hover:shadow-lg animate__animated animate__pulse animate__infinite"
          >
            Participate/Vote
          </button>
        </div>

        {/* Another Election Card */}
        <div className="bg-white w-80 p-6 rounded-lg shadow-xl transform transition duration-500 hover:scale-105 animate__animated animate__fadeInUp">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">2024 US Presidential Election</h3>
          <p className="text-gray-600 mb-4">
            The 2024 United States presidential election will be the 60th quadrennial presidential election, scheduled for Tuesday, November 5, 2024.
          </p>
          <button
            onClick={() => handleVoteClick('us')}
            className="bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-blue-700 hover:shadow-lg animate__animated animate__pulse animate__infinite"
          >
            Participate/Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingElections;
