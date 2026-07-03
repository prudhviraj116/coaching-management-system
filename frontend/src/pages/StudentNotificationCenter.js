import React, { useContext } from 'react';
import { TaskContext } from '../pages/TaskContext';
import './StudentNotificationCenter.css';

const StudentNotificationCenter = () => {
  const { tasks, clearTasks } = useContext(TaskContext);

  return (
    <div className="student-notification-center">
      <button className="back-button" onClick={() => window.history.back()}>Back</button>
      <h2>Task Center</h2>
      <button className="clear-button" onClick={clearTasks}>Clear All</button>
      {tasks.map(task => (
        <div className="task-card" key={task.id}>
          <h3>{task.type}</h3>
          <p>{task.content}</p>
          {task.imageUrl && <img src={task.imageUrl} alt="Task" />}
        </div>
      ))}
    </div>
  );
};

export default StudentNotificationCenter;
