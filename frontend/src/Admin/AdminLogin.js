import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaLock } from "react-icons/fa";
import '../Admin/AdminLogin.css';  // Ensure this file exists and contains styles
import { logincontext } from '../App';

function AdminLogin() {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value
    }));
  };

  const navigate = useNavigate();
  const setIsAuthenticated = useContext(logincontext)[0][1];
  const setToken = useContext(logincontext)[1][1];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loginUrl = 'http://localhost:8000/staffportal/admin-login/';
    const credentials = {
      username: login.username,
      password: login.password,
    };

    try {
      const response = await axios.post(loginUrl, credentials);
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('username', response.data.username || login.username);
        setToken(token);
        setIsAuthenticated(true);
        navigate('/admindashboard');
      }

    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      setIsAuthenticated(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate('/forgetpasswordstu');
  };

  return (
    <div className="world-admin-login-container">
      <div className="world-admin-login-box">
        <div className="world-admin-login-header">
          <h2>ADMIN LOGIN</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="world-admin-input-group">
            <FaUser className="world-admin-input-icon" />
            <input
              type="text"
              name="username"
              value={login.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>
          <div className="world-admin-input-group">
            <FaLock className="world-admin-input-icon" />
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="world-admin-options">
            <label>
              <input type="checkbox" /> Remember
            </label>
            <span onClick={handleForgotPassword} className="world-admin-forgot-password-link" style={{cursor: 'pointer'}}>
              Forgot Password
            </span>
          </div>
          <button type="submit" className="world-admin-button">Login</button>
        </form>
        <div className="world-admin-register">
          <p>Don't have an account?</p>
          <span className="world-admin-register-button" style={{cursor: 'pointer'}} onClick={() => navigate('/adminreg')}>
            REGISTER HERE
          </span>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
