import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../Staff/videoForm.css';

const VideoForm = ({ setView }) => {
  const [batchNumber, setBatchNumber] = useState('');
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState(null); // 'success' or 'error'

  // Create a ref for the file input
  const fileInputRef = useRef(null);

  // Retrieve token from localStorage
  const token = localStorage.getItem('authToken');

  const handleBatchNumberChange = (e) => setBatchNumber(e.target.value);

  const handleDateChange = (e) => setDate(e.target.value);

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (batchNumber && date && title && videoFile) {
      const formData = new FormData();
      formData.append('batch', batchNumber);
      formData.append('upload_date', date); // Ensure the field name matches your Django model
      formData.append('title', title);
      formData.append('video_file', videoFile);

      try {
        const response = await axios.post('http://127.0.0.1:8000/studentportal/daily_videos/', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 201) {
          setRegistrationStatus('success');

          // Reset form fields
          setBatchNumber('');
          setDate('');
          setTitle('');
          setVideoFile(null);

          // Clear the file input
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }

          // Optionally close the form view
          setView('false');
        } else {
          setRegistrationStatus('error');
        }
      } catch (error) {
        setRegistrationStatus('error');
        console.error('Error:', error.response ? error.response.data : error.message);
      }
    } else {
      setRegistrationStatus('error');
    }
  };

  return (
    <div className='video-cont'>
      <form className="video-form" onSubmit={handleSubmit}>
        <button onClick={() => setView('false')} type="button" className="close-button-video">
          &times;
        </button>
        <div className="video-form-group">
          <label htmlFor="video-batchNumber">Batch Number</label>
          <input
            type="text"
            id="video-batchNumber"
            value={batchNumber}
            onChange={handleBatchNumberChange}
            required
          />
        </div>
        <div className="video-form-group">
          <label htmlFor="video-date">Date</label>
          <input
            type="date"
            id="video-date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>
        <div className="video-form-group">
          <label htmlFor="video-title">Title</label>
          <input
            type="text"
            id="video-title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="video-form-group">
          <label htmlFor="video-upload">Upload Video</label>
          <input
            type="file"
            id="video-upload"
            accept="video/*"
            onChange={handleVideoChange}
            required
            ref={fileInputRef}
          />
        </div>
        <button type="submit">Submit</button>

        {registrationStatus && (
          <div className={`message ${registrationStatus}`}>
            <p>{registrationStatus === 'success' ? 'Video upload successful!' : 'Upload failed. Please try again.'}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default VideoForm;
