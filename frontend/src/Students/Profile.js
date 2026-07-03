import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../Students/Profile.css'; // Import the CSS file
import defaultProfileImage from '../assets/images/pro3.jpg'; // Default profile image
import { logincontext } from '../App';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [Profile, setProfile] = useState({});
  const [[isAuthenticated], [token]] = useContext(logincontext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    RollNo: '',
    username: '',
    batch: '',
    email: '',
    mobile_no: '', // Initialize as empty string
    address: '',
    Image: '', // Add state for image
    resume: null, // Initialize resume as null
    newImage: null, // State for new image
  });

  const [imageAction, setImageAction] = useState(''); // 'update' or ''

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/studentdashbord');
    }

    const fetchData = async () => {
      try {
        const profileResp = await axios.get('http://127.0.0.1:8000/studentportal/view_loginuser_profile/', {
          headers: { 'Authorization': `Token ${token}` }
        });
        const profileData = profileResp.data;

        setProfile(profileData);
        setFormData({
          RollNo: profileData.student_id || '',
          username: profileData.userrole?.username || '',
          batch: profileData.batch || '',
          email: profileData.userrole?.email || '',
          mobile_no: profileData.mobile_no || '', // Ensure this is correctly set
          address: profileData.address || '',
          Image: profileData.Image || '',
          resume: null, // Ensure resume is null initially
          newImage: null, // Initialize newImage as null
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate, token]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      if (name === 'resume') {
        setFormData(prevData => ({
          ...prevData,
          resume: files[0]
        }));
      } else if (name === 'newImage') {
        setFormData(prevData => ({
          ...prevData,
          newImage: files[0]
        }));
      }
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleImageAction = () => {
    setImageAction('update');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log form data to verify it's correct
    console.log('Form data before submission:', formData);

    const data = new FormData();
    data.append('RollNo', formData.RollNo);
    data.append('username', formData.username);
    data.append('batch', formData.batch);
    data.append('email', formData.email);
    data.append('mobile_no', formData.mobile_no.toString()); // Convert to string if necessary
    data.append('address', formData.address);
    if (formData.resume) data.append('resume', formData.resume);
    if (formData.newImage) data.append('Image', formData.newImage);

    try {
      await axios.put('http://127.0.0.1:8000/studentportal/view_loginuser_profile/', data, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Profile updated successfully');
      setImageAction(''); // Close the image upload field
      // Refresh the profile data after successful update
      const profileResp = await axios.get('http://127.0.0.1:8000/studentportal/view_loginuser_profile/', {
        headers: { 'Authorization': `Token ${token}` }
      });
      setProfile(profileResp.data);
      setFormData(prevData => ({ ...prevData, newImage: null })); // Clear the newImage state
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      alert('Failed to update profile');
    }
  };

  const imageUrl = formData.newImage ? URL.createObjectURL(formData.newImage) : (formData.Image ? `http://127.0.0.1:8000${formData.Image}` : defaultProfileImage);

  return (
    <div className="profile-main-container">
      <div className="continer000">
        <form className="user-profile-form" onSubmit={handleSubmit}>
          <h3>Edit Profile</h3>
          <div className="form-group">
            <label>Roll Number</label>
            <input type="text" name="RollNo" value={formData.RollNo} disabled className="input-field" />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={formData.username} disabled className="input-field" />
          </div>
          <div className="form-group">
            <label>Batch Number</label>
            <input type="text" name="batch" value={formData.batch} disabled className="input-field" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input type="tel" name="mobile_no" value={formData.mobile_no} onChange={handleChange} className="input-field" />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="input-field" />
          </div>
          <div className="form-group">
            <label>Resume</label>
            <input type="file" name="resume" onChange={handleChange} className="input-field" />
          </div>
          <button className="submit-btn" type="submit">Save</button>
        </form>
      </div>
      
      <div className="continer111">
        <div className="profile-preview">
          <img src={imageUrl} alt="Profile" className="profile-image"/>
          <div>
            <button type="button" onClick={handleImageAction}>Update Image</button>
          </div>
          {imageAction === 'update' && (
            <div>
              <input type="file" name="newImage" onChange={handleChange} className="input-field" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
