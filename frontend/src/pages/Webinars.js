// src/components/Webinars.js
import React, { useState } from 'react';
import './Webinars.css';
import Contact from './Contact'; // Import the Contact component

const webinars = [
  {
    title: 'Python Full Stack',
    date: 'August 15, 2024',
    description: 'Learn Python for both front-end and back-end development.',
    speaker: 'MR.Srinivas',
  },
  {
    title: 'Java Full Stack',
    date: 'September 10, 2024',
    description: 'Master Java development across the full stack.',
    speaker: 'MR.Vishwanth',
  },
  {
    title: 'DevOps Testing Tools',
    date: 'October 5, 2024',
    description: 'Explore various testing tools in DevOps pipelines.',
    speaker: 'MR.madhukar',
  },
  {
    title: 'Web Development Fundamentals',
    date: 'November 20, 2024',
    description: 'Learn the basics of web development and building websites.',
    speaker: 'MR.Srinivas',
  },
  {
    title: 'Digital Marketing Strategies',
    date: 'December 15, 2024',
    description: 'Discover effective digital marketing strategies and tactics.',
    speaker: 'MR.Akhil',
  },
];

const Webinars = () => {
  const [showContact, setShowContact] = useState(false);
  const [selectedWebinar, setSelectedWebinar] = useState(null);

  const handleEnrollClick = (webinar) => {
    setSelectedWebinar(webinar);
    setShowContact(true);
  };

  const handleCloseContact = () => {
    setShowContact(false);
    setSelectedWebinar(null);
  };

  return (
    <div className="webinars-container">
      <h1 className="webinars-title">Upcoming Webinars</h1>
      <div className="webinars-list">
        {webinars.map((webinar, index) => (
          <div key={index} className="webinar-card">
            <div className="webinar-icon">🎓</div>
            <h2 className="webinar-title">{webinar.title}</h2>
            <p className="webinar-date">{webinar.date}</p>
            <p className="webinar-description">{webinar.description}</p>
            <p className="webinar-speaker">Speaker: {webinar.speaker}</p>
            <button
              className="enroll-button"
              onClick={() => handleEnrollClick(webinar)}
            >
              Enroll
            </button>
          </div>
        ))}
      </div>
      {showContact && (
        <div className="contact-overlay" onClick={handleCloseContact}>
          <div className="contact-content" onClick={(e) => e.stopPropagation()}>
            <Contact />
            <button className="close-buttons" onClick={handleCloseContact}>x</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Webinars;
