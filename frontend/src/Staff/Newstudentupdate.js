import React, { useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css'; // If using npm
import '../Staff/Newstudentupdate.css';

const NewStudentUpdate = ({ setView }) => {
  const [studentMobile, setStudentMobile] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState({
    username: '',
    mobile_no: '',
    email: '',
    batch: '',
    amount_paid: '',
    fee_status: '',
    total_amount: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Function to validate mobile number
  const isValidMobileNumber = (number) => /^\d{10}$/.test(number);

  const fetchData = () => {
    if (!isValidMobileNumber(studentMobile)) { // Validate mobile number
      setMessage('Please enter a valid 10-digit mobile number.');
      setMessageType('error');
      return;
    }

    axios.get(`http://127.0.0.1:8000/studentportal/updatestudentget/${studentMobile}/`)
      .then((response) => {
        if (response.data) {
          const studentData = response.data;
          setData({
            username: studentData.userrole.username,
            mobile_no: studentData.mobile_no.toString(),
            email: studentData.userrole.email,
            batch: studentData.batch,
            amount_paid: studentData.fee.amount_paid,
            fee_status: studentData.fee.fee_status,
            total_amount: studentData.fee.total_amount
          });

          setShowForm(true);
          setMessage('');
          setMessageType('success');
        } else {
          setMessage('No data found for the provided mobile number.');
          setMessageType('error');
        }
      })
      .catch((error) => {
        setMessage('Error fetching data. Please try again.');
        setMessageType('error');
        console.error('Error fetching data:', error);
      });
  };

  const handleMobileNumberSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFeeChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleBackToForm = () => {
    setShowForm(false);
    setMessage(''); // Clear message when going back to the initial form
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!isValidMobileNumber(studentMobile)) {
      setMessage('Please enter a valid 10-digit mobile number.');
      setMessageType('error');
      return;
    }

    axios.put(`http://127.0.0.1:8000/studentportal/updatestudent/${studentMobile}/`, {
      username: data.username,
      email: data.email,
      mobile_no: data.mobile_no,
      batch: data.batch,
      amount_paid: data.amount_paid,
      fee_status: data.fee_status,
      total_amount: data.total_amount
    })
      .then(response => {
        setMessage('Data updated successfully!');
        setMessageType('success');
        setData({
          username: '',
          mobile_no: '',
          email: '',
          batch: '',
          amount_paid: '',
          fee_status: '',
          total_amount: ''
        }); // Clear form fields after successful submission
        setStudentMobile(''); // Clear the mobile number input field
        console.log('Data updated successfully:', response.data);
      })
      .catch(error => {
        setMessage('Error updating data. Please try again.');
        setMessageType('error');
        console.error('Error updating data:', error);
      });
  };

  return (
    <div className='Dashboardkosam'>
      <div className='new-student-update-container'>
        <div className='new-student-update-form'>
          {!showForm ? (
            <form onSubmit={handleMobileNumberSubmit} className='update_form'>
              <h2>Update Student Registration</h2>
              <button onClick={() => setView('false')} type="button" className="close-button-update">
                &times;
              </button>
              <input
                type="text"
                value={studentMobile}
                placeholder='Enter Mobile Number'
                onChange={(e) => setStudentMobile(e.target.value)}
                required
              />
              <br />
              <button type="submit" className="submit-button-student">Submit</button>
              {message && (
                <div className={`message ${messageType}`}>
                  {message}
                </div>
              )}
            </form>
          ) : (
            <div className="student-registration-form">
              <div className="form-header">
                <div className="fas fa-arrow-left back-arrow" onClick={handleBackToForm}></div>
                <h3>Update Student Information</h3>
                
              </div>
              <form className='form-content' onSubmit={handleFinalSubmit}>
                <div className='form-row'>
                  <label htmlFor="username" className="form-label">Name:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={data.username}
                    placeholder="Enter Student Full Name"
                    onChange={handleFormChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className='form-row'>
                  <label htmlFor="mobile_no" className="form-label">Phone Number:</label>
                  <input
                    type="tel"
                    id="mobile_no"
                    name="mobile_no"
                    value={data.mobile_no}
                    placeholder="Enter Student Phone Number"
                    onChange={handleFormChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className='form-row'>
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    placeholder="Enter Student Email"
                    onChange={handleFormChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className='form-row'>
                  <label htmlFor="batch" className="form-label">Batch No:</label>
                  <input
                    type="text"
                    id="batch"
                    name="batch"
                    value={data.batch}
                    placeholder="AB-00"
                    onChange={handleFormChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className='form-row'>
                  <label htmlFor="total_amount" className="form-label">Total Amount:</label>
                  <input
                    type="number"
                    id="total_amount"
                    name="total_amount"
                    value={data.total_amount}
                    onChange={handleFeeChange}
                    className="form-input"
                  />
                </div>

                <div className='form-row'>
                  <label htmlFor="amount_paid" className="form-label">Paid Fee Amount:</label>
                  <input
                    type="text"
                    id="amount_paid"
                    name="amount_paid"
                    value={data.amount_paid}
                    onChange={handleFeeChange}
                    className="form-input"
                  />
                </div>

                <div className='form-row'>
                  <label htmlFor="fee_status" className="form-label">Paid Fee Status:</label>
                  <select
                    id="fee_status"
                    name="fee_status"
                    value={data.fee_status}
                    onChange={handleFeeChange}
                    className="form-input"
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>

                <div className='form-row'>
                  <button type="submit" className="submit-button-student">Submit</button>
                </div>
                {message && (
                  <div className={`message ${messageType}`}>
                    {message}
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewStudentUpdate;
