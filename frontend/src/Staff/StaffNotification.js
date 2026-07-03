import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Staff/StaffNotifications.css'; // Ensure you have relevant CSS for styling

const StaffNotification = ({ setView }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/studentportal/notification/');
        const now = new Date();
        const twoDaysAgo = new Date(now.setDate(now.getDate() - 2));
        
        // Filter out notifications older than 2 days
        const filteredNotifications = response.data
          .filter(notification => new Date(notification.created_at) >= twoDaysAgo);
        
        // Sort notifications by creation date (newest first)
        const sortedNotifications = filteredNotifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        setNotifications(sortedNotifications);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to fetch notifications');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = async (id) => {
    try {
      await axios.post(`http://127.0.0.1:8000/studentportal/notification/${id}/mark_as_read/`);
      
      // Update local state to reflect read status
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
    } catch (err) {
      console.error('Error updating notification status:', err);
    }
  };

  // Render loading state
  if (loading) return <div className="loading-container">Loading...</div>;

  // Render error state
  if (error) return <div className="error-container">{error}</div>;

  // Render notifications if data is available
  return (
    <div className="notification-container">
      <h1 className="notification-heading">Notification List</h1>
      <button onClick={() => setView('false')} type="button" className="close-button-noti">
        &times;
      </button>
      {notifications.length > 0 ? (
        <ul className="notification-list">
          {notifications.map(notification => (
            <li
              key={notification.id}
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
              onClick={() => !notification.read && handleNotificationClick(notification.id)} // Mark as read when clicked
            >
              <div className="notification-content">
                <div className="notification-header">
                  <p><strong>Name:</strong> {notification.name}</p>
                  {notification.read && <span className="read-tick">&#10003;</span>} {/* Tick mark for read notifications */}
                </div>
                <p><strong>Email:</strong> {notification.email}</p>
                <p><strong>Phone:</strong> {notification.phone_number}</p>
                <p><strong>Message:</strong> {notification.message}</p>
                <p><strong>Created At:</strong> {new Date(notification.created_at).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-notifications">No notifications found</p>
      )}
    </div>
  );
};

export default StaffNotification;
