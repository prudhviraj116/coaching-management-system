import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './StaffReg1.css';
import axios from "axios";
import sideimage from '../assets/images/pro.jpg';

const StaffReg = ({ setSelectedSection }) => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    StaffName: '',
    secondname: '',
    password: '',
    conformpassword: '', // Kept as 'conform' to avoid breaking logic
    phoneNumber: '',
    gender: '',
    email: '',
    simage: null,
    address: '',
    Designation: '',
    fullName:'',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Use localhost consistently
    axios.get('http://localhost:8000/staffportal/staffdepsdata/')
      .then((resp) => {
        setData(resp.data);
      })
      .catch((error) => {
        console.error('Error fetching departments:', error);
      });
  }, []);

  // Strip country code prefix and non-digit chars from phone number
  const normalizePhone = (raw) => {
    let digits = raw.replace(/[\s\-().]/g, ''); // remove spaces, dashes, dots, parens
    if (digits.startsWith('+91')) digits = digits.slice(3);
    else if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2);
    return digits;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      fullName: (name === 'StaffName' || name === 'secondname') ? `${prevData.StaffName} ${prevData.secondname}`.trim() : prevData.fullName,
    }));
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      simage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanPhone = normalizePhone(formData.phoneNumber.toString());

    if (formData.password !== formData.conformpassword) {
      alert('Password and Confirm Password do not match.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      alert('Please enter a valid 10-digit Indian mobile number (e.g. 9876543210 or +91 9876543210).');
      return;
    }
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    const token = localStorage.getItem('authToken');

    // Build JSON payload with nested userrole (backend accepts this cleanly)
    const payload = {
      userrole: {
        username: formData.StaffName,
        email: formData.email,
        password: formData.password,
      },
      mobile: parseInt(cleanPhone, 10),
      Gender: formData.gender,
      address: formData.address,
      desgination: parseInt(formData.Designation, 10),
    };

    try {
      // Step 1 — Register staff with JSON
      const response = await axios.post(
        'http://localhost:8000/staffportal/staffregistration/',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`,
          },
        }
      );

      // Step 2 — If image is selected, upload it separately via PATCH
      if (formData.simage && response.data) {
        try {
          const imgForm = new FormData();
          imgForm.append('Image', formData.simage);
          await axios.patch(
            `http://localhost:8000/staffportal/staffUpdate/${cleanPhone}/`,
            imgForm,
            {
              headers: {
                'Authorization': `token ${token}`,
              },
            }
          );
        } catch (imgErr) {
          console.warn('Image upload failed (non-critical):', imgErr.response?.data);
        }
      }

      console.log('Staff Registered:', response.data);
      alert('Staff registered successfully!');
      
      if (setSelectedSection) {
        setSelectedSection('staffs');
      } else {
        navigate('/admindashboard');
      }
    } catch (error) {
      console.error('Registration Error:', error.response?.data || error.message);
      const errData = error.response?.data;
      if (errData) {
        // Recursively flatten nested field-level errors into readable lines
        const flatten = (obj, prefix = '') =>
          Object.entries(obj).flatMap(([k, v]) => {
            const key = prefix ? `${prefix}.${k}` : k;
            if (Array.isArray(v)) return [`${key}: ${v.join(', ')}`];
            if (v && typeof v === 'object') return flatten(v, key);
            return [`${key}: ${v}`];
          });
        alert('Registration failed:\n' + flatten(errData).join('\n'));

      } else {
        alert('Error registering staff. Please check your connection and try again.');
      }
    }
  };


  return (
    <div className="registration-form-containers">
      <div className="image-section">
        <img src={sideimage} alt="Registration Illustration" />
      </div>
      <form className="registration-forms" onSubmit={handleSubmit} >
        <div className="d-flex justify-content-between align-items-center mb-4">
           <h2>Staff Registration</h2>
           <button type="button" className="btn btn-close" onClick={() => setSelectedSection ? setSelectedSection('staffs') : navigate('/admindashboard')}></button>
        </div>
        <div className="staff-form-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="StaffName" value={formData.StaffName} onChange={handleChange} placeholder="Enter First Name" required />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="secondname" value={formData.secondname} onChange={handleChange} placeholder="Enter Last Name" required />
          </div>
        </div>
        <div className="staff-form-row">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="e.g. 9876543210 or +91 9876543210"
              required
            />
          </div>
        </div>
        <div className="staff-form-row">
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" required />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="conformpassword" value={formData.conformpassword} onChange={handleChange} placeholder="Confirm Password" required />
          </div>
        </div>
        <div className="staff-form-row">
          <div className="form-group">
            <label>Image</label>
            <input type="file" name="simage" onChange={handleImageChange} placeholder="Upload Image" />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter Address" required />
          </div>
        </div>
        <div className="staff-form-group1">
          <label>Designation</label>
          <select value={formData.Designation} onChange={handleChange} name='Designation' required>
            <option value="">-- Please select a department --</option>
            {data.map((rec) => (
              <option key={rec.Department_id} value={rec.Department_id}>{rec.Departmentname}</option>
            ))}
          </select>
        </div>
        <div className="gender-group">
          <label>Gender</label>
          <div className="gender-options">
            <label>
              <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
              Female
            </label>
            <label>
              <input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} />
              Other
            </label>
          </div>
        </div>
        <button type="submit">Register Staff</button>
        <p className="sign-in-text mt-3">
          Need to manage existing staff? <span className="adminreg-link" style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}} onClick={() => setSelectedSection ? setSelectedSection('staffs') : navigate('/admindashboard')}>View Staff List</span>
        </p>
      </form>
    </div>
  );
};

export default StaffReg;
