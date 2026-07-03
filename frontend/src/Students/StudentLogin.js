import React, { useContext, useState } from 'react';
import '../Students/StudentLogin.css'; // Ensure this path is correct
import image from '../assets/images/bg.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logincontext } from '../App';

function StudentLogin1({ setView }) {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [[isAuthenticated, setIsAuthenticated], [token, setToken]] = useContext(logincontext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginUrl = 'http://localhost:8000/studentportal/student-login/';
    const credentials = {
      username: login.username,
      password: login.password,
    };

    try {
      const resp = await axios.post(loginUrl, credentials);
      console.log('API Response:', resp.data); // Check the structure of the response

      if (resp.status === 200) {
        const { token, student_id, batch_id, ...studentDetails } = resp.data;

        // Print token and student details separately to the console for debugging
        console.log('Token:', token);
        console.log('Student ID:', student_id);
        console.log('Batch ID:', batch_id);
        console.log('Student Details:', studentDetails);

        // Store token and student details in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', 'student');
        localStorage.setItem('username', resp.data.username || login.username);
        localStorage.setItem('studentId', student_id);
        localStorage.setItem('batchId', batch_id);
        localStorage.setItem('studentDetails', JSON.stringify(studentDetails));

        setToken(token);
        setIsAuthenticated(true);
        navigate('/studentdashbord'); // Ensure this route is correct
      } else {
        setIsAuthenticated(false);
        setError('Login failed. Please check your credentials.');
      }

    } catch (err) {
      console.error('Login error:', err);
      setIsAuthenticated(false);
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    navigate('/studentreg');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate('/forgetpasswordstu'); // Navigate to the forgot password view
  };

  return (
    <div className="login-student-page">
      <div className="login-student-section">
        <div className='login-student-image-block'>
          <img src={image} alt="Illustration" className="login-student-side-image" />       
        </div>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="login-student-input-container">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={login.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-student-input-container">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={login.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-student-options">
            <label>
              <input type="checkbox" /> Remember
            </label>
            <a href="#" onClick={handleForgotPassword}>Forgot password?</a>
          </div>
          <button type="submit" className="login-student-button">Login</button>
          <button type="button" className="login-student-create-account-button" onClick={handleCreateAccount}>Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin1;
