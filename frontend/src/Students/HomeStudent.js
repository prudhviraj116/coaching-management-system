import React, { useState, useEffect } from 'react';
import Dashboard123 from '../Students/DashbordStudent';
import Sidebar from '../Students/SidebarStudent';
import '../Students/HomeStudent.css'; // Make sure this path is correct
import VideoApp from '../Students/ClassVideostudent';
import UserProfile from '../Students/Profile'; // Import UserProfile component
import StudentNotificationCenter from '../Students/StudentNotificationCenter';
import StudentInfoForm from '../Students/StudentInfoForm';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';

const HomeStudent = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [userProfile, setUserProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [readNotifications, setReadNotifications] = useState(0);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) return;

    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const profileResp = await axios.get('http://localhost:8000/studentportal/view_loginuser_profile/', {
          headers: { 'Authorization': `token ${token}` }
        });
        setUserProfile(profileResp.data);
      } catch (err) {
        console.error('Error fetching student profile:', err);
      }
    };

    // Fetch notifications
    const fetchNotifications = async () => {
      try {
        const resp = await axios.get('http://localhost:8000/studentportal/notification/', {
          headers: { 'Authorization': 'token ' + token }
        });
        setNotifications(resp.data);
        setReadNotifications(resp.data.filter(n => !n.read).length);
      } catch (err) {
        console.error('Error fetching student notifications:', err);
      }
    };

    fetchProfile();
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [token]);

  const handleMarkSingleNotificationAsRead = async (id) => {
    try {
      await axios.post(`http://localhost:8000/studentportal/notification/${id}/mark_as_read/`, {}, {
        headers: { 'Authorization': 'token ' + token }
      });
      const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
      setNotifications(updated);
      setReadNotifications(updated.filter(n => !n.read).length);
    } catch (e) {
      console.error(e);
    }
  };

  const handleNotificationClearAll = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    setReadNotifications(0);
    setShowNotificationDropdown(false);
  };

  const handleSidebarClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const username = localStorage.getItem('username') || 'Student';

  return (
    <div className="student-wrapper" style={{ backgroundColor: '#0f172a' }}> {/* Dark mode background */}
      <Sidebar onSidebarClick={handleSidebarClick} />
      <div className="student-main-content">
        
        {/* Top Header with Notification bell */}
        <div className="student-topbar" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          backgroundColor: '#1e293b',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          marginBottom: '24px',
          color: '#f8fafc',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
        }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', margin: 0 }}>Welcome, {username}!</h2>
          <div className="notification-bell-wrapper" onClick={() => setShowNotificationDropdown(!showNotificationDropdown)} style={{ position: 'relative', cursor: 'pointer', padding: '8px' }}>
            <FaBell style={{ fontSize: '1.25rem', color: '#94a3b8', transition: 'color 0.2s' }} />
            {readNotifications > 0 && (
              <span style={{
                position: 'absolute',
                top: '0px',
                right: '0px',
                backgroundColor: '#ef4444',
                color: 'white',
                borderres: '9999px',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '0.65rem',
                fontWeight: '700',
                lineHeight: 1
              }}>{readNotifications}</span>
            )}
            
            {showNotificationDropdown && (
              <div className="notification-dropdown-menu" onClick={(e) => e.stopPropagation()} style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                backgroundColor: '#1e293b',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                minWidth: '280px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
                zIndex: 2000,
                padding: '12px',
                animation: 'fadeIn 0.2s ease-out',
                color: '#f8fafc',
                textAlign: 'left',
                marginTop: '8px'
              }}>
                <div className="dropdown-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '6px' }}>
                  <h5 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold' }}>Announcements</h5>
                  <button className="clear-btn" onClick={handleNotificationClearAll} style={{ background: 'none', border: 'none', color: '#38b7ed', fontSize: '0.75rem', cursor: 'pointer', fontWeight: '600' }}>Clear All</button>
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
                        borderLeft: !n.read ? '3px solid #38b7ed' : 'none'
                      }}>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#f8fafc' }}>{n.message}</p>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{new Date(n.created_at).toLocaleDateString()}</span>
                      </div>
                    ))
                  ) : (
                    <p style={{ margin: 0, padding: '10px 0', fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center' }}>No new announcements</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Render component based on activeComponent state */}
        {activeComponent === 'dashboard' && <Dashboard123 profileData={userProfile} />}
        {activeComponent === 'profile' && <UserProfile profile={userProfile} />}
        {activeComponent === 'classvideo' && <VideoApp />}
        {activeComponent === 'notification' && <StudentNotificationCenter />}
        {activeComponent === 'studentinfo' && <StudentInfoForm />}
      </div>
    </div>
  );
};

export default HomeStudent;
