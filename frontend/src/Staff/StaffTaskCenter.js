import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Staff/StaffTaskCenter.css';

const StaffTaskCenter = ({ setView }) => {
  const [taskContent, setTaskContent] = useState('');
  const [image, setImage] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [batches, setBatches] = useState([]);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/studentportal/batches/');
        if (Array.isArray(response.data)) {
          setBatches(response.data);
        } else {
          console.warn('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching batches:', error.response ? error.response.data : error.message);
      }
    };

    fetchBatches();
  }, []);

  const handleTaskContentChange = (e) => setTaskContent(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleBatchChange = (e) => setSelectedBatch(e.target.value);

  const handleSubmit = async (taskType) => {
    if (!selectedBatch) {
      alert('Please select a batch.');
      return;
    }

    const formData = new FormData();
    formData.append('task_type', taskType);
    formData.append('content', taskContent);
    formData.append('batch', selectedBatch);

    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://127.0.0.1:8000/studentportal/tasks/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      alert('Task submitted successfully!');
      // Reset all fields after successful submission
      setTaskContent('');
      setImage(null);
      setSelectedBatch('');
      setActiveSection(''); // Optionally close the section
    } catch (error) {
      console.error('Error submitting task:', error.response ? error.response.data : error.message);
      alert('Failed to submit task. Please try again.');
    }
  };

  return (
    <div className='main_container1'>
      <div className="staff-task-center">
        <h2>Task Center</h2>
        <button onClick={() => setView('false')} type="button" className="staff-close-button">
          &times;
        </button>
        <div className="section-buttons">
          <button onClick={() => setActiveSection('Weekly Test')}>Weekly Test Task</button>
          <button onClick={() => setActiveSection('Lab Task')}>Lab Task</button>
        </div>
        {(activeSection === 'Weekly Test' || activeSection === 'Lab Task') && (
          <div className="task-cards">
            <h3>{activeSection}</h3>
            <textarea 
              value={taskContent}
              onChange={handleTaskContentChange}
              placeholder={activeSection === 'Weekly Test' ? "Write the task here..." : "Write the task here..."}
            ></textarea>
            {(activeSection === 'Weekly Test' || activeSection === 'Lab Task') && (
              <input type="file" accept="image/*" onChange={handleImageChange} />
            )}
            <select value={selectedBatch} onChange={handleBatchChange}>
              <option value="">Select Batch</option>
              {batches.length === 0 ? (
                <option value="" disabled>No batches available</option>
              ) : (
                batches.map((batch) => (
                  <option key={batch.batch_id} value={batch.batch_id}>
                    {batch.batch_name}
                  </option>
                ))
              )}
            </select>
            <button onClick={() => handleSubmit(activeSection)}>
              {activeSection === 'Lab Task' ? 'Submit' : 'Submit'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffTaskCenter;
