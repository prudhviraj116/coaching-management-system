import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCertificate, faBookOpen, faUser, faUserGraduate, faSignOut, faBars } from '@fortawesome/free-solid-svg-icons';
import { faHome, faInfoCircle, faEnvelope, faConciergeBell, faImage, faVideo, faBlog, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import '../components/HomeMainDashboard.css';
import logo from '../assets/logo.jpeg';

const MainDashboard = () => {
  const navigate = useNavigate();
  // Sidebar default is collapsed on mobile
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleNavigation = (path) => {
    navigate(path);
    // Auto-close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
      setSidebarVisible(false);
    }
  };

  return (
    <div className={`dashboard-container ${sidebarVisible ? 'sidebar-visible' : ''}`}>
      <header className="navbar">
        <button className="navbar-toggle" onClick={handleToggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="navbar-content">
          <ul className={`navbar-links ${sidebarVisible ? 'active' : ''}`}>
            <li><button onClick={() => handleNavigation('/tutors')} className="nav-button"><FontAwesomeIcon icon={faBook} /> Tutors</button></li>
            <li><button onClick={() => handleNavigation('/certifications')} className="nav-button"><FontAwesomeIcon icon={faCertificate} /> Certifications</button></li>
            <li><button onClick={() => handleNavigation('/courses')} className="nav-button"><FontAwesomeIcon icon={faBookOpen} /> Courses</button></li>
            <li><button onClick={() => handleNavigation('/staff')} className="nav-button"><FontAwesomeIcon icon={faUser} /> Staff login</button></li>
            <li><button onClick={() => handleNavigation('/student')} className="nav-button"><FontAwesomeIcon icon={faUserGraduate} /> Student login</button></li>
            <li>
              <button onClick={() => handleNavigation('/admin/login')} className="nav-button"><FontAwesomeIcon icon={faSignOut} /> Admin</button>
            </li>
          </ul>
        </div>
      </header>
      
      <div className="main-layout">
        <nav className={`sidebar ${sidebarVisible ? 'sidebar-visible' : ''}`}>
          <div className="sidebar-logo">
            <img src={logo} alt="Logo" className="logo-image" />
          </div>
          <ul className="sidebar-menu">
            <li><button onClick={() => handleNavigation('/home')} className="sidebar-button"><FontAwesomeIcon icon={faHome} /> Home</button></li>
            <li><button onClick={() => handleNavigation('/about')} className="sidebar-button"><FontAwesomeIcon icon={faInfoCircle} /> About</button></li>
            <li><button onClick={() => handleNavigation('/gallery')} className="sidebar-button"><FontAwesomeIcon icon={faImage} /> Gallery</button></li>
            <li><button onClick={() => handleNavigation('/blog')} className="sidebar-button"><FontAwesomeIcon icon={faBlog} /> Blog</button></li>
            <li><button onClick={() => handleNavigation('/contact')} className="sidebar-button"><FontAwesomeIcon icon={faEnvelope} /> Contact</button></li>
            <li><button onClick={() => handleNavigation('/services')} className="sidebar-button"><FontAwesomeIcon icon={faConciergeBell} /> Services</button></li>
            <li><button onClick={() => handleNavigation('/help')} className="sidebar-button"><FontAwesomeIcon icon={faQuestionCircle} /> Help</button></li>
            <li><button onClick={() => handleNavigation('/webinars')} className="sidebar-button"><FontAwesomeIcon icon={faVideo} /> Webinars</button></li>
          </ul>
        </nav>

        <main className="main-content">
          <Outlet />
        </main>
      </div>

      <div className='Main_footer'>
        <Footer />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${sidebarVisible ? 'visible' : ''}`}
        onClick={() => setSidebarVisible(false)}
      ></div>
    </div>
  );
};

export default MainDashboard;
