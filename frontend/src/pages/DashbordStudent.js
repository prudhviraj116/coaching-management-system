import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashbordStudent.css';
import logo from '../assets/logo.jpeg';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';

const StudentDashboard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');
  const [studentList, setStudentList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [batchNumber, setBatchNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [performanceData, setPerformanceData] = useState({
    lab: [],
    mock: [],
    weekTest: []
  });
  const [selectedPerformanceType, setSelectedPerformanceType] = useState(null);

  const navigate = useNavigate();

  const handleBatchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/studentportal/batch/${batchNumber}/students/`);
      setStudentList(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
    setLoading(false);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    fetchPerformanceData(student.id);
    setShowPopup(true);
  };

  const fetchPerformanceData = async (studentId) => {
    try {
      const [labResponse, mockResponse, weekTestResponse] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/studentportal/view_lab_performance/${studentId}/`),
        axios.get(`http://127.0.0.1:8000/studentportal/view_weekelymock_performance/${studentId}/`),
        axios.get(`http://127.0.0.1:8000/studentportal/view_weekelytest_performance/${studentId}/`)
      ]);
      setPerformanceData({
        lab: labResponse.data,
        mock: mockResponse.data,
        weekTest: weekTestResponse.data
      });
    } catch (error) {
      console.error("Error fetching performance data:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedStudent(null);
    setSelectedPerformanceType(null);
  };

  const handleLogout = () => {
    setLogoutMessage('Logged out successfully');
    setTimeout(() => {
      navigate('/Student');
    }, 500);
  };

  const studentData = selectedStudent ? {
    name: selectedStudent.name,
    course: selectedStudent.course,
    examMarks: selectedStudent.examMarks,
    mockMarks: selectedStudent.mockMarks,
    attendance: selectedStudent.attendance
  } : {};

  const data = [
    { title: 'Exam Marks', value: studentData.examMarks || 0, color: '#FF6384' },
    { title: 'Mock Marks', value: studentData.mockMarks || 0, color: '#36A2EB' },
    { title: 'Attendance', value: studentData.attendance || 0, color: '#FFCE56' }
  ];

  return (
    <div className="new-dashboard-container">
      <header className="new-header">
        <img src={logo} className="logo" alt="Logo" />
        <nav className="nav">
          <form className="new-batch-form" onSubmit={handleBatchSubmit}>
            <label htmlFor="batchNumber">Enter Batch Number:</label>
            <input
              id="batchNumber"
              type="text"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              placeholder="Batch Number"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </form>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <section className="new-student-list-section">
        <h2>Student List</h2>
        <ul className="new-student-list">
          {studentList.map(student => (
            <li key={student.id} onClick={() => handleStudentClick(student)}>
              {student.name}
            </li>
          ))}
        </ul>
      </section>

      {showPopup && selectedStudent && (
        <div className="gt-popup-overlay">
          <div className="gt-popup-content">
            <div className="gt-close-button" onClick={handleClosePopup}>X</div>
            <h2>Student Performance</h2>
            <div className="new-student-details">
              <p><strong>Name:</strong> {studentData.name}</p>
              <p><strong>Course:</strong> {studentData.course}</p>
              <p><strong>Exam Marks:</strong> {studentData.examMarks}</p>
              <p><strong>Mock Marks:</strong> {studentData.mockMarks}</p>
              <p><strong>Attendance:</strong> {studentData.attendance}%</p>
            </div>
            <div className="pie-chart-container">
              <PieChart
                data={data}
                lineWidth={60}
                label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
                labelStyle={{
                  fontSize: '5px',
                  fontFamily: 'sans-serif',
                  fill: '#121212'
                }}
                labelPosition={100 - 60 / 2}
                animate={true}
                animationDuration={500}
                animationEasing="ease-out"
              />
            </div>
            <div className="new-performance-controls">
              <button onClick={() => setSelectedPerformanceType('lab')}>Lab Performance</button>
              <button onClick={() => setSelectedPerformanceType('mock')}>Mock Performance</button>
              <button onClick={() => setSelectedPerformanceType('weekTest')}>Weekly Test Performance</button>
            </div>
            {selectedPerformanceType && (
              <div className="new-performance-tables">
                <h3>{selectedPerformanceType.charAt(0).toUpperCase() + selectedPerformanceType.slice(1)} Performance</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Details</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceData[selectedPerformanceType].map(entry => (
                      <tr key={entry.id}>
                        <td>{entry.date}</td>
                        <td>{entry.details}</td>
                        <td>{entry.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
