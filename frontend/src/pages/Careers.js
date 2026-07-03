// src/components/Careers.js
import React from 'react';
import './Careers.css';
import Dashboardbutton from '../components/Dashboardbutton';


const jobOpenings = [
  {
    title: 'Frontend Developer',
    description: 'We are looking for a skilled Frontend Developer to join our team.',
    location: 'New York, NY',
    type: 'Full-time',
  },
  {
    title: 'Backend Developer',
    description: 'Join our team as a Backend Developer to build scalable applications.',
    location: 'San Francisco, CA',
    type: 'Full-time',
  },
  {
    title: 'UI/UX Designer',
    description: 'We need a creative UI/UX Designer to enhance our user interfaces.',
    location: 'Remote',
    type: 'Part-time',
  },
  {
    title: 'Data Scientist',
    description: 'Seeking a Data Scientist to analyze and interpret complex data.',
    location: 'Boston, MA',
    type: 'Full-time',
  },
  {
    title: 'DevOps Engineer',
    description: 'Looking for an experienced DevOps Engineer to maintain our infrastructure.',
    location: 'Seattle, WA',
    type: 'Full-time',
  },
];

const Careers = () => {
  return (
    <div className="careers-container">
      <h1 className="careers-title">Careers</h1>
      <div className="careers-list">
        {jobOpenings.map((job, index) => (
          <div key={index} className="career-card">
            <h2 className="career-title">{job.title}</h2>
            <p className="career-description">{job.description}</p>
            <p className="career-location">{job.location}</p>
            <p className="career-type">{job.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Careers;
