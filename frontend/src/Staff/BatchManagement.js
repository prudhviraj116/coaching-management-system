import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Staff/BatchManagement.css'; // Ensure this CSS file includes styles for the close button

const BatchManagement = ({ setView }) => {
  const [batchId, setBatchId] = useState('');
  const [batchName, setBatchName] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [batches, setBatches] = useState([]);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/studentportal/batches/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBatches(response.data);
      } catch (error) {
        console.error('Error fetching batches:', error);
        setMessage('Failed to fetch batches. Please try again later.');
        setMessageType('error');
      }
    };

    fetchBatches();
  }, [token]);

  const handleCreateBatch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/studentportal/createnewbatch/', 
        { batch_id: batchId, batch_name: batchName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setMessage(response.data.message);
      setMessageType('success');
      setBatchId('');
      setBatchName('');
      const updatedResponse = await axios.get('http://127.0.0.1:8000/studentportal/batches/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBatches(updatedResponse.data);
    } catch (error) {
      if (error.response) {
        setMessage('Error creating batch: ' + (error.response.data.message || 'Unknown error'));
        setMessageType('error');
      } else if (error.request) {
        setMessage('Error creating batch: No response from server.');
        setMessageType('error');
      } else {
        setMessage('Error creating batch: ' + error.message);
        setMessageType('error');
      }
    }
  };

  const handleClose = () => {
    setView(null); // Adjust this according to your view management
  };

  return (
    <div className='batch-management'>
      <div className="header">
        <button onClick={handleClose} type="button" className="close-button-man">
          &times;
        </button>
        <h2>Batch Management</h2>
      </div>
      <div className="form-section">
        <h3>Create New Batch</h3>
        <form onSubmit={handleCreateBatch}>
          <div className="form-group">
            <label htmlFor="batchId">Batch ID:</label>
            <input
              type="text"
              id="batchId"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              required
            />
            <label htmlFor="batchName">Batch Name:</label>
            <input
              type="text"
              id="batchName"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Create Batch</button>
        </form>
        {message && <p className={`message ${messageType}`}>{message}</p>}
      </div>
      <div className='batch-list'>
        <h3>View Batches</h3>
        <ul>
          {batches.map((batch) => (
            <li key={batch.batch_id}>
              <Link to={`/batch/${batch.batch_id}/students/`}>
                {batch.batch_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BatchManagement;
