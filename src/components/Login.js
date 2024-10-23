import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import loginImage from './signin.png';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/upcoming-elections');
  };

  return (
    <div className="login-background">
      <div className="row justify-content-center align-items-center w-100">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img src={loginImage} alt="Login" className="img-fluid" />
        </div>
        <div className="col-md-6">
          <div className="login-wrapper">
            <div className="form-container">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control short-input"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control short-input"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
