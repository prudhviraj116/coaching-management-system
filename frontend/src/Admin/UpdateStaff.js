import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css'; // If using npm
import '../Admin/UpdateStaff.css'; // Ensure this CSS file exists for styling

const UpdateStaff = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [staffData, setStaffData] = useState({
    username: '',
    email: '',
    mobile: '',
    address: '',
    Gender: '',
    desgination: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (mobileNumber) {
      axios.get(`http://127.0.0.1:8000/staffportal/staffUpdateget/${mobileNumber}/`)
        .then(response => {
          // Transform the data to the format needed
          const { userrole, mobile, Gender, address, desgination } = response.data;
          setStaffData({
            username: userrole.username,
            email: userrole.email,
            mobile: mobile,
            address: address,
            Gender: Gender,
            desgination: desgination
          });
          setIsFormVisible(true);
        })
        .catch(error => {
          console.error('Error fetching staff data:', error);
          setError('Error fetching staff data.');
        });
    }
  }, [mobileNumber]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaffData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://127.0.0.1:8000/staffportal/staffUpdate/${mobileNumber}/`, staffData, {
      headers: {
        'Content-Type': 'application/json' // Ensure content type is set to JSON
      }
    })
      .then(response => {
        setSuccessMessage('Staff updated successfully.');
        setError('');
      })
      .catch(error => {
        setError('Error updating staff data.');
        setSuccessMessage('');
        console.error('Error updating staff data:', error);
      });
  };

  const handleBackToForm = () => {
    setIsFormVisible(false);
    setMobileNumber('');
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className='update-staff-container'>
      {!isFormVisible ? (
        <form onSubmit={(e) => {
          e.preventDefault();
          setMobileNumber(e.target.elements.mobile.value);
        }} className='search-form'>
          <h2>Search Staff</h2>
          <input
            type="text"
            name="mobile"
            placeholder='Enter Mobile Number'
            required
          />
          <button type="submit" className="submit-button">Search</button>
        </form>
      ) : (
        <div className="update-form-container">
          <div className="form-header">
            <div className="back-arrows" onClick={handleBackToForm}>
              <i className="fas fa-arrow-left"></i> {/* FontAwesome arrow icon */}
            </div>
            <h2>Update Staff Information</h2>
          </div>
          <form onSubmit={handleFormSubmit} className='update-form'>
            <div className='form-row'>
              <label htmlFor="username" className="form-label">Name:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={staffData.username}
                onChange={handleInputChange}
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
                value={staffData.email}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>

            <div className='form-row'>
              <label htmlFor="address" className="form-label">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={staffData.address}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className='form-row'>
              <label htmlFor="Gender" className="form-label">Gender:</label>
              <input
                type="text"
                id="Gender"
                name="Gender"
                value={staffData.Gender}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className='form-row'>
              <label htmlFor="mobile" className="form-label">Mobile Number:</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={staffData.mobile}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className='form-row'>
              <label htmlFor="desgination" className="form-label">Designation:</label>
              <input
                type="text"
                id="desgination"
                name="desgination"
                value={staffData.desgination}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className='form-row'>
              <button type="submit" className="submit-button">Update</button>
            </div>
          </form>
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
      )}
    </div>
  );
};

export default UpdateStaff;
