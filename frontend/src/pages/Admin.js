import React, { useState, useEffect } from 'react';
import './Admin.css'; // Your CSS file for styling
import { Bar, Pie } from 'react-chartjs-2';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    // Fetch dummy data (replace with actual API calls later)
    const fetchDummyData = async () => {
      // Example dummy data
      const dummyStudents = [
        { id: 1, name: 'John Doe', course: 'Full Stack Python', attendance: 95 },
        { id: 2, name: 'Jane Smith', course: 'Web Development', attendance: 90 },
        // Add more students as needed
      ];

      const dummyStaff = [
        { id: 1, name: 'Dr. Smith', department: 'Computer Science' },
        { id: 2, name: 'Prof. Johnson', department: 'Engineering' },
        // Add more staff members as needed
      ];

      const dummyEnrollments = [
        { studentId: 1, courseId: 'FS101', date: '2024-07-20' },
        { studentId: 2, courseId: 'WD202', date: '2024-07-18' },
        // Add more enrollments as needed
      ];

      setStudents(dummyStudents);
      setStaff(dummyStaff);
      setEnrollments(dummyEnrollments);
    };

    fetchDummyData();
  }, []);

  const studentData = {
    labels: ['Students', 'Staff', 'Enrollments'],
    datasets: [
      {
        label: 'Counts',
        data: [students.length, staff.length, enrollments.length],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <header className="header">
        <h1>Welcome Admin!</h1>
      </header>

      <section className="section">
        <div className="overview">
          <div className="card">
            <h2>Students</h2>
            <p>Total: {students.length}</p>
          </div>
          <div className="card">
            <h2>Staff</h2>
            <p>Total: {staff.length}</p>
          </div>
          <div className="card">
            <h2>Enrollments</h2>
            <p>Total: {enrollments.length}</p>
          </div>
        </div>

        <div className="charts">
          <div className="chart">
            <h2>Data Overview</h2>
            <Bar data={studentData} />
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Admin Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
