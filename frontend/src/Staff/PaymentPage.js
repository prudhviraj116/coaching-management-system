import React, { useState } from 'react';
import axios from 'axios';
import './PaymentPage.css'; // Ensure you include the CSS file

const PaymentPage = ({ setView }) => {
  const [studentId, setStudentId] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId || !amountPaid) {
      setError('Both student ID and amount paid are required.');
      return;
    }

    try {
      const response = await axios.put(`http://127.0.0.1:8000/studentportal/makepayment/${studentId}/`, { amount_paid: amountPaid });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred.');
      }
      setMessage('');
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setView(null); // Adjust this according to your view management

  };

  if (!isVisible) return null;

  return (
    <div className="payment-page">
      <button onClick={handleClose} className="close-button-pay">
        &times;
      </button>
      <h1>Make Payment</h1>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="studentId">Student ID:</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="submit-button">Submit Payment</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PaymentPage;
