import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './StudentNotificationCenter.css'; // Ensure this path is correct
import { logincontext } from '../App';

const StudentNotificationCenter = () => {
  const [tasks, setTasks] = useState([]);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [[isAuthenticated, setIsAuthenticated], [token, setToken]] = useContext(logincontext);
  const [profile, setProfile] = useState({});
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (isAuthenticated && token) {
          const profileResp = await axios.get('http://127.0.0.1:8000/studentportal/view_loginuser_profile/', {
            headers: { 'Authorization': `Token ${token}` }
          });

          if (isMounted) {
            setProfile(profileResp.data);

            const storedTasks = localStorage.getItem('tasks');
            if (storedTasks) {
              const parsedTasks = JSON.parse(storedTasks);
              setTasks(parsedTasks);
              setDisplayedTasks(parsedTasks.slice(0, 5));
            } else {
              const response = await axios.get(`http://127.0.0.1:8000/studentportal/gettask/batch/${profileResp.data.batch}/`, {
                headers: { 'Authorization': `Token ${token}` }
              });
              const fetchedTasks = response.data;
              setTasks(fetchedTasks);
              setDisplayedTasks(fetchedTasks.slice(0, 5));
              localStorage.setItem('tasks', JSON.stringify(fetchedTasks));
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };

    const initTasks = async () => {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        setTasks(parsedTasks);
        setDisplayedTasks(parsedTasks.slice(0, 5));
      } else {
        await fetchData();
      }
    };

    initTasks();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, token]);

  const handleImageClick = (imageSrc) => {
    setModalImage(imageSrc);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  const handleShowAllTasks = () => {
    setDisplayedTasks(tasks);
    setShowAll(true);
  };

  const handleShowLatestTasks = () => {
    setDisplayedTasks(tasks.slice(0, 5));
    setShowAll(false);
  };

  return (
    <div className="notification-center">
      <h1 className="header">Task Center</h1>

      <div className="button-group">
        {tasks.length > 5 && !showAll && (
          <button onClick={handleShowAllTasks} className="button show-all">Show All Tasks</button>
        )}
        {showAll && (
          <button onClick={handleShowLatestTasks} className="button show-latest">Show Latest Tasks</button>
        )}
      </div>

      <div className="task-list">
        {displayedTasks.length > 0 ? (
          displayedTasks.map(task => (
            <div className="task-card" key={task.id}>
              <h3 className="task-title">{task.task_type}</h3>
              <p className="task-content">{task.content}</p>
              {task.image && (
                <img 
                  src={`http://127.0.0.1:8000${task.image}`} 
                  alt={task.task_type} 
                  className="task-image" 
                  onClick={() => handleImageClick(`http://127.0.0.1:8000${task.image}`)} 
                />
              )}
            </div>
          ))
        ) : (
          <p className="no-tasks">No tasks available.</p>
        )}
      </div>

      {modalImage && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Full view" className="modal-image" />
            <button className="modal-close" onClick={handleCloseModal}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentNotificationCenter;
