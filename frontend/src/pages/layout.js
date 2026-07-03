// src/components/Layout.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routes
import './components/layout.css'; // You might want to rename this file as well

function Layout() {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-content">
        <NavigationBar />
        <div className="container">
          <Outlet /> {/* This will render the current route's component */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

