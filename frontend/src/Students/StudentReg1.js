import React, { useState } from 'react';
import axios from 'axios';
import '../Students/StudentReg1.css';

const StudentReg1 = () => {
  const [StaffName, setStaffName] = useState('');
  const [secondname, setSecondName] = useState('');
  const [password, setPassword] = useState('');
  const [conformpassword, setConformPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [Gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [simage, setSimage] = useState(null);
  const [address, setAddress] = useState('');
  const [Qulification, setQulification] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'StaffName':
        setStaffName(value);
        break;
      case 'secondname':
        setSecondName(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'conformpassword':
        setConformPassword(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'Gender':
        setGender(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'Qulification':
        setQulification(value);
        break;
      default:
        break;
    }
  };

  const handleImageChange = (e) => {
    setSimage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== conformpassword) {
      alert('Password and Confirm Password do not match.');
      return;
    } 
    if (phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    } 
    if (StaffName === secondname) {
      alert('First Name and Last Name cannot be the same.');
      return;
    }

    const postData = new FormData();
    postData.append('password', password);
    postData.append('address', address);
    postData.append('phoneNumber', phoneNumber);
    postData.append('Gender', Gender);
    postData.append('Qulification', Qulification);
    if (simage) {
      postData.append('Image', simage);
    }
    console.log(postData);

    try {
      const response = await axios.put(`http://127.0.0.1:8000/studentportal/studentAccount/${phoneNumber}/`, postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response Data:', response.data);

      // Reset form fields
      setStaffName('');
      setSecondName('');
      setPassword('');
      setConformPassword('');
      setPhoneNumber('');
      setGender('');
      setEmail('');
      setSimage(null);
      setAddress('');
      setQulification('');
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="registration-form-container2">
      <form className="registration-form2" onSubmit={handleSubmit} encType='multipart/form-data'>
        <h2>Registration</h2>
        <div className="form-row2">
          <div className="form-group22">
            <label>First Name</label>
            <input 
              type="text" 
              name="StaffName" 
              value={StaffName} 
              onChange={handleChange} 
              placeholder="Enter First Name" 
              required 
            />
          </div>
          <div className="form-group22">
            <label>Last Name</label>
            <input 
              type="text" 
              name="secondname" 
              value={secondname} 
              onChange={handleChange} 
              placeholder="Enter Last Name" 
              required 
            />
          </div>
        </div>
        <div className="form-row2">
          <div className="form-group22">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              value={email} 
              onChange={handleChange} 
              placeholder="Email" 
              required 
            />
          </div>
          <div className="form-group22">
            <label>Phone Number</label>
            <input 
              type="tel" 
              name="phoneNumber" 
              value={phoneNumber} 
              onChange={handleChange} 
              placeholder="Phone Number" 
              required 
            />
          </div>
        </div>
        <div className="form-row2">
          <div className="form-group22">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              value={password} 
              onChange={handleChange} 
              placeholder="Password" 
              required 
            />
          </div>
          <div className="form-group22">
            <label>Confirm Password</label>
            <input 
              type="password" 
              name="conformpassword" 
              value={conformpassword} 
              onChange={handleChange} 
              placeholder="Confirm Password" 
              required 
            />
          </div>
        </div>
        <div className="form-row2">
          <div className="form-group22">
            <label>Image</label>
            <input 
              type="file" 
              name="simage" 
              onChange={handleImageChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Qualification</label>
            <input 
              type="text" 
              name="Qulification" 
              value={Qulification} 
              onChange={handleChange} 
              placeholder="Enter Qualification" 
              required 
            />
          </div>
          <div className="form-group22">
            <label>Address</label>
            <input 
              type="text" 
              name="address" 
              value={address} 
              onChange={handleChange} 
              placeholder="Address" 
              required 
            />
          </div>
        </div>
        <div className="form-group gender-group2">
          <div className="gender-options2">
            <label>
              <input 
                type="radio" 
                name="Gender" 
                value="Male" 
                checked={Gender === 'Male'} 
                onChange={handleChange} 
              />
              Male
            </label>
            <label>
              <input 
                type="radio" 
                name="Gender" 
                value="Female" 
                checked={Gender === 'Female'} 
                onChange={handleChange} 
              />
              Female
            </label>
            <label>
              <input 
                type="radio" 
                name="gender" 
                value="other" 
                checked={Gender === 'other'} 
                onChange={handleChange} 
              />
              Other
            </label>
          </div>
        </div>
        <button type="submit">Sign Up</button>
        <p className="sign-in-text2">
          Already have an account? <a href="/">Sign in</a>
        </p>
      </form>
    </div>
  );
};

export default StudentReg1;
