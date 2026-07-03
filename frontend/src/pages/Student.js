import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Student.css';
import image from '../assets/studentlogin.png';
import Dashboardbutton from '../components/Dashboardbutton';

function LoginStudent() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your authentication logic here
    const isAuthenticated = true; // This should be replaced with actual authentication check
    
    if (isAuthenticated) {
      navigate('/dashbordstudent'); // Navigate to dashboard
    }

    setLogin({
      email: '',
      password: '',
    });
    console.log('Form submitted:', login);
  };

  return (
    <div className="student-login-page">
      <div className="student-login-section">
        <div className="student-image-block">
          <img src={image} alt="Illustration" className="student-side-image" />
        </div>
        <h2>Student Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="student-input-container">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={login.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="student-input-container">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={login.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="student-options">
            <label>
              <input type="checkbox" /> Remember
            </label>
            <Link to="/forgetpasswordstu" className="forgot-password-link">
              Forgot password?
            </Link>
          </div>
          <button type="submit" className="student-login-button">
            Login
          </button>
          <Link to="/studentreg" className="student-create-account-button">
            Create Account
          </Link>
        </form>
      </div>
     
    </div>
  );
}

export default LoginStudent;
