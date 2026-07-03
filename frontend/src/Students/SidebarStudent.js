import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Students/SidebarStudent.css'; // Updated CSS import
import logo from '../assets/logo.jpeg';
import { FaChartLine, FaUser, FaVideo, FaBell, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';
import { logincontext } from '../App'; // Import your context

const Sidebar = ({ onSidebarClick }) => {
  const [[isAuthenticated, setIsAuthenticated], [token, setToken]] = useContext(logincontext); // Use context
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Perform the logout API call
      await fetch('http://localhost:8000/studentportal/student-logout/', {
        method: 'POST',
        headers: {
          'Authorization': 'token ' + token,
        },
      });

      // Clear authentication context and token
      setIsAuthenticated(false);
      setToken('');
      localStorage.clear();
      
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.clear();
      navigate('/login');
    }
  };


  return (
    <div className="student-sidebar"> {/* Updated class name */}
      <div className="student-sidebar-header"> {/* Updated class name */}
        <img src={logo} alt="Logo" className="student-sideimage" /> {/* Updated class name */}
      </div>
      <div className="student-sidebar-list"> {/* Updated class name */}
        <div onClick={() => onSidebarClick('dashboard')} className="student-sidebar-link"> {/* Updated class name */}
          <FaChartLine className="student-sidebar-icon" /> {/* Updated class name */}
          Performance
        </div>
        <div onClick={() => onSidebarClick('profile')} className="student-sidebar-link"> {/* Updated class name */}
          <FaUser className="student-sidebar-icon" /> {/* Updated class name */}
          Profile
        </div>
        <div onClick={() => onSidebarClick('classvideo')} className="student-sidebar-link"> {/* Updated class name */}
          <FaVideo className="student-sidebar-icon" /> {/* Updated class name */}
          Class Videos
        </div>
        <div onClick={() => onSidebarClick('notification')} className="student-sidebar-link"> {/* Updated class name */}
          <FaBell className="student-sidebar-icon" /> {/* Updated class name */}
         Task Center
        </div>
        <div onClick={() => onSidebarClick('studentinfo')} className="student-sidebar-link"> {/* Updated class name */}
          <FaBell className="student-sidebar-icon" /> {/* Updated class name */}
         StudentInfoForm
        </div>
      </div>
      <div className="student-sidebar-footer"> {/* Updated class name */}
        <button onClick={handleLogout}><FaSignOutAlt /> Log Out</button>
      </div>
    </div>
  );
};

export default Sidebar;
