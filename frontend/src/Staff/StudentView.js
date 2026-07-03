import React, { useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import '../Staff/StudentView.css';

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const StudentView = ({ setView }) => {
  const [batchNumber, setBatchNumber] = useState('');
  const [allStudents, setAllStudents] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [feeStatus, setFeeStatus] = useState('pending');
  const [error, setError] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [performanceData, setPerformanceData] = useState({
    lab: [],
    weeklyTest: [],
    weeklyMock: [],
    labAttendance: [],
    weeklyTestAttendance: [],
    weeklyMockAttendance: []
  });
  const [performanceType, setPerformanceType] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  
  const defaultProfileImage = 'path/to/default/profile/image.png'; // Update with the path to your default image

  const handleSubmit = (e) => {
    e.preventDefault();
    if (batchNumber.trim() === '') {
      console.log("Batch number is empty");
      return;
    }
    fetchAllStudents();
  };

  const fetchAllStudents = () => {
    axios.get(`http://127.0.0.1:8000/studentportal/batch/${batchNumber}/students/`)
      .then((response) => {
        console.log("All Students Data:", response.data); // Print the fetched data
        setAllStudents(response.data);
        setFilteredData(response.data);
        setError('');
        setShowForm(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      });
  };

  const fetchFilteredData = () => {
    console.log("Fetching data with batchNumber:", batchNumber, "and feeStatus:", feeStatus);
    axios.get(`http://127.0.0.1:8000/studentportal/students-with-outstanding-fees/${batchNumber}/${feeStatus}/`)
      .then((response) => {
        console.log("Filtered Data:", response.data); // Print the fetched data
        setFilteredData(response.data);
        setError('');
      })
      .catch((error) => {
        console.error('Error fetching filtered data:', error);
        setError('Failed to fetch filtered data. Please try again later.');
      });
  };

  const fetchPerformanceData = (mobile_no) => {
    axios.all([
      axios.get(`http://127.0.0.1:8000/studentportal/view_lab_performance/${mobile_no}/`),
      axios.get(`http://127.0.0.1:8000/studentportal/view_weekelytest_performance/${mobile_no}/`),
      axios.get(`http://127.0.0.1:8000/studentportal/view_weekelymock_performance/${mobile_no}/`),
      axios.get(`http://127.0.0.1:8000/studentportal/staff_attendence_view_lab/${mobile_no}/`),
      axios.get(`http://127.0.0.1:8000/studentportal/staff_attendence_view_weekelytest/${mobile_no}/`),
      axios.get(`http://127.0.0.1:8000/studentportal/staff_attendence_view_weekelymock/${mobile_no}/`)
    ])
    .then(axios.spread((labResponse, weeklyTestsResponse, weeklyMockResponse, labAttendanceResponse, weeklyTestAttendanceResponse, weeklyMockAttendanceResponse) => {
      console.log("Lab Performance Data:", labResponse.data);
      console.log("Weekly Tests Performance Data:", weeklyTestsResponse.data);
      console.log("Weekly Mock Performance Data:", weeklyMockResponse.data);
      console.log("Lab Attendance Data:", labAttendanceResponse.data);
      console.log("Weekly Test Attendance Data:", weeklyTestAttendanceResponse.data);
      console.log("Weekly Mock Attendance Data:", weeklyMockAttendanceResponse.data);

      setPerformanceData({
        lab: labResponse.data,
        weeklyTest: weeklyTestsResponse.data,
        weeklyMock: weeklyMockResponse.data,
        labAttendance: Array.isArray(labAttendanceResponse.data) ? labAttendanceResponse.data : Object.values(labAttendanceResponse.data),
        weeklyTestAttendance: Array.isArray(weeklyTestAttendanceResponse.data) ? weeklyTestAttendanceResponse.data : Object.values(weeklyTestAttendanceResponse.data),
        weeklyMockAttendance: Array.isArray(weeklyMockAttendanceResponse.data) ? weeklyMockAttendanceResponse.data : Object.values(weeklyMockAttendanceResponse.data)
      });
      setShowPerformanceModal(true);
    }))
    .catch((error) => {
      console.error('Error fetching performance data:', error);
      setError('Failed to fetch performance data. Please try again later.');
    });
  };

  const handleViewPerformances = (student) => {
    setSelectedStudent(student);
    fetchPerformanceData(student.mobile_no);
    setPerformanceType(null);
  };

  const handlePerformanceTypeClick = (type) => {
    setPerformanceType(type);
  };

  const handleFeeStatusChange = (e) => {
    setFeeStatus(e.target.value); // Update the feeStatus state
    fetchFilteredData(); // Fetch the filtered data based on the new feeStatus
  };

  const handleBackToForm = () => {
    setShowForm(true);
    setSelectedStudent(null);
    setShowPerformanceModal(false);
  };

  const handleCloseModal = () => {
    setShowPerformanceModal(false);
  };

  const handleCloseView = () => {
    setView('false');
  };

  const calculatePerformanceData = () => {
    const labAttendanceCount = performanceData.labAttendance.length;
    const weeklyTestAttendanceCount = performanceData.weeklyTestAttendance.length;
    const weeklyMockAttendanceCount = performanceData.weeklyMockAttendance.length;

    return {
      labels: ['Lab Attendance', 'Weekly Test Attendance', 'Weekly Mock Attendance'],
      datasets: [{
        data: [labAttendanceCount, weeklyTestAttendanceCount, weeklyMockAttendanceCount],
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
      }]
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (context.raw !== undefined) {
              label += `: ${context.raw}`;
            }
            return label;
          }
        }
      }
    }
  };

  const renderPerformanceTable = (data, includeMarks) => {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return <p>No data available</p>;
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Session Date</th>
            <th>Session Type</th>
            <th>Present</th>
            {includeMarks && <th>Marks</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((session, index) => (
            <tr key={index}>
              <td>{session.session_date}</td>
              <td>{session.session_type || 'N/A'}</td>
              <td>{session.present ? 'Yes' : 'No'}</td>
              {includeMarks && <td>{session.marks || 'N/A'}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const getAttendanceSummary = (type) => {
    const data = performanceData[type];
    return data ? {
      total_lab_sessions: data.total_lab_sessions || 0,
      days_present: data.days_present || 0,
      days_absent: data.days_absent || 0
    } : {
      total_lab_sessions: 0,
      days_present: 0,
      days_absent: 0
    };
  };

  const renderResumeSection = (resumeUrl) => {
    if (resumeUrl) {
      return (
        <div className="resume-section">
          <a href={resumeUrl} download className="resume-link">
           View / Download Resume
          </a>
        </div>
      );
    } else {
      return <p>No resume available</p>;
    }
  };

  return (
    <div className='viewbatch_dashboard'>
      <div className='viewbatch_form'>
        <div className="viewbatch_content">
          {showForm ? (
            <form onSubmit={handleSubmit} className='viewbatch_student_form'>
              <button onClick={handleCloseView} type="button" className="close-button-view">
                &times;
              </button>
              <h2>Fetch Student Records</h2>
              <input
                type="text"
                value={batchNumber}
                placeholder='Enter Batch Number'
                onChange={(e) => setBatchNumber(e.target.value)}
                required
              />
              <button type="submit" className="viewbatch_submit-button">Fetch Records</button>
            </form>
          ) : (
            <div>
              <div className="back-arrow-view" onClick={handleBackToForm}>
                &larr; Back
              </div>

              <div className='filter-container'>
                <h3>Student Details Table</h3>
              </div>

              {error && <p className="error-message">{error}</p>}

              {filteredData.length > 0 && (
                <div className='viewbatch_data_table'>
                  <table>
                    <thead>
                      <tr>
                        <th>Student ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Batch</th>
                        <th>Mobile No</th>
                        <th>Address</th>
                        <th>Qualification</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map(student => (
                        <tr key={student.student_id}>
                          <td>{student.student_id}</td>
                          <td>{student.userrole.username}</td>
                          <td>{student.userrole.email}</td>
                          <td>{student.batch}</td>
                          <td>{student.mobile_no}</td>
                          <td>{student.address}</td>
                          <td>{student.Qulification}</td>
                          <td>
                            <button onClick={() => handleViewPerformances(student)}>
                              View Performances
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          {showPerformanceModal && selectedStudent && (
            <div className='performance-modal-overlay'>
              <div className='performance-modal'>
                <button onClick={handleCloseModal} className="close-button-modal">
                  &times;
                </button>
                <div className='performance-content'>
                  <div className='performance-left'>
                    <img
                      src={selectedStudent.Image ? `http://127.0.0.1:8000${selectedStudent.Image}` : defaultProfileImage}
                      alt={selectedStudent.userrole.username}
                      className='student-image'
                    />
                    <div className='student-details'>
                      <h3>{selectedStudent.userrole.username}</h3>
                      <p>Email: {selectedStudent.userrole.email}</p>
                      <p>Batch: {selectedStudent.batch}</p>
                      <p>Mobile No: {selectedStudent.mobile_no}</p>
                      <p>Address: {selectedStudent.address}</p>
                      <p>Qualification: {selectedStudent.Qulification}</p>
                      {/* Add the resume section */}
                      {renderResumeSection(selectedStudent.resume ? `http://127.0.0.1:8000${selectedStudent.resume}` : null)}
                    </div>
                  </div>
                  <div className='performance-right'>
                    <div className='overall-attendance-summary'>
                      <h3>Overall Attendance Summary</h3>
                      <div className='piechart-container' style={{ width: '400px', height: '400px' }}>
                      <Pie data={calculatePerformanceData()} options={options} /></div> 
                      <div className="performance-buttons">
                        <button onClick={() => handlePerformanceTypeClick('lab')}>
                          Lab (Total: {getAttendanceSummary('lab').total_lab_sessions}, Present: {getAttendanceSummary('lab').days_present}, Absent: {getAttendanceSummary('lab').days_absent})
                        </button>
                        <button onClick={() => handlePerformanceTypeClick('weeklyTest')}>
                          Weekly Test (Total: {getAttendanceSummary('weeklyTest').total_lab_sessions}, Present: {getAttendanceSummary('weeklyTest').days_present}, Absent: {getAttendanceSummary('weeklyTest').days_absent})
                        </button>
                        <button onClick={() => handlePerformanceTypeClick('weeklyMock')}>
                          Weekly Mock (Total: {getAttendanceSummary('weeklyMock').total_lab_sessions}, Present: {getAttendanceSummary('weeklyMock').days_present}, Absent: {getAttendanceSummary('weeklyMock').days_absent})
                        </button>
                      </div>
                    </div>
                    {performanceType === 'lab' && renderPerformanceTable(performanceData.labAttendance, false)}
                    {performanceType === 'weeklyTest' && renderPerformanceTable(performanceData.weeklyTestAttendance, true)}
                    {performanceType === 'weeklyMock' && renderPerformanceTable(performanceData.weeklyMockAttendance, true)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentView;
