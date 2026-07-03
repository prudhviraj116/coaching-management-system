// src/components/Dashboard.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-content">
        <NavigationBar />
        <div className="content-container">
          <div className="headline">
            <h2>V cube Student Management System.</h2>
          </div>
          <div className="feature-section">
            <p className="feature-item">
              <span className="feature-icon">&#10003;</span> Manage student records, track attendance, and generate insightful reports effortlessly.
            </p>
            <p className="feature-item">
              <span className="feature-icon">&#10003;</span> Collaborate with fellow educators to enhance curriculum and educational outcomes.
            </p>
          </div>
          <div className="feature-section">
            <h3 className="section-title">For Students:</h3>
            <p className="feature-item">
              <span className="feature-icon">&#10003;</span> Access a wide range of courses and interactive learning materials.
            </p>
            <p className="feature-item">
              <span className="feature-icon">&#10003;</span> Submit assignments online and track your progress seamlessly.
            </p>
          </div>
          <div className="feature-section">
            <h3 className="section-title">For Trainers:</h3>
            <p className="feature-item">
              <span className="feature-icon">&#10003;</span> Design dynamic courses and engage students with innovative teaching methods.
            </p>
            <p className="feature-item">
              <span className="feature-icon">&#10003;</span> Monitor student progress and provide personalized feedback with advanced analytics.
            </p>
          </div>
          <div className="feature-section">
            <h3 className="section-title">Placements Activities:</h3>
            <p className="feature-item">
              <span className="feature-icon">&#10003;</span> Connect with industry leaders through internships and networking events.
            </p>
          </div>
          <div className="feature-section">
            <h3 className="section-title">Our Courses:</h3>
            <p className="feature-item">
              <span className="feature-icon">&#10003;</span> Explore diverse courses in technology, programming languages, digital marketing, and more.
            </p>
            <p className="feature-item">
              <span className="feature-icon">&#10003;</span> Gain industry-aligned certifications for career readiness.
            </p>
          </div>
          <div className="feature-section">
            <h3 className="section-title">Programming and Technical Skills:</h3>
            <p className="feature-item">
              <span className="feature-icon">&#10003;</span> Master programming languages like Python, Java, and JavaScript.
            </p>
            <p className="feature-item">
              <span className="feature-icon">&#10003;</span> Develop skills in web development, mobile app development, and cloud computing.
            </p>
            <p className="feature-item">
              <span className="feature-icon">&#10003;</span> Learn data structures, algorithms, and database management for real-world applications.
            </p>
          </div>
          <p className="closing-text">
            Join us in redefining education and shaping futures with V Cube Software Solutions Pvt. Ltd. Embrace innovation, embrace excellence.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
