import React, { useState } from 'react';
import './Studentreg.css';

let StudentReg = () => {
  let [formData, setFormData] = useState({
    StaffName: '',
    secondname: '',
    password: '',
    conformpassword: '',
    phoneNumber: '',
    gender: '',
    email: '',
    simage: null,
    address: '',
    fullname: ''
  });

  let handleChange = (e) => {
    let { name, value } = e.target;
    setFormData((prevData) => {
      let newData = {
        ...prevData,
        [name]: value,
      };

      if (name === 'StaffName' || name === 'secondname') {
        newData.fullname = `${newData.StaffName} ${newData.secondname}`.trim();
      }
      return newData;
    });
  };

  let handleImageChange = (e) => {
    setFormData({
      ...formData,
      simage: e.target.files[0],
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.conformpassword) {
      alert('Password and Confirm Password do not match.');
    } else if (formData.phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
    } else if (formData.StaffName === formData.secondname) {
      alert('First Name and Last Name are the same.');
    } else {
      console.log('Form submitted:', formData);
      setFormData({
        StaffName: '',
        secondname: '',
        password: '',
        conformpassword: '',
        phoneNumber: '',
        gender: '',
        email: '',
        simage: null,
        address: '',
        fullname: ''
      });
    }
  };

  let handleJsonSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.conformpassword) {
      alert('Password and Confirm Password do not match.');
    } else if (formData.phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
    } else if (formData.StaffName === formData.secondname) {
      alert('First Name and Last Name are the same.');
    } else {
      console.log('Form data in JSON format:', JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div className="registration-form-container1">
      <h2 className="registration-heading"> Student Registration Form</h2>
      <form className="registration-form1" onSubmit={handleSubmit}>
        <div className="form-row1">
          <div className="form-group11">
            <label>First Name</label>
            <input
              type="text"
              name="StaffName"
              value={formData.StaffName}
              onChange={handleChange}
              placeholder="Enter First Name"
              required
            />
          </div>
          <div className="form-group11">
            <label>Last Name</label>
            <input
              type="text"
              name="secondname"
              value={formData.secondname}
              onChange={handleChange}
              placeholder="Enter Last Name"
              required
            />
            <input
              type="hidden"
              name="fullname"
              value={formData.fullname}
              readOnly
            />
          </div>
        </div>
        <div className="form-row1">
          <div className="form-group11">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group11">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone number"
              required
            />
          </div>
        </div>
        <div className="form-row1">
          <div className="form-group11">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group11">
            <label>Confirm Password</label>
            <input
              type="password"
              name="conformpassword"
              value={formData.conformpassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </div>
        </div>
        <div className="form-row1">
          <div className="form-group11">
            <label>Image</label>
            <input
              type="file"
              name="simage"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="form-group11">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
          </div>
        </div>
        <div className="form-group gender-group1">
          <label>Gender</label>
          <div className="gender-options1">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === 'other'}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
        </div>
        <button type="submit">Sign Up</button>
        <button type="button" onClick={handleJsonSubmit}>submit</button>
      </form>
    </div>
  );
};

export default StudentReg;
