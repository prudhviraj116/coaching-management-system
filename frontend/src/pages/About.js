// src/pages/About.js
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h2>About V Cube Software Solutions Pvt. Ltd.</h2>
        <p>Empowering individuals and organizations through innovative software solutions and high-quality training.</p>
      </div>
      <div className="about-content">
        <section className="about-section">
          <h3>Our Company</h3>
          <p>
            V Cube Software Solutions Pvt. Ltd. is a leading software development and training company based in Hyderabad, India. 
            We specialize in providing cutting-edge solutions in software development, consulting, and training across various domains.
          </p>
        </section>
        <section className="about-section">
          <h3>Our Mission</h3>
          <p>
            Our mission is to empower individuals and organizations by imparting high-quality training and delivering innovative software solutions that drive business growth.
          </p>
        </section>
        <section className="about-section">
          <h3>Our Training Courses</h3>
          <p>
            At V Cube, we offer a wide range of training courses designed to equip students and professionals with the skills demanded by the industry. Some of our key courses include:
          </p>
          <ul>
            <li>Python Programming</li>
            <li>Java Development</li>
            <li>Web Development</li>
            <li>Digital Marketing</li>
            <li>Power BI</li>
            <li>ReactJS</li>
            <li>DevOps</li>
            <li>Testing Tools</li>
          </ul>
        </section>
        <section className="about-section">
          <h3>Why Choose Us?</h3>
          <p>
            At V Cube, we are committed to excellence in everything we do. We provide:
          </p>
          <ul>
            <li>State-of-the-art training facilities</li>
            <li>Hands-on learning experiences</li>
            <li>Industry-relevant curriculum</li>
            <li>Placement assistance</li>
            <li>Flexible learning options</li>
          </ul>
        </section>
        <section className="about-section">
          <p>
            Join us on a journey to transform your career and achieve your professional goals with confidence.
          </p>
        </section>
      </div>
    
    </div>
  );
};

export default About;
