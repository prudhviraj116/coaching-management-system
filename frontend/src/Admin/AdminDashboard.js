import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { FaUsers, FaChalkboardTeacher, FaBook, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AdminStaff from '../Admin/AdminStaff';
import AdminStudent from '../Admin/AdminStudent';
import Courses from '../pages/Courses';
import ReportAnalysis from '../Admin/ReportAnalysis';
import Adminreg from '../Admin/Adminreg';
import UpdateStaff from '../Admin/UpdateStaff';
import defaultImage from '../assets/images/V-CUBE-Logo.jpg';
import DepartmentForm from './DepartmentForm';
import { useLocation } from 'react-router-dom';
import StaffReg from './StaffReg1';
const AdminDashboard = () => {
  const location = useLocation();
  const [selectedSection, setSelectedSection] = useState(location.pathname.replace('/', '') || 'home');

  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    if (!token || role !== 'admin') {
      navigate('/admin/login');
      return;
    }
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || '');
    setSelectedSection(location.pathname.replace('/', '') || 'home');

  }, [location.pathname, navigate]);


  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin/login');
  };


  const renderContent = () => {
    switch (selectedSection) {
      case 'staffs':
        return <AdminStaff  setSelectedSection={setSelectedSection}/>;
      case 'staffreg':
        return <StaffReg  setSelectedSection={setSelectedSection}/>;
      case 'student':
        return <AdminStudent  setSelectedSection={setSelectedSection}/>;
      case 'courses':
        return <Courses  setSelectedSection={setSelectedSection}/>;
      case 'updateStaff':
        return <UpdateStaff setSelectedSection={setSelectedSection}/>;
      case 'adminreg':
        return <Adminreg setSelectedSection={setSelectedSection}/>;
      case 'departmentForm':
        return <DepartmentForm  setSelectedSection={setSelectedSection}/>;
      case 'dashboard':
      default:
        return <ReportAnalysis />; // Default view
    }
  };

  return (
    <div className="admin-dashboard-containers">
      <aside className="sidebars">
        <div className="sidebar-headers">
          <img src={defaultImage} alt="V-CUBE Logo" className="sidebar-image" />
          <h2>Admin Dashboard</h2>
          {username && <p className='color'>Welcome, {username}!</p>}
        </div>
        <nav className="sidebar-navs">
          <ul>
            <li onClick={() => setSelectedSection('staffs')}><FaUsers /> Staff</li>
            <li onClick={() => setSelectedSection('student')}><FaChalkboardTeacher /> Students</li>
            <li onClick={() =>setSelectedSection('courses')}><FaBook /> Courses</li>
            <li onClick={() => setSelectedSection('departmentForm')}><FaBook /> Department Form</li>
          </ul>
        </nav>
        <button onClick={handleLogout} className="logout-buttons">
          <FaSignOutAlt /> Logout
        </button>
      </aside>
      <div className="main-contents">
        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
