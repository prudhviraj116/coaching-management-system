import React, { useState, useEffect, useContext } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import '../Students/DashbordStudent.css'; // Updated CSS path
import Studentimg from '../assets/images/pro3.jpg'; // Ensure this path matches your file structure
import { logincontext } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const COLORS = ['#FF0000', '#0080FF', '#00BFFF', '#00FFFF', '#00FFBF', '#00FF80', '#00FF40', '#00FF00', '#40FF00', '#80FF00', '#BFFF00', '#FFFF00', '#FFBF00', '#FF8000', '#FF4000'];

const Dashboard123 = () => {
  const [profile, setProfile] = useState({});
  const [attendance, setAttendance] = useState({});
  const [weekelytest, setWeekelytest] = useState({});
  const [weekelymock, setWeekelymock] = useState({});
  const [labData, setLabData] = useState({});
  const [weeklyTestData, setWeeklyTestData] = useState({});
  const [mockData, setMockData] = useState({});
  const [[isAuthenticated, setIsAuthenticated], [token, setToken]] = useContext(logincontext);
  const navigate = useNavigate();

  const [activeChart, setActiveChart] = useState('Lab'); // Default chart type
  const [showTable, setShowTable] = useState(false); // Toggle table visibility

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    if (!token || role !== 'student') {
      navigate('/login'); // Redirect to login if no token or not student
      return;
    }


    setToken(token); // Ensure token is set in context

    const fetchData = async () => {
      try {
        console.log('Student Token:', token);

        const profileResp = await axios.get('http://127.0.0.1:8000/studentportal/view_loginuser_profile/', {
          headers: { 'Authorization': `token ${token}` }
        });
        setProfile(profileResp.data);
        console.log('Student Profile:', profileResp.data);

        const attendanceResp = await axios.get('http://127.0.0.1:8000/studentportal/view_attendancecount/', {
          headers: { 'Authorization': `token ${token}` }
        });
        setAttendance(attendanceResp.data);

        const weeklyTestResp = await axios.get('http://127.0.0.1:8000/studentportal/view_attendancecount_weekelytest/', {
          headers: { 'Authorization': `token ${token}` }
        });
        setWeekelytest(weeklyTestResp.data);

        const weeklyMockResp = await axios.get('http://127.0.0.1:8000/studentportal/view_attendancecount_weekelymock/', {
          headers: { 'Authorization': `token ${token}` }
        });
        setWeekelymock(weeklyMockResp.data);

        const labDataResp = await axios.get('http://127.0.0.1:8000/studentportal/studentattdence_view_Lab/', {
          headers: { 'Authorization': `token ${token}` }
        });
        console.log('Lab Data:', labDataResp.data);
        setLabData(labDataResp.data);

        const weeklyTestDataResp = await axios.get('http://127.0.0.1:8000/studentportal/studentlogin_view_weekelyTest/', {
          headers: { 'Authorization': `token ${token}` }
        });
        console.log('Weekly Test Data:', weeklyTestDataResp.data);
        setWeeklyTestData(weeklyTestDataResp.data);

        const mockDataResp = await axios.get('http://127.0.0.1:8000/studentportal/studentlogin_view_weekelymock/', {
          headers: { 'Authorization': `token ${token}` }
        });
        console.log('Mock Data:', mockDataResp.data);
        setMockData(mockDataResp.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate('/login'); // Redirect to login if there is an error
      }
    };

    fetchData();
  }, [navigate, token, setToken]);

  const pieChartData = {
    Lab: [
      { name: 'Absent', value: attendance.days_absent || 0 },
      { name: 'Present', value: attendance.days_present || 0 },
    ],
    WeeklyTest: [
      { name: 'Absent', value: weekelytest.days_absent || 0 },
      { name: 'Present', value: weekelytest.days_present || 0 },
    ],
    Mock: [
      { name: 'Absent', value: weekelymock.days_absent || 0 },
      { name: 'Present', value: weekelymock.days_present || 0 },
    ],
  };

  const imageUrl = profile.Image ? `http://127.0.0.1:8000${profile.Image}` : Studentimg;
  console.log('Image URL:', imageUrl);

  const handleCardClick = (chartType) => {
    setActiveChart(chartType);
  };

  const handleButtonClick = () => {
    setShowTable(!showTable); // Toggle table visibility

    if (!showTable) {
      // Scroll to table when it is shown
      const tableElement = document.querySelector('.StudentDashbord-table');
      if (tableElement) {
        tableElement.scrollIntoView({ behavior: 'auto', block: 'start' });
        window.scrollTo({ top: tableElement.offsetTop, behavior: 'auto' });
      }
    }
  };

  const getButtonLabel = () => {
    switch (activeChart) {
      case 'Lab':
        return 'View Lab Performance';
      case 'WeeklyTest':
        return 'View Weekly Test Performance';
      case 'Mock':
        return 'View Mock Performance';
      default:
        return '';
    }
  };

  const formatDataForTable = (data) => {
    return Object.entries(data).map(([key, item]) => ({
      date: item.session_date,
      type: item.session_type || 'N/A',
      present: item.present ? 'Yes' : 'No',
      marks: item.marks || 'N/A'
    }));
  };

  const renderTable = () => {
    let data = [];
    let columns = ['Date', 'Type', 'Present']; // Default columns
    if (activeChart !== 'Lab') {
      columns.push('Marks'); // Add 'Marks' column for non-Lab charts
    }

    switch (activeChart) {
      case 'Lab':
        data = formatDataForTable(labData);
        break;
      case 'WeeklyTest':
        data = formatDataForTable(weeklyTestData);
        break;
      case 'Mock':
        data = formatDataForTable(mockData);
        break;
      default:
        break;
    }

    return (
      <table className="performance-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? data.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.type}</td>
              <td>{item.present}</td>
              {activeChart !== 'Lab' && <td>{item.marks}</td>}
            </tr>
          )) : (
            <tr>
              <td colSpan={columns.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div className="student-dashbord">
      <div className="student-dashbord-cards">
        <div className="student-dashbord-card" onClick={() => handleCardClick('Lab')}>
          <h3>Lab</h3>
          <p>{attendance.days_present}/{attendance.total_lab_sessions}</p>
        </div>
        <div className="student-dashbord-card" onClick={() => handleCardClick('WeeklyTest')}>
          <h3>Weekly Test</h3>
          <p>{weekelytest.days_present}/{weekelytest.total_lab_sessions}</p>
        </div>
        <div className="student-dashbord-card" onClick={() => handleCardClick('Mock')}>
          <h3>Mock</h3>
          <p>{weekelymock.days_present}/{weekelymock.total_lab_sessions}</p>
        </div>
      </div>
      <div className="student-dashbord-charts">
        <div className="student-dashbord-line-chart">
          <h3>Welcome To The Vsms</h3>
          {imageUrl ? (
            <img src={imageUrl} alt="Student" className="student-dashbord-student-img" />
          ) : (
            <p>Image not available</p>
          )}
        </div>
        <div className="student-dashbord-pie-chart">
          <h3>{activeChart} Performance</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieChartData[activeChart]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData[activeChart].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <button className="view-performance-btn" onClick={handleButtonClick}>
            {getButtonLabel()}
          </button>
        </div>
      </div>
      <div className='StudentDashbord-table'>
        {showTable && renderTable()}
      </div>
    </div>
  );
};

export default Dashboard123;
