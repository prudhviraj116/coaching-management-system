// src/components/Course.js

import React from 'react';
import './Course.css'; // Import your CSS file for styling

const Course = ({ title, description, imageUrl, onClick }) => {
  return (
    <div className="course" onClick={onClick}>
      <div className="course-image-container">
        <img src={imageUrl} alt={title} className="course-image" />
        <div className="course-hover-message">Click Here</div>
      </div>
      <div className="course-details">
        <h2 className="course-title">{title}</h2>
        <p className="course-description">{description}</p>
      </div>
    </div>
  );
};

export default Course;
