// src/components/Certifications.js
import React from 'react';
import './Certifications.css';
import Dashboardbutton from '../components/Dashboardbutton';

const certifications = [
  {
    title: 'React Developer',
    description: 'Certified by Vcube Software Solutions Pvt. Ltd.',
    date: 'June 2023',
    icon: '🎖️', // Example badge icon
  },
  {
    title: 'Full-Stack Web Developer',
    description: 'Certified by Vcube Software Solutions Pvt. Ltd.',
    date: 'May 2022',
    icon: '🎖️', // Example badge icon
  },
  {
    title: 'Data Scientist',
    description: 'Certified by Vcube Software Solutions Pvt. Ltd.',
    date: 'April 2021',
    icon: '🎖️', // Example badge icon
  },
  {
    title: 'UI/UX Designer',
    description: 'Certified by Vcube Software Solutions Pvt. Ltd.',
    date: 'March 2020',
    icon: '🎖️', // Example badge icon
  },
  {
    title: 'DevOps Engineer',
    description: 'Certified by Vcube Software Solutions Pvt. Ltd.',
    date: 'February 2019',
    icon: '🎖️', // Example badge icon
  },
];

const Certifications = () => {
  return (
    <div className="certifications-container">
      <h1 className="certifications-title">Certifications</h1>
      <div className="certifications-list">
        {certifications.map((cert, index) => (
          <div key={index} className="certification-card">
            <div className="certification-icon">{cert.icon}</div>
            <h2 className="certification-title">{cert.title}</h2>
            <p className="certification-description">{cert.description}</p>
            <p className="certification-date">{cert.date}</p>
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default Certifications;
