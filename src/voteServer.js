const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  // For handling CORS (Cross-Origin Resource Sharing)

// Create the Express app
const app = express();

// Middleware to parse JSON and handle CORS
app.use(bodyParser.json());
app.use(cors());  // Allow cross-origin requests

// MongoDB connection (replace with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/election', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

const Vote = mongoose.model('Vote', new mongoose.Schema({
  email: { type: String},
  voterId: { type: String},  // Add voterId to the schema
  candidate: { type: String },
  firstName: { type: String, default: '' }  // Set default value for firstName
}));
// Route to handle vote submission
app.post('/api/saveVote', async (req, res) => {
  const { email, voterId, candidate ,firstName} = req.body;

  try {
    // Save the vote to the MongoDB database with email, voterId, and candidate
    const newVote = new Vote({ email, voterId, candidate,firstName });
    await newVote.save();
    res.json({ success: true, message: 'Vote saved successfully' });
  } catch (err) {
    console.error('Error saving vote:', err);
    res.status(500).json({ success: false, message: 'Failed to save vote' });
  }
});

// API route to fetch the vote count for each candidate
app.get('/api/fetchVotes', async (req, res) => {
  try {
      const votes = await Vote.aggregate([
          {
              $group: {
                  _id: "$candidate",
                  uniqueVoters: { $addToSet: "$voterId" }  // Collect unique voterIds per candidate
              }
          },
          {
              $project: {
                  candidate: "$_id",
                  count: { $size: "$uniqueVoters" }  // Count unique voterIds
              }
          },
          { $sort: { count: -1 } }  // Sort by count in descending order
      ]);
      res.json(votes);
  } catch (error) {
      console.error("Error fetching votes:", error);
      res.status(500).json({ error: "Failed to fetch votes" });
  }
});
// Route to get voters for a specific candidate
app.get('/api/getVoters/:candidateName', async (req, res) => {
  const { candidateName } = req.params;

  try {
    // Find all votes for the specified candidate
    const voters = await Vote.find({ candidate: candidateName }).select('email voterId firstName');

    res.json(voters);
  } catch (error) {
    console.error("Error fetching voters:", error);
    res.status(500).json({ error: "Failed to fetch voters" });
  }
});


// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
