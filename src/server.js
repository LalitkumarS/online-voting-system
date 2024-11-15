const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/votingApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('MongoDB connection error:', err));

// Define schemas for User, Registration, and Votes
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const registrationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  dob: Date,
  voterId: String,
  email: String,
  phone: String,
});

const voteSchema = new mongoose.Schema({
    email: { type: String, required: true },
    candidate: { type: String, required: true }
});



const User = mongoose.model('User', userSchema);
const Registration = mongoose.model('Registration', registrationSchema);
const Vote = mongoose.model('Vote', voteSchema);

// Registration Endpoint
app.post('/api/register', async (req, res) => {
  const { firstName, lastName, age, dob, voterId, email, phone } = req.body;

  // Check if required fields are provided
  if (!firstName || !lastName || !age || !dob || !voterId || !email || !phone) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    // Create and save new registration
    const registration = new Registration({ firstName, lastName, age, dob, voterId, email, phone });
    await registration.save();
    res.json({ success: true, message: 'Registration successful!' });
  } catch (error) {
    console.error('Error saving registration:', error);
    res.status(500).json({ success: false, message: 'Registration failed. Please try again.' });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = new User({ email, password });
    await user.save();
    res.json({ message: 'Login data saved!' });
  } catch (error) {
    console.error('Error saving login data:', error);
    res.status(500).json({ message: 'An error occurred during login. Please try again.' });
  }
});

// Confirm Vote Endpoint
app.post('/submitVote', async (req, res) => {
    const { email, candidate } = req.body;
    try {
        const newVote = new Vote({ email, candidate });
        await newVote.save();
        res.status(200).send('Vote successfully recorded');
    } catch (error) {
        res.status(500).send('Error recording vote');
    }
});

app.get('/api/registrations', async (req, res) => {
  const { email } = req.query; // Get email from query parameters

  try {
    if (email) {
      const registration = await Registration.findOne({ email: email });
      if (registration) {
        return res.status(200).json({ voterId: registration.voterId ,firstName:registration.firstName});
      } else {
        return res.status(404).json({ message: 'Registration not found' });
      }
    } else {
      const registrations = await Registration.find();
      res.status(200).json(registrations);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


  app.listen(5000, () => console.log('Server running on port 5000'));
