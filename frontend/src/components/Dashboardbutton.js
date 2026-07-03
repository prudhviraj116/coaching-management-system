// src/components/DashboardButton.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboardbutton.css'; // Optional: Import your CSS for styling

const DashboardButton = ({ to, label }) => {
  console.log({label})
  return (
    <Link to={to} className="dashboard-button">
      {label}
    </Link>
    
  );
};

export default DashboardButton;
