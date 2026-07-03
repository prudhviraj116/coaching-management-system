import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserGraduate, faEllipsisH, faSignOut, faCertificate, faBook, faBookOpen, faQuestion } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Vcube</div>
      <div className={`navbar-links ${isActive ? 'active' : ''}`}>
        <Link to="/tutors" className="nav-link"><FontAwesomeIcon icon={faBook} /> Tutors</Link>
        <Link to="/certifications" className="nav-link"><FontAwesomeIcon icon={faCertificate} /> Certifications</Link>
        <Link to="/courses" className="nav-link"> <FontAwesomeIcon icon={faBookOpen} /> Courses</Link>
        <Link to="/staff" className="nav-link"> <FontAwesomeIcon icon={faUser} /> Staff login</Link>
        <Link to="/student" className="nav-link"> <FontAwesomeIcon icon={faUserGraduate} /> Student login</Link>
        <div className="nav-dropdown">
          <button className="dropbtn"> <FontAwesomeIcon icon={faEllipsisH} /> More</button>
          <div className="dropdown-content">
            <Link to="/faq" className="dropdown-link"><FontAwesomeIcon icon={faQuestion} /> FAQ</Link>
            <Link to="/Admin" className="dropdown-link"> <FontAwesomeIcon icon={faSignOut} /> Admin</Link>
            <Link to="/forgetpasswordstu" className="dropdown-link"> <FontAwesomeIcon icon={faSignOut} /> forgetpasswordstu</Link>
            <Link to="/StaffTaskCenter" className="dropdown-link"> <FontAwesomeIcon icon={faSignOut} /> StaffTaskCenter</Link>
            <Link to="/StudentNotificationCenter" className="dropdown-link"> <FontAwesomeIcon icon={faSignOut} /> StudentNotificationCenter</Link>
          </div>
        </div>
      </div>
      <button className="navbar-toggle" onClick={handleToggle}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </button>
    </nav>
  );
};

export default Navbar;
