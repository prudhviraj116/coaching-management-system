// src/App.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createContext } from 'react';

// Layouts
import MainDashboard from './components/HomeMainDashboard';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import StaffLogin from './components/StaffLogin';
import StudentLogin from './Students/StudentLogin';

import Gallery from './pages/Gallery';
import Courses from './pages/Courses';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Help from './pages/Help';
import StaffSignup from './pages/StaffSignup';
import Certifications from './pages/Certifications';
import Careers from './pages/Careers';
import Tutors from './pages/Tutors';
import Webinars from './pages/Webinars';
import Ebooks from './pages/Ebooks';
import FAQ from './pages/Faq';
import ForgotPassword from './components/Forgetpasswordstu';
import StudentNotificationCenter from './pages/StudentNotificationCenter';

// Staff Components
import Staffhome from './Staff/HomepageStaff';
import StaffTaskCenter from './Staff/StaffTaskCenter';
import AttendanceUpdate1 from './Staff/Testing';
import BatchManagement from './Staff/BatchManagement';
import StaffNotification from './Staff/StaffNotification';
import ResumeViewed from './Staff/ResumeViewed';
import OutstandingFees from './Staff/OutstandingFees';

// Student Components
import HomeStudent from './Students/HomeStudent';
import StudentReg from './Students/StudentReg1'; // Alias for unchanged dependency
import DashbordStudent from './Students/DashbordStudent';
import ClassVideostudent from './Students/ClassVideostudent';

// Admin Components
import AdminDashboard from './Admin/AdminDashboard';
import AdminStaff from './Admin/AdminStaff';
import AdminStudents from './Admin/AdminStudent';
import AdminLogin from './Admin/AdminLogin';
import Adminreg from './Admin/Adminreg';
import AdminNotification from './Admin/AdminNotification';
import ReportAnalysis from './Admin/ReportAnalysis';
import UpdateStaff from './Admin/UpdateStaff';
import StaffReg from './Admin/StaffReg1';

import { TaskProvider } from './pages/TaskContext';

export let logincontext = createContext();

function App() {
  let [isAuthenticated, setIsAuthenticated] = useState(false);
  let [token, setToken] = useState('');

  return (
    <TaskProvider>
      <Router>
        <logincontext.Provider value={[[isAuthenticated, setIsAuthenticated], [token, setToken]]}>
          <Routes>
            {/* 
              Public Main Dashboard Layout wrapper 
              All nested routes will be rendered in the <Outlet /> of MainDashboard 
            */}
            <Route path="/" element={<MainDashboard />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="staff" element={<StaffLogin />} />
              <Route path="student" element={<StudentLogin />} />
              <Route path="studentlogin" element={<StudentLogin />} />
              <Route path="login" element={<StudentLogin />} />

              <Route path="gallery" element={<Gallery />} />
              <Route path="courses" element={<Courses />} />
              <Route path="blog" element={<Blog />} />
              <Route path="contact" element={<Contact />} />
              <Route path="services" element={<Services />} />
              <Route path="help" element={<Help />} />
              <Route path="staffsignup" element={<StaffSignup />} />
              <Route path="adminreg" element={<Adminreg />} />
              <Route path="admin/login" element={<AdminLogin />} />
              <Route path="certifications" element={<Certifications />} />
              <Route path="careers" element={<Careers />} />
              <Route path="tutors" element={<Tutors />} />
              <Route path="webinars" element={<Webinars />} />
              <Route path="ebooks" element={<Ebooks />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="studentreg" element={<StudentReg />} />
              <Route path="forgetpasswordstu" element={<ForgotPassword />} />
            </Route>

            {/* Student Independent Dashboard */}
            <Route path="/dashbordstudent" element={<DashbordStudent />} />
            <Route path="/studentdashbord" element={<HomeStudent />} />
            <Route path="/classvideos" element={<ClassVideostudent />} />
            <Route path="/StudentNotificationCenter" element={<StudentNotificationCenter />} />

            {/* Staff Dash Board */}
            <Route path="/staffdashboard" element={<Staffhome />} />
            <Route path="/StaffTaskCenter" element={<StaffTaskCenter />} />
            <Route path="/testing" element={<AttendanceUpdate1 />} />
            <Route path="/batch" element={<BatchManagement />} />
            <Route path="/notifications" element={<StaffNotification />} />
            <Route path="/resume" element={<ResumeViewed />} />
            <Route path="/fees" element={<OutstandingFees />} />

            {/* Admin Dash Board */}
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/staffs" element={<AdminStaff />} />
            <Route path="/adminstudent" element={<AdminStudents />} />
            <Route path="/notifi" element={<AdminNotification />} />
            <Route path="/reports" element={<ReportAnalysis />} />
            <Route path="/updateStaff" element={<UpdateStaff />} />
            <Route path="/StaffReg1" element={<StaffReg />} />

          </Routes>
        </logincontext.Provider>
      </Router>
    </TaskProvider>
  );
}

export default App;
