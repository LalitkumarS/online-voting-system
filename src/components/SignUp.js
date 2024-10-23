import React, { useState } from 'react';
import './SignUp.css';  // Import custom CSS for styling
import signupImage from './signup.png';  // Ensure correct path to image

const SignUp = () => {
  // Set up the initial state for form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    dob: '',
    voterId: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data:', formData);
  };

  return (
    <div className="signup-page"> {/* Apply light blue background */}
      <div className="container mt-5">
        <h2 className="mb-4 text-start">New Registration</h2> {/* Align heading to the left */}
        <div className="row justify-content-center align-items-center"> {/* Center form and image */}
          {/* Registration Form Column */}
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="p-4 shadow-sm bg-white rounded form-container">
              {/* First Name Field */}
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control small-textfield"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Last Name Field */}
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control small-textfield"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Age Field */}
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Your Age
                </label>
                <input
                  type="number"
                  className="form-control small-textfield"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="18"
                  required
                />
              </div>

              {/* Date of Birth Field */}
              <div className="mb-3">
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control small-textfield"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Voter ID Field */}
              <div className="mb-3">
                <label htmlFor="voterId" className="form-label">
                  Voter ID
                </label>
                <input
                  type="text"
                  className="form-control small-textfield"
                  id="voterId"
                  name="voterId"
                  value={formData.voterId}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </form>
          </div>

          {/* Image Column */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img src={signupImage} alt="Registration" className="img-fluid registration-img" /> {/* Image restored */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
