// src/components/CoursePopup.js

import React from 'react';
import './CoursePopup.css'; // Import the CSS file for styling

const CoursePopup = ({ course, onClose }) => {
  return (
    <div className="course-popup-overlay">
      <div className="course-popup">
        <button className="course-popup-close" onClick={onClose}>X</button>
        <h2>{course.title}</h2>
        <img src={course.imageUrl} alt={course.title} className="course-popup-image" />
        <p>{course.description}</p>
        <h3>What You'll Learn:</h3>
        <ul>
          {course.subtopics.map((subtopic, index) => (
            <li key={index}>{subtopic}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoursePopup;
