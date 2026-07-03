import React, { useState } from 'react';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '', // Ensure this matches Django model field
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData); // Console log the form data

    try {
      // Send form data as JSON
      await axios.post('http://127.0.0.1:8000/studentportal/notificationcreate/', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setResponseMessage('Your message has been sent successfully!');
      setMessageType('success');
      setFormData({ name: '', email: '', phone_number: '', message: '' }); // Clear form fields
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message); // Log error details
      setResponseMessage('There was an error sending your message. Please try again later.');
      setMessageType('error');
    }
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-card">
            <a href="tel:9703155667" className="contact-link">
              <FontAwesomeIcon icon={faPhone} className="contact-icon" />
              <h3>Phone</h3>
              <p>+970 315 5667</p>
            </a>
          </div>
          <div className="contact-card">
            <a href="mailto:vcubesofrwaresoluthions@gmail.com" className="contact-link">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              <h3>Email</h3>
              <p>vcubesofrwaresoluthions@gmail.com</p>
            </a>
          </div>
          <div className="contact-card">
            <a href="https://www.google.com/maps?q=MIG-213,+above+Raymond's+Clothing+Store,+K+P+H+B+Phase+1,+Kukatpally,+Hyderabad,+Telangana+500072" target="_blank" rel="noopener noreferrer" className="contact-link">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
              <h3>Address</h3>
              <p>MIG-213, above Raymond's Clothing Store, K P H B Phase 1, Kukatpally, Hyderabad, Telangana 500072</p>
            </a>
          </div>
        </div>
        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send us a message</h3>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder='Name' value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone_number">Phone</label>
              <input type="text" id="phone_number" name="phone_number" placeholder='Mobile No' value={formData.phone_number} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder='Write a message here...' value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="contact-button">Send Message</button>
          </form>
          {responseMessage && (
            <div className={`response-message ${messageType}`}>
              {responseMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
