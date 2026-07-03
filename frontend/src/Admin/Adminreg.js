import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Adminreg.css';

const Adminreg = ({ setSelectedSection }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Password and Confirm Password do not match.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const adminData = {
      userrole: {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
      },
    };

    try {
      // Standardize on localhost:8000 for local development
      const response = await axios.post('http://localhost:8000/staffportal/createadmin/', adminData, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      
      console.log('Registration Response:', response.data);
      setSuccess(true);
      alert('Admin registered successfully! You can now log in.');
      
      // Navigate to login after successful registration
      if (setSelectedSection) {
        setSelectedSection('dashboard');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('AxiosError:', error.response ? error.response.data : error.message);
      const backendError = error.response?.data?.userrole 
          ? Object.values(error.response.data.userrole).flat().join(' ')
          : (error.response?.data?.error || 'Error registering admin. Please try again.');
      setError(backendError);
    }
  };

  return (
    <div className="adminreg-container-clean">
      <div className="adminreg-card-clean">
        <h2 className="adminreg-heading">Admin Registration</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">Registration Successful!</div>}
        
        <form onSubmit={handleSubmit} className="adminreg-form">
          <div className="form-group mb-3">
            <label>Username</label>
            <input
              type='text'
              name='username'
              className='form-control'
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type='email'
              name='email'
              className='form-control'
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type='password'
              name='password'
              className='form-control'
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              className='form-control'
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button className='btn btn-primary w-100' type='submit'>Register Admin</button>
          <p className="mt-3 text-center">
            Already have an account? <span className="adminreg-link" style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}} onClick={() => setSelectedSection ? setSelectedSection('dashboard') : navigate('/adminlogin')}>Sign in</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Adminreg;
