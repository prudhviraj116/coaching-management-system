import React, { useState } from 'react';
import '../Staff/AttendanceStudent.css'; // Import updated CSS file

const AddAttendance = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [submittedBatch, setSubmittedBatch] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedBatch(batchNumber);
    setBatchNumber(''); // Clear the input field after submission if needed
  };

  return (
    <div className='Dashbord_css'>
    <div className="batch-form-container">
      <h2>Batch Number Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter Batch Number </label>
        <input
            type="text"
            value={batchNumber}
            onChange={(e) => setBatchNumber(e.target.value)}
          />
        <button type="submit">Submit</button>
      </form>

      {submittedBatch && (
        <div className="batch-table-container">
          <h2>Submitted Batch Number:</h2>
          <table>
            <thead>
              <tr>
                <th>Batch Number</th>
                <th>Student Name</th>
                <th>Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{submittedBatch}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default AddAttendance;
