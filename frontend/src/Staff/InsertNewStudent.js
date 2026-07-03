import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Staff/InsertNewStudent.css';

const Form = ({setView}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    batchId: '',
    paidFeeAmount: '',
    paidFeeStatus: '',
    totalfee: '',
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);
  const [showStudentFields, setShowStudentFields] = useState(true);
  const [batchOptions, setBatchOptions] = useState([]);

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchBatchOptions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/studentportal/batches', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setBatchOptions(response.data);
      } catch (error) {
        console.error('Error fetching batch options:', error);
      }
    };

    fetchBatchOptions();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.batchId) {
      setRegistrationError(true);
      return;
    }

    const postData = {
      userrole: {
        username: formData.name,
        email: formData.email,
      },
      mobile_no: formData.phone,
      batch: formData.batchId,
      fee: {
        amount_paid: parseFloat(formData.paidFeeAmount) || 0,
        fee_status: formData.paidFeeStatus,
        total_amount: parseFloat(formData.totalfee) || 0,
      },
    };

    console.log('Posting Data:', postData);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/studentportal/createstudent/',
        postData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response Data:', response.data);
      setRegistrationSuccess(true);
      setRegistrationError(false);

      // Inform user about the default password
      alert(`Student created successfully! Initial password is set to their phone number: ${formData.phone}`);

      // Reset form fields
      setFormData({
        name: '',
        phone: '',
        email: '',
        batchId: '',
        paidFeeAmount: '',
        paidFeeStatus: '',
        totalfee: '',
      });
    } catch (error) {
      console.error('AxiosError:', error.response ? error.response.data : error.message);
      setRegistrationError(true);
      setRegistrationSuccess(false);
    }
  };

  const toggleStudentFields = () => {
    setShowStudentFields(true);
  };

  return (
    <div className='cont'>
      <form className='student-form-containers' onSubmit={handleSubmit}>
        <div className='form-sections'>
          <div
            className={`form-section ${showStudentFields ? 'active' : ''}`}
            onClick={toggleStudentFields}
          >
            <h2>Student Registration</h2> <button  onClick={() => setView('false')}  type="button" className="close-button-is" >
            &times;
          </button>
          </div>
        </div>

        <div className='form-content'>
          {showStudentFields && (
            <>
              <div className='student-form-rows'>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Student Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='student-form-rows'>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter Student Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='student-form-rows'>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Student Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='student-form-rows'>
                <label htmlFor="batchId">Batch:</label>
                <select
                  id="batchId"
                  name="batchId"
                  value={formData.batchId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Batch</option>
                  {batchOptions.map(batch => (
                    <option key={batch.batch_id} value={batch.batch_id}>
                      {batch.batch_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='student-form-rows'>
                <label htmlFor="totalfee">Total Amount:</label>
                <input
                  type="number"
                  id="totalfee"
                  name="totalfee"
                  value={formData.totalfee}
                  onChange={handleChange}
                />
              </div>

              <div className='student-form-rows'>
                <label htmlFor="paidFeeAmount">Paid Fee Amount:</label>
                <input
                  type="number"
                  id="paidFeeAmount"
                  name="paidFeeAmount"
                  value={formData.paidFeeAmount}
                  onChange={handleChange}
                />
              </div>

              <div className='student-form-rows'>
                <label htmlFor="paidFeeStatus">Paid Fee Status:</label>
                <select
                  id="paidFeeStatus"
                  name="paidFeeStatus"
                  value={formData.paidFeeStatus}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                </select>
              </div>

              <div className='student-form-rows'>
                <button type="submit" className='student-form-row-button' >Submit</button>
              </div>
            </>
          )}

          {registrationSuccess && (
            <div className="message success-message">
              <p>Registration successful!</p>
            </div>
          )}

          {registrationError && (
            <div className="message error-message">
              <p>Registration failed. Please try again.</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
