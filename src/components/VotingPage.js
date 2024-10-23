import React from "react";

const VotingPage = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">2024 India General Election</h1>
      <h3 className="text-center text-primary">GIVE Your Vote</h3>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Party</th>
            <th>Age</th>
            <th>Symbol</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src="modi.jpg" alt="Narendra Modi" width="50" /> Narendra Modi</td>
            <td>Bhartiya Janta Party</td>
            <td>73</td>
            <td>No image</td>
            <td><button className="btn btn-primary">VOTE</button></td>
          </tr>
          <tr>
            <td><img src="rahul.jpg" alt="Rahul Gandhi" width="50" /> Rahul Gandhi</td>
            <td>Indian National Congress</td>
            <td>53</td>
            <td>No image</td>
            <td><button className="btn btn-primary">VOTE</button></td>
          </tr>
          <tr>
            <td><img src="kejriwal.jpg" alt="Arvind Kejriwal" width="50" /> Arvind Kejriwal</td>
            <td>Aam Aadmi Party</td>
            <td>55</td>
            <td>No image</td>
            <td><button className="btn btn-primary">VOTE</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VotingPage;
