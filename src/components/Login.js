import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const location = useLocation();
  // const voterId = location.state?.voterId;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Fetch voter ID based on email
      const response = await fetch(`http://localhost:5000/api/registrations?email=${formData.email}`);
      const data = await response.json();
      
      if (data && data.voterId) {
        // Store voterId in local storage and update formData with it
        localStorage.setItem("vid", data.voterId);
        localStorage.setItem("name", data.firstName);
        formData.voterId = data.voterId;
        formData.firstName = data.firstName;
      } else {
        console.error('Voter ID not found for this email');
        return;
      }
  
    } catch (error) {
      console.error('Error fetching voter ID:', error);
      return;
    }
  
    try {
      // Send login data to server
      await axios.post('http://localhost:5000/api/login', formData);
  
      // Navigate with the voterId and email
      navigate('/upcoming-elections', { state: { email: formData.email, voterId: formData.voterId ,firstName: formData.firstName} });
    } catch (error) {
      console.error('Error saving login data:', error);
    }
  };
  
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image">
          <img src="/signin.png" alt="Login" />
        </div>
        <div className="login-form">
          <h2>Welcome Back</h2>
          <p>Please log in to continue</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
