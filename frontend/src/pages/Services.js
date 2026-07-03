import React from 'react';
import './Services.css';
import Dashboardbutton from '../components/Dashboardbutton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faDatabase, faMobileAlt, faCloud, faRobot, faCogs } from '@fortawesome/free-solid-svg-icons';

const Services = () => {
  return (
    <div className="services-container">
      <h1 className="services-title">Our Services</h1>
      <div className="services-grid">
        <div className="service-card">
          <FontAwesomeIcon icon={faCode} className="service-icon" />
          <h3>Web Development</h3>
          <p>We offer professional web development services using the latest technologies to build responsive and scalable websites.</p>
        </div>
        <div className="service-card">
          <FontAwesomeIcon icon={faDatabase} className="service-icon" />
          <h3>Data Analysis</h3>
          <p>Our data analysis services help you make informed decisions by transforming data into actionable insights.</p>
        </div>
        <div className="service-card">
          <FontAwesomeIcon icon={faMobileAlt} className="service-icon" />
          <h3>Mobile App Development</h3>
          <p>We create high-quality mobile applications tailored to your business needs, ensuring a seamless user experience.</p>
        </div>
        <div className="service-card">
          <FontAwesomeIcon icon={faCloud} className="service-icon" />
          <h3>Cloud Computing</h3>
          <p>Our cloud computing solutions enable you to scale your infrastructure, improve agility, and reduce costs.</p>
        </div>
        <div className="service-card">
          <FontAwesomeIcon icon={faRobot} className="service-icon" />
          <h3>AI and Machine Learning</h3>
          <p>Leverage our AI and machine learning expertise to develop intelligent systems that enhance your business processes.</p>
        </div>
        <div className="service-card">
          <FontAwesomeIcon icon={faCogs} className="service-icon" />
          <h3>Software Consulting</h3>
          <p>Our software consulting services provide you with expert guidance to optimize your software development lifecycle.</p>
        </div>
      </div>
      
    </div>
  );
};

export default Services;
