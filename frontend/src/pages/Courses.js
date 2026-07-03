// src/pages/Courses.js

import React, { useState } from 'react';
import Course from '../components/Course';
import CoursePopup from '../components/CoursePopup'; // Import the CoursePopup component
import Dashboardbutton from '../components/Dashboardbutton';
import pythonImage from '../assets/pythonpic.jpg';
import javaImage from '../assets/java.jpg';
import devopsImage from '../assets/devps.jpg';
import testingToolsImage from '../assets/testing.jpg';
import reactjsImage from '../assets/react.jpg';
import webDevelopmentImage from '../assets/web develep.jpg';
import digitalMarketingImage from '../assets/digital.jpg';
import powerbiImage from '../assets/powerbi.jpg';
import './Courses.css';

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  const courses = [
    { id: 1, title: 'Python', description: 'Learn Python programming language', imageUrl: pythonImage, subtopics: ['Introduction to Python', 'Data Types', 'Control Structures', 'Functions', 'Modules'] },
    { id: 2, title: 'Java', description: 'Learn Java programming language', imageUrl: javaImage, subtopics: ['Basics of Java', 'Object-Oriented Programming', 'Java Collections', 'Exception Handling', 'Java I/O'] },
    { id: 3, title: 'DevOps', description: 'Learn DevOps tools and practices', imageUrl: devopsImage, subtopics: ['Introduction to DevOps', 'Continuous Integration', 'Continuous Deployment', 'Infrastructure as Code', 'Monitoring and Logging'] },
    { id: 4, title: 'Testing Tools', description: 'Learn software testing tools', imageUrl: testingToolsImage, subtopics: ['Manual Testing', 'Automated Testing', 'Selenium', 'JMeter', 'TestNG'] },
    { id: 5, title: 'ReactJS', description: 'Learn ReactJS framework for building UIs', imageUrl: reactjsImage, subtopics: ['Introduction to React', 'Components', 'State Management', 'React Router', 'Hooks'] },
    { id: 6, title: 'Web Development', description: 'Learn web development technologies', imageUrl: webDevelopmentImage, subtopics: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Web Performance'] },
    { id: 7, title: 'Digital Marketing', description: 'Learn digital marketing strategies', imageUrl: digitalMarketingImage, subtopics: ['SEO', 'Content Marketing', 'Social Media Marketing', 'Email Marketing', 'Paid Advertising'] },
    { id: 8, title: 'Power BI', description: 'Learn Microsoft Power BI for data analysis', imageUrl: powerbiImage, subtopics: ['Power BI Basics', 'Data Modeling', 'Data Visualization', 'DAX', 'Power Query'] },
  ];

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleClosePopup = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="courses">
      <h1 className="courses-title">Courses Offered</h1>
      <div className="courses-list">
        {courses.map(course => (
          <Course 
            key={course.id} 
            title={course.title} 
            description={course.description} 
            imageUrl={course.imageUrl} 
            onClick={() => handleCourseClick(course)} 
          />
        ))}
      </div>
    
      {selectedCourse && (
        <CoursePopup course={selectedCourse} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default Courses;
