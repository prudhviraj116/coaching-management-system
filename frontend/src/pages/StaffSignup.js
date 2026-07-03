import React, { useEffect, useState } from 'react';
import './StaffSignup.css';
import axios from "axios";
import sideimage from '../assets/pro.jpg';

let StaffReg = () => {
  let [data,setdata]=useState([]);
  useEffect (()=>{
    axios.get('http://127.0.0.1:8000/staffportal/staffdepsdata/').then(
      (resp)=>{
        //console.log(resp.data)
        setdata(resp.data)
      }
    ).catch((error)=>{
      console.log(error)
    })
  })
  let [formData, setFormData] = useState({
    StaffName: '',
    secondname:'',
    password: '',
    conformpassword: '',
    phoneNumber: '',
    gender: '',
    email: '',
    simage: '',
    address: '',
    Designation: '',
    fullname:'',
  });
  let handleChange = (e) => {
    let { name, value } = e.target;
    setFormData((prevData) => {
        const newData = {
            ...prevData,
            [name]: value,
        };

        if (name === 'StaffName' || name === 'secondname') {
            newData.fullname = `$-{newData.StaffName}${newData.secondname}`.trim();
        }
        return newData;
    });
};

let handleImageChange = (e) => {
    setFormData({
        ...formData,
        image: e.target.files[0],
    });
};

let handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.conformpassword) {
      alert('Password and Confirm Password do not match.');
    } 
    else if (formData.phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
    } 
    else if (formData.StaffName=== formData.secondname) {
      alert(' First Name and second Name are same.');
    } 
    else if (formData.password.length < 6){
      alert('Password must be at least 6 characters')
    }
    else {
      console.log('Form submitted:', formData);
      setFormData({
        StaffName: '',
        secondname: '',
        password: '',
        conformpassword: '',
        phoneNumber: '',
        gender: '',
        email: '',
        simage: '',
        address: '',
        Designation: '',
      });

    }
};

  return (
    
    <div className="registration-form-container">
        
      <div className="image-section">
       
        <img src={sideimage} alt="Registration Illustration" />
      </div>
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>Registration</h2>
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="StaffName" 
            value={formData.StaffName} onChange={handleChange} 
            placeholder="Enter FirstName" required/>
          </div>
          <div className="form-group">
            <label>Last name</label>
            <input type="text" name="secondname" 
            value={formData.secondname} onChange={handleChange} 
            placeholder="Enter LastName" required/>
            
            <input type="hidden" name="secondname" 
            value={formData.fullname} onChange={handleChange} 
            placeholder="Please select" required/>
            
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email"
            value={formData.email} onChange={handleChange}
            placeholder="Email" required/>
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phoneNumber"
            value={formData.phoneNumber} onChange={handleChange}
            placeholder="Phone number" required/>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password"
            value={formData.password} onChange={handleChange}
            placeholder="Please enter your" required/>
          </div>
          <div className="form-group">
            <label>Conform Password</label>
            <input type="password" name="conformpassword"
            value={formData.conformpassword} onChange={handleChange}
            placeholder="Please enter your" required/>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Image</label>
            <input type="file" name="simage"
            value={formData.simage} onChange={handleChange}
            placeholder="Please enter your" required/>
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address"
            value={formData.address} onChange={handleChange}
            placeholder="Please enter your" required/>
          </div>
        </div>
        <div className="form-group1">
            <label className='form-group'>Designation</label>
            <select value={formData.Designation} onChange={handleChange} name='Designation' required >
            <option value="">Please select</option>
            {data.map((rec)=>{
              return <option  value={rec.Departmentname}>{rec.Departmentname}</option>
            })}
            </select>
        </div>
        <div className="form-group gender-group">
         
          <div className="gender-options">
            <label>
              <input type="radio" name="gender" value="male"
              checked={formData.gender === 'male'} onChange={handleChange}/>
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="female"
              checked={formData.gender === 'female'} onChange={handleChange}/>
              Female
            </label>
            <label>
              <input type="radio" name="gender" value="other"
              checked={formData.gender === 'other'} onChange={handleChange}/>
              Other
            </label>
          </div>
        </div>
        <p className="sign-in-text">
          Already have an account? <a href="#">Sign in</a>
        </p>
      </form>
    </div>
  );
};

export default StaffReg;