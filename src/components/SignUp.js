import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import signupImage from './signup.png';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    dob: '',
    voterId: '',
    email: '',
    phone: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setErrorMessage('');
    setSuccessMessage('');

    // Age validation based on Date of Birth
    const enteredAge = parseInt(formData.age);
    const enteredDob = new Date(formData.dob);
    const today = new Date();
    const calculatedAge = today.getFullYear() - enteredDob.getFullYear();
    const dobMonth = today.getMonth() - enteredDob.getMonth();
    
    // Adjust for cases when the birthday hasn't occurred yet this year
    if (dobMonth < 0 || (dobMonth === 0 && today.getDate() < enteredDob.getDate())) {
      calculatedAge--;
    }

    // Check if entered age matches the calculated age from the DOB
    if (enteredAge !== calculatedAge) {
      setErrorMessage("The entered age doesn't match the Date of Birth.");
      return;
    }

    // Age validation (below 18)
    if (enteredAge < 18) {
      setErrorMessage("Candidates below 18 years are not eligible to vote.");
      return;
    }

    // Basic check for empty fields
    const { firstName, lastName, age, dob, voterId, email, phone } = formData;
    if (!firstName || !lastName || !age || !dob || !voterId || !email || !phone) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Assuming a successful response returns a JSON object with `success: true`
        const data = await response.json();
        if (data.success) {
          setSuccessMessage("Registration successful!");
          navigate('/login', { state: { voterId: formData.voterId } });
        } else {
          setErrorMessage("Registration failed. Try again.");
        }
      } else {
        // If response is not OK, handle specific status codes
        setErrorMessage("Registration failed. Please check the details and try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while registering. Please try again later.");
    }
  };

  return (
    <div className="signup-page">
      <div className="container mt-5">
        <h2 className="mb-4 text-start">New Registration</h2>
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="p-4 shadow-sm bg-white rounded form-container">
              {/* First Name Field */}
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" className="form-control small-textfield" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>

              {/* Last Name Field */}
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control small-textfield" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>

              {/* Age Field */}
              <div className="mb-3">
                <label htmlFor="age" className="form-label">Your Age</label>
                <input type="number" className="form-control small-textfield" id="age" name="age" value={formData.age} onChange={handleChange} min="0" required />
              </div>

              {/* Date of Birth Field */}
              <div className="mb-3">
                <label htmlFor="dob" className="form-label">Date of Birth</label>
                <input type="date" className="form-control small-textfield" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
              </div>

              {/* Voter ID Field */}
              <div className="mb-3">
                <label htmlFor="voterId" className="form-label">Voter ID</label>
                <input type="text" className="form-control small-textfield" id="voterId" name="voterId" value={formData.voterId} onChange={handleChange} required />
              </div>

              {/* Email Field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control small-textfield" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>

              {/* Phone Number Field */}
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input type="tel" className="form-control small-textfield" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </form>

            {/* Display Messages */}
            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
          </div>

        </div>
      </div>
          {/* Image Column */}
          <div className="img-reg">
            <img src={signupImage} alt="Registration" className="registration-img" />
          </div>
    </div>
  );
};

export default SignUp;
