import React, { useState } from 'react';
import axios from 'axios';
import './OutstandingFeesAndPayment.css'; // Import your CSS file for styling

const OutstandingFeesAndPayment = ({setView}) => {
  const [students, setStudents] = useState([]);
  const [batchId, setBatchId] = useState('');
  const [feeStatus, setFeeStatus] = useState('ALL');
  const [error, setError] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [paymentMessage, setPaymentMessage] = useState('');

  // Function to fetch students and fees
  const fetchStudents = async () => {
    if (!batchId) {
      setError('Batch ID is required.');
      return;
    }

    try {
      // Fetch student details
      const response = await axios.get(`http://127.0.0.1:8000/studentportal/students-with-outstanding-fees/${batchId}/${feeStatus}/`);
      setStudents(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching students or fees:', err);
      setError('Error fetching students or fees.');
    }
  };

  // Function to filter students based on status
  const filterStudentsByStatus = (students, status) => {
    if (status === 'ALL') {
      return students;
    }
    return students.filter(student => student.fee.fee_status === status);
  };

  // Handle payment submission
  const handlePaymentSubmit = async () => {
    if (!selectedStudentId || !amountPaid) {
      setPaymentError('Both student ID and amount paid are required.');
      return;
    }

    try {
      const response = await axios.put(`http://127.0.0.1:8000/studentportal/makepayment/${selectedStudentId}/`, { amount_paid: amountPaid });
      setPaymentMessage(response.data.message);
      setPaymentError('');
      fetchStudents(); // Refresh the student list
    } catch (err) {
      if (err.response && err.response.data) {
        setPaymentError(err.response.data.error);
      } else {
        setPaymentError('An unexpected error occurred.');
      }
      setPaymentMessage('');
    }
  };

  // Handle pay fee button click
  const handlePayFeeClick = (studentId) => {
    setSelectedStudentId(studentId);
  };


  const handleClose = () => {
    setView(null); // Adjust this according to your view management
  };

  const filteredStudents = filterStudentsByStatus(students, feeStatus);

  return (
    <div className="outstanding-fees-and-payment-container">
      <h1>Students with Outstanding Fees</h1>
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="batchId">Batch ID:</label>
          <input
            type="text"
            id="batchId"
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
            placeholder="Enter batch ID"
          />
          <button onClick={fetchStudents} className="submit-btn">Submit Batch ID</button>
        </div>
        <div className="filter-group">
          <label htmlFor="feeStatus">Filter by Fee Status:</label>
          <select id="feeStatus" value={feeStatus} onChange={(e) => setFeeStatus(e.target.value)}>
            <option value="ALL">All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      
      <div className="students-table">
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Batch</th>
              <th>Fee Status</th>
              <th>Amount Paid</th>
              <th>Total Amount</th>
              <th>Balance Due</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <tr key={student.student_id}> {/* Use 'student_id' as the unique key */}
                  <td>{student.student_id}</td> {/* Student ID */}
                  <td>{student.userrole.username}</td>
                  <td>{student.userrole.email}</td>
                  <td>{student.mobile_no}</td>
                  <td>{student.batch}</td>
                  <td>{student.fee.fee_status}</td>
                  <td>{student.fee.amount_paid}</td>
                  <td>{student.fee.total_amount}</td>
                  <td>{student.fee.balance_due}</td>
                  <td>
                    {student.fee.fee_status === 'pending' && (
                      <button onClick={() => handlePayFeeClick(student.student_id)} className="pay-fee-btn">Pay Fee</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {selectedStudentId && (
        <div className="payment-modal">
          <button onClick={() => setSelectedStudentId(null)} className="close-button-fee">
            &times;
          </button>
          <h1>Make Payment for Student ID: {selectedStudentId}</h1>
          <div className="payment-form">
            <div className="form-group">
              <label htmlFor="amountPaid">Amount Paid:</label>
              <input
                type="number"
                id="amountPaid"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                required
              />
            </div>
            <button onClick={handlePaymentSubmit} className="submit-button">Submit Payment</button>
            {paymentMessage && <p className="success-message">{paymentMessage}</p>}
            {paymentError && <p className="error-message">{paymentError}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default OutstandingFeesAndPayment;
