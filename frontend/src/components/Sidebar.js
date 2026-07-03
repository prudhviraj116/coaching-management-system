// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from '../assets/logo.jpeg'; // Import the logo image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faInfoCircle,faEnvelope,faConciergeBell,faImage,faVideo,faBlog, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" className="logo-image" /> {/* Use the logo image */}
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/home" className="sidebar-link"> <FontAwesomeIcon icon={faHome}/> Home </Link>
        </li>
        <li>
          <Link to="/about" className="sidebar-link"><FontAwesomeIcon icon={faInfoCircle}/> About </Link>
        </li>
        <li>
          <Link to="/Services" className="sidebar-link"> <FontAwesomeIcon icon={faConciergeBell}/> Services</Link>
        </li>
        <li>
          <Link to="/Contact" className="sidebar-link"> <FontAwesomeIcon icon={faEnvelope}/> Contact</Link>
        </li>
        <li>
        <Link to="/gallery" className="sidebar-link"> <FontAwesomeIcon icon={faImage} /> Gallery</Link>
        </li>
        <li>
        <Link to="/webinars" className="sidebar-link"><FontAwesomeIcon icon={faVideo} /> Webinars</Link>
        </li>
        <li>
          <Link to="/blog" className="sidebar-link"> <FontAwesomeIcon icon={faBlog} /> Blog</Link>
        </li>
        <li>
        <Link to="/help" className="sidebar-link"> <FontAwesomeIcon icon={faQuestionCircle} /> Help</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
