import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Tutors.css';
import Dashboardbutton from '../components/Dashboardbutton';

const tutors = [
  {
    name: 'MR.Srinivas',
    subject: 'Python FullStack',
    experience: '13+ years',
    description: 'Expert in Python programming and machine learning.',
    extraDetails: 'Srinivas teaches Python basics, advanced concepts, and machine learning algorithms.',
    reviews: '5 stars from 200+ students',
    classesPerDay: '3 classes',
    otherDetails: 'Available for weekend sessions.',
    image: '',
  },
  {
    name: 'MR.Vishwanath',
    subject: 'Java FullStack',
    experience: '16+ years',
    description: 'Specialist in Java and Spring Framework.',
    extraDetails: 'Vishwanath covers Java fundamentals, OOP principles, and Spring Framework.',
    reviews: '4.8 stars from 150+ students',
    classesPerDay: '2 classes',
    otherDetails: 'Available for evening sessions.',
    image: '',
  },
  {
    name: 'MR.MadukarReddy',
    subject: 'DevOps',
    experience: '10+ years',
    description: 'Focus on CI/CD, Docker, and Kubernetes.',
    extraDetails: 'Madhukar teaches CI/CD pipelines, Docker containerization, and Kubernetes orchestration.',
    reviews: '4.9 stars from 180+ students',
    classesPerDay: '4 classes',
    otherDetails: 'Available for morning and evening sessions.',
    image: '',
  },
  {
    name: 'MR.Manohar',
    subject: 'Testing',
    experience: '13+ years',
    description: 'Knowledgeable in automated testing and QA processes.',
    extraDetails: 'Manhor covers automated testing tools, QA methodologies, and best practices.',
    reviews: '4.7 stars from 160+ students',
    classesPerDay: '2 classes',
    otherDetails: 'Flexible schedule.',
    image: '',
  },
  {
    name: 'MR.Srinivas',
    subject: 'Web Development',
    experience: '13+ years',
    description: 'Specialist in front-end and back-end web development.',
    extraDetails: 'Srinivas teaches HTML, CSS, JavaScript, and back-end development with Node.js.',
    reviews: '5 stars from 210+ students',
    classesPerDay: '3 classes',
    otherDetails: 'Available for weekend and evening sessions.',
    image: '',
  },
  {
    name: 'MR.Akhil',
    subject: 'Digital Marketing',
    experience: '10+ years',
    description: 'Expert in SEO, SEM, and social media marketing.',
    extraDetails: 'Akhil covers SEO strategies, SEM campaigns, and social media marketing techniques.',
    reviews: '4.6 stars from 140+ students',
    classesPerDay: '2 classes',
    otherDetails: 'Available for flexible timings.',
    image: '',
  },
];



const Tutors = () => {
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [clickedTutor, setClickedTutor] = useState(null);

  const handleMouseEnter = (tutor) => {
    setSelectedTutor(tutor);
  };

  const handleMouseLeave = () => {
    setSelectedTutor(null);
  };

  const handleCardClick = (tutor) => {
    setClickedTutor(tutor);
  };

  const handleClosePopup = () => {
    setClickedTutor(null);
  };

  return (
    <div className="tutors-container">
      <h1 className="tutors-title">Our Tutors</h1>
      <div className="tutors-list">
        {tutors.map((tutor, index) => (
          <div
            key={index}
            className="tutor-card"
            onMouseEnter={() => handleMouseEnter(tutor)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCardClick(tutor)}
          >
            {tutor.image ? (
              <img src={tutor.image} alt={tutor.name} className="tutor-image" />
            ) : (
              <FontAwesomeIcon icon={faUserCircle} className="tutor-icon" />
            )}
            <h2 className="tutor-name">{tutor.name}</h2>
            <p className="tutor-subject">{tutor.subject}</p>
            <p className="tutor-experience">{tutor.experience}</p>
            <p className="tutor-description">{tutor.description}</p>
            {selectedTutor === tutor && (
              <div className="tutor-popup">
                <p>{tutor.extraDetails}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {clickedTutor && (
        <div className={`new-popup-overlay ${clickedTutor ? 'active' : ''}`} onClick={handleClosePopup}>
          <div className="new-popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-headers">
              <h2>{clickedTutor.name}</h2>
              <span className="popup-close" onClick={handleClosePopup}>x</span>
            </div>
            <div><strong>Subject:</strong> {clickedTutor.subject}</div>
            <div><strong>Experience:</strong> {clickedTutor.experience}</div>
            <div><strong>Description:</strong> {clickedTutor.description}</div>
            <div><strong>Extra Details:</strong> {clickedTutor.extraDetails}</div>
            <div><strong>Reviews:</strong> {clickedTutor.reviews}</div>
            <div><strong>Classes Per Day:</strong> {clickedTutor.classesPerDay}</div>
            <div><strong>Other Details:</strong> {clickedTutor.otherDetails}</div>
          </div>
        </div>
)}


    </div>
  );
};

export default Tutors;
