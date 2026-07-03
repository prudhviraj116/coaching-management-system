import React, { useState, useEffect, useContext } from 'react';
import { FaSignOutAlt, FaBell } from 'react-icons/fa';
import '../Staff/StaffDashborad.css';
import logo from '../assets/images/V-CUBE-Logo.jpg';
import { logincontext } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard1 = ({ setView }) => {
  const [[isAuthenticated, setIsAuthenticated], [token, setToken]] = useContext(logincontext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [readNotifications, setReadNotifications] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);


  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    if (!storedToken || role !== 'staff') {
      navigate('/staff'); // Redirect if no token or not staff
      return;
    }
    setToken(storedToken);
    setIsAuthenticated(true);

    const fetchData = async () => {
      try {
        // Retrieve profile data from localStorage
        const savedProfile = localStorage.getItem('profile');
        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        } else {
          // Fetch profile data from API
          const profileResp = await axios.get('http://localhost:8000/staffportal/stafflogindetails/', {
            headers: { 'Authorization': 'token ' + storedToken }
          });
          setProfile(profileResp.data);
          localStorage.setItem('profile', JSON.stringify(profileResp.data));
        }

        // Retrieve notifications from localStorage or API
        const savedNotifications = localStorage.getItem('notifications');
        if (savedNotifications) {
          const notificationsData = JSON.parse(savedNotifications);
          setNotifications(notificationsData);
          const unreadNotifications = notificationsData.filter(notification => !notification.read).length;
          setReadNotifications(unreadNotifications);
        } else {
          // Retrieve notifications from API
          const notificationsResp = await axios.get('http://localhost:8000/studentportal/notification/', {
            headers: { 'Authorization': 'token ' + storedToken }
          });
          setNotifications(notificationsResp.data);

          // Update read notifications count
          const unreadNotifications = notificationsResp.data.filter(notification => !notification.read).length;
          setReadNotifications(unreadNotifications);
          localStorage.setItem('notifications', JSON.stringify(notificationsResp.data)); // Store full notifications data

          // Trigger shake animation if there's a new unread notification
          if (unreadNotifications > 0) {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 1000); // Reset shaking after animation
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate, setToken, setIsAuthenticated]);

  const imageUrl = profile?.Image ? `http://localhost:8000${profile.Image}` : null;

  const handleLogout = (event) => {
    event.preventDefault(); // Prevent default link behavior
    localStorage.clear();
    setIsAuthenticated(false);
    setToken(null);
    setNotifications([]); // Clear notifications state
    setReadNotifications(0); // Reset badge count
    navigate('/staff'); // Redirect to the homepage or login page
  };


  const handleProfileClick = () => {
    setShowProfilePopup(true);
  };

  const closeProfilePopup = () => {
    setShowProfilePopup(false);
  };

  const handleMarkSingleNotificationAsRead = async (id) => {
    try {
      await axios.post(`http://localhost:8000/studentportal/notification/${id}/mark_as_read/`, {}, {
        headers: { 'Authorization': 'token ' + token }
      });
      const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
      setNotifications(updated);
      setReadNotifications(updated.filter(n => !n.read).length);
      localStorage.setItem('notifications', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleNotificationClearAll = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    setReadNotifications(0);
    localStorage.setItem('notifications', JSON.stringify(updated));
    setShowNotificationDropdown(false);
  };


  return (
    <div className='staff-background'>
      <header className="staff-header">
        <nav className="staff-navbar">
          <div className="staff-navbar-left">
            <div className="staff-logo">
              <img src={logo} alt="Logo" />
            </div>
          </div>
          <div className="staff-navbar-middle">
            <div onClick={() => setView('false')} className="staff-navbar-item">Home</div>
            <div className="staff-dropdown">
              <span className="staff-dropdown-trigger" onClick={() => setView('false')}>Student Register</span>
              <div className="staff-dropdown-content">
                <div onClick={() => setView('Form')} className="staff-dropdown-item">Insert Student</div>
                <div onClick={() => setView('update')} className="staff-dropdown-item">Update Student</div>
                <div onClick={() => setView('delete')} className="staff-dropdown-item">Delete Student</div>
                <div onClick={() => setView('view')} className="staff-dropdown-item">View Student</div>
                <div onClick={() => setView('batch')} className="staff-dropdown-item">Add Batches</div>
                <div onClick={() => setView('fee')} className="staff-dropdown-item">Make Fee Payment</div>
              </div>
            </div>
            <div className="staff-dropdown">
              <span className="staff-dropdown-trigger" onClick={() => setView('false')}>Attendance</span>
              <div className="staff-dropdown-content">
                <div onClick={() => setView('Add')} className="staff-dropdown-item">Insert Attendance</div>
              </div>
            </div>
            <div onClick={() => setView('video')} className="staff-navbar-item">Class Videos</div>
            <div onClick={() => setView('task')} className="staff-navbar-item">Tasks</div>
            <div className="staff-navbar-item" onClick={() => setShowNotificationDropdown(!showNotificationDropdown)} style={{ position: 'relative' }}>
              <div className="notification-icon-container">
                <FaBell className={`notification-icon ${isShaking ? 'shake' : ''}`} />
                {readNotifications > 0 && (
                  <span className="notification-badge">{readNotifications}</span>
                )}
              </div>
              Notification  
              {showNotificationDropdown && (
                <div className="notification-dropdown-menu" onClick={(e) => e.stopPropagation()} style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  minWidth: '280px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                  zIndex: 2000,
                  padding: '12px',
                  animation: 'fadeIn 0.2s ease-out',
                  color: 'var(--text-primary)',
                  textAlign: 'left'
                }}>
                  <div className="dropdown-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                    <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 'bold' }}>Announcements</h5>
                    <button className="clear-btn" onClick={handleNotificationClearAll} style={{ background: 'none', border: 'none', color: 'var(--accent-color)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: '600' }}>Clear All</button>
                  </div>
                  <div className="dropdown-items" style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {notifications.length > 0 ? (
                      notifications.map(n => (
                        <div key={n.id} className={`dropdown-item ${!n.read ? 'unread' : ''}`} onClick={() => handleMarkSingleNotificationAsRead(n.id)} style={{
                          padding: '8px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          backgroundColor: !n.read ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                          transition: 'background 0.2s',
                          borderLeft: !n.read ? '3px solid var(--accent-color)' : 'none'
                        }}>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{n.message}</p>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{new Date(n.created_at).toLocaleDateString()}</span>
                        </div>
                      ))
                    ) : (
                      <p style={{ margin: 0, padding: '10px 0', fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>No notifications</p>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
          <div className="staff-navbar-right">
            <div className="staff-profile">
              {profile ? (
                <img 
                  src={imageUrl} 
                  alt={profile.userrole ? profile.userrole.username : 'Profile'} 
                  className="profile-image" 
                  onClick={handleProfileClick}
                />
              ) : (
                'Loading...'
              )}
              <button onClick={handleLogout} className="staff-logout">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </nav>
        <div className='staff-content'>
          <h1>Welcome to VSMS</h1>
          <p>"Your dedication and commitment are essential to our team's success.<br /> Let's continue to collaborate and achieve our goals together."</p>
        </div>
      </header>
      <div className='staff-next-box'>
        <h2 className='staff-h2'>Our Missions</h2>
        <div className="staff-features">
          <div className="staff-feature">
            <h2>Daily Tasks</h2>
            <p>Check Each And Every Batch Given To The Tasks.</p>
            <p>Check The Given Tasks Are Completed Or Not.</p>
          </div>

          <div className="staff-feature">
            <h2>Weekly Mock Interviews</h2>
            <p>Conducting Mock Interviews for Every Batch.</p>
            <p>Discuss What Went Well.</p>
          </div>

          <div className="staff-feature">
            <h2>Monthly Reviews</h2>
            <p>Reviews On Mock Interviews, Weekly Tests, Case Studies, Placement Assistance.</p>
          </div>

          <div className="staff-feature">
            <h2>Feedback about Training Session</h2>
            <p className='staff-p'>Feedback About Python Class, Aptitude Class, & Labs.</p>
          </div>
        </div>
      </div>
      <div className="staff-footer">
        <p>&copy; 2024 VSMC. All rights reserved.</p>
        <p>
          <a href='#'>Privacy Policy</a> |
          <a href='#'>Terms of Service</a> |
          <a href='#'>Contact Us</a>
        </p>
      </div>

      {/* Profile Popup */}
      {showProfilePopup && (
        <div className="profile-popup">
          <div className="profile-popup-content">
            <span className="close-popup" onClick={closeProfilePopup}>×</span>
            <h2>Profile Details</h2>
            <p><strong>Staff ID:</strong> {profile?.staff_id}</p>
            <p><strong>Name:</strong> {profile?.userrole?.username}</p>
            <p><strong>Email:</strong> {profile?.userrole?.email}</p>
            <p><strong>Phone Number:</strong> {profile?.mobile}</p>
            <p><strong>Address:</strong> {profile?.address}</p>
            <p><strong>Gender:</strong> {profile?.Gender}</p>
            <p><strong>Designation:</strong> {profile?.desgination}</p>
            <p><strong>Created At:</strong> {profile?.created_at}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard1;
