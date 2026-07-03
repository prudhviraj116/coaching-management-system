import React, { useState } from 'react';
import axios from 'axios';
import './ResumeViewed.css'; // Ensure you have the CSS file for styling

const ResumeViewed = ({ setView }) => {
  const [batchId, setBatchId] = useState('');
  const [resumes, setResumes] = useState([]); // Updated state to handle multiple resumes
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(true); // To control form visibility

  const handleBatchChange = (e) => {
    setBatchId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://127.0.0.1:8000/studentportal/get-student-info/${batchId}/`);
      
      // Log the response data
      console.log('Response Data:', response.data);

      if (response.data && response.data.length > 0) {
        setResumes(response.data); // Set all resumes
        setMessage('');
        setShowForm(false); // Hide form after fetching data
      } else {
        setResumes([]);
        setMessage('No resumes found for the selected batch.');
      }
    } catch (error) {
      console.error('Error fetching student info:', error);
      setMessage('Error fetching student info.');
      setResumes([]);
    }
  };

  const handleBackToSearch = () => {
    setShowForm(true);
    setBatchId('');
    setResumes([]);
    setMessage('');
  };

  return (
    <div className="resume-view-container">
      <button onClick={() => setView('false')} type="button" className="close-button-resume">
        &times;
      </button>
      <h2 className="page-title">View Resumes by Batch ID</h2>

      {showForm ? (
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={batchId}
            onChange={handleBatchChange}
            className="batch-input"
            placeholder="Enter Batch ID"
            required
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      ) : (
        <button className="back-button" onClick={handleBackToSearch}>
          Back to Search
        </button>
      )}

      {message && <p className="message">{message}</p>}

      {resumes.length > 0 && (
        <div className="resume-cards-container">
          {resumes.map((resume, index) => (
            <div key={index} className="resume-card">
              <div className="resume-header">
                <h3 className="resume-title">Resume Details</h3>
              </div>
              <div className="resume-content">
                <p className="resume-text">{resume.text || 'No description available.'}</p>
                {resume.resume_url ? (
                  <a href={`http://127.0.0.1:8000${resume.resume_url}`} className="resume-link" target="_blank" rel="noopener noreferrer">
                    View/Download Resume
                  </a>
                ) : (
                  <p className="no-resume">Resume URL is not available.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeViewed;
