import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Staff/Attendance.css'; // Ensure this CSS file is in the same directory
import { FaCheck } from 'react-icons/fa';

const AttendanceUpdate1 = () => {
  const [showAttendance, setShowAttendance] = useState(false);
  const [showMarks, setShowMarks] = useState(false);
  const [showMocks, setShowMocks] = useState(false);
  const [showSessionForm, setShowSessionForm] = useState(false); // State to toggle the form visibility
  const [sessionDate, setSessionDate] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [sessions, setSessions] = useState([]);
  const [filter, setFilter] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [marksData, setMarksData] = useState([]);
  const [mocksData, setMocksData] = useState([]);
  const [filteredAttendanceData, setFilteredAttendanceData] = useState([]);
  const [type, setType] = useState('');
  const [buttonColors, setButtonColors] = useState({}); // State to track button colors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [marks, setMarks] = useState({});
  const [sessionError, setSessionError] = useState(''); // State to handle session creation errors
  const [sessionSuccess, setSessionSuccess] = useState(''); // State to handle session creation success messages

  // Fetch sessions whenever batchNumber or type changes
  useEffect(() => {
    const fetchSessions = async () => {
      if (!batchNumber || !type) {
        return; // Skip fetch if batchNumber or type is not set
      }

      setLoading(true); // Start loading
      setError(''); // Clear previous errors

      try {
        const response = await fetch(`http://127.0.0.1:8000/studentportal/batch-sessions/${batchNumber}/${type}/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSessions(data);
        console.log('Fetched sessions:', data); // Debugging log
      } catch (error) {
        console.error('Error fetching sessions:', error);
        setError('Failed to load sessions. Please try again.');
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchSessions();
  }, [batchNumber, type]); // Depend on batchNumber and type

  const fetchData = async (sheetType) => {
    setType(sheetType);
    try {
      const url = `http://127.0.0.1:8000/studentportal/batch/${batchNumber}/students/`;
      let response;
      setButtonColors({});
      setMarks({});
      switch (sheetType) {
        case 'Lab':
          response = await axios.get(url);
          setAttendanceData(response.data);
          setFilteredAttendanceData(response.data); // Initialize filtered data with fetched data
          setShowAttendance(true);
          setShowMarks(false);
          setShowMocks(false);
          break;
        case 'Weekelytest':
          response = await axios.get(url);
          setMarksData(response.data);
          setShowAttendance(false);
          setShowMarks(true);
          setShowMocks(false);
          break;
        case 'WeekelyMock':
          response = await axios.get(url);
          setMocksData(response.data);
          setShowAttendance(false);
          setShowMarks(false);
          setShowMocks(true);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSessionChange = (e) => {
    setSelectedSession(e.target.value);
    setButtonColors({});
    setMarks({});
    console.log(e.target.value);
  };

  const handleFilter = () => {
    if (filter.trim() === '') {
      setFilteredAttendanceData(attendanceData); // Reset to original data if filter is empty
    } else {
      const filteredData = attendanceData.filter(item => {
        // Convert mobile_no to string and then check for inclusion
        const mobileNoStr = String(item.mobile_no);
        return mobileNoStr.includes(filter);
      });
      setFilteredAttendanceData(filteredData);
    }
  };

  const handleSessionCreation = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setSessionError(''); // Clear previous errors
    setSessionSuccess(''); // Clear previous success message

    try {
      const todayDate = new Date().toISOString().split('T')[0];
      if (sessionDate > todayDate) {
        setSessionError('Session date cannot be in the future.'); // Handle future date error
        return;
      }

      const url = 'http://127.0.0.1:8000/studentportal/create-lab-sessions/';
      const response = await axios.post(url, {
        batch: batchNumber,
        session_date: sessionDate,
        session_type: sessionType
      });

      if (response.data.message === 'Session already exists') {
        setSessionError('Session already exists for this batch, date, and type.'); // Handle session already exists error
      } else {
        setSessionSuccess('Session created successfully.'); // Handle success message
        setShowSessionForm(false); // Hide the form after submission
        // Optionally, you could refetch sessions here if needed
      }
    } catch (error) {
      console.error('Error creating session:', error.response ? error.response.data : error.message);
      setSessionError('Failed to create session. Please try again.'); // Handle other errors
    }
  };

  const handleMarksChange = (e, studentId) => {
    const newValue = e.target.value;
    setMarks(prevMarks => ({
      ...prevMarks,
      [studentId]: newValue === '' ? '' : newValue
    }));
  };

  const handleButtonClick = async (item) => {
    try {
      const todayDate = new Date().toISOString().split('T')[0];
      const requestData = {
        student: item.student_id,
        session: selectedSession,
        present: !item.checked,
        marks: marks[item.student_id] || 0.00,
        marked_at: todayDate,
        batch: batchNumber
      };

      const response = await axios.post(`http://127.0.0.1:8000/studentportal/mark-attendance/${batchNumber}/`, requestData);

      console.log('Updated item:', response.data);

      // On successful request, change button color to green
      setButtonColors(prevColors => ({
        ...prevColors,
        [item.student_id]: 'green' // Set the button color for the specific item to green
      }));

    } catch (error) {
      console.error('Error updating item:', error.response ? error.response.data : error.message);

      // On error, change button color to red
      setButtonColors(prevColors => ({
        ...prevColors,
        [item.student_id]: 'red' // Set the button color for the specific item to red
      }));
    }
  };

  return (
    <div className='popup001'>
      <div className='attendance-page1'>
        <div className='buttons1'>
          <button onClick={() => { setShowAttendance(true); setShowMarks(false); setShowMocks(false); setShowSessionForm(false); setButtonColors({}) }}>Lab</button>
          <button onClick={() => { setShowMarks(true); setShowAttendance(false); setShowMocks(false); setShowSessionForm(false); setButtonColors({}) }}>Weekly Test</button>
          <button onClick={() => { setShowMocks(true); setShowAttendance(false); setShowMarks(false); setShowSessionForm(false); setButtonColors({}) }}>Mock Sheet</button>
          <button onClick={() => { setShowAttendance(false); setShowMarks(false); setShowMocks(false); setShowSessionForm(false); }}>Hide All</button>
          <button onClick={() => { setShowSessionForm(true); setShowAttendance(false); setShowMarks(false); setShowMocks(false); }}>Create Session</button> 
        </div>

        {showAttendance && (
          <div className='input_attendance2'>
            <input type='text' value={batchNumber} placeholder='Enter Batch Number' onChange={(e) => setBatchNumber(e.target.value)} />
            <button className='button' onClick={() => fetchData('Lab')}>Search</button>

            {batchNumber && filteredAttendanceData.length > 0 && (
              <div className='sheet1'>
                <div className='date_input1'>
                  <label>
                    Select Session:
                    <select className='section'
                      value={selectedSession}
                      onChange={handleSessionChange}
                    >
                      <option value=''>Select a Session</option>
                      {sessions.length > 0 ? (
                        sessions.map((session) => (
                          <option key={session.id} value={session.id}>
                            {session.session_date} - {session.session_type}
                          </option>
                        ))
                      ) : (
                        <option value=''>No sessions available</option>
                      )}
                    </select>
                  </label>
                </div>
                <div className='filter1'>
                  <input type='text' value={filter} onChange={(e) => setFilter(e.target.value)} />
                  <button onClick={handleFilter}>Filter</button>
                </div>
                <div className='table-container1'>
                  <table className='attendance-table'>
                    <thead>
                      <tr>
                        <th className='attendance-th'>Student ID</th>
                        <th className='attendance-th'>Name</th>
                        <th className='attendance-th'>Mobile</th>
                        <th className='attendance-th'>Email</th>
                        <th className='attendance-th'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAttendanceData.map((item) => (
                        <tr key={item.student_id}>
                          <td className='attendance-td'>{item.student_id}</td>
                          <td className='attendance-td'>{item.userrole.username}</td>
                          <td className='attendance-td'>{item.mobile_no}</td>
                          <td className='attendance-td'>{item.userrole.email}</td>
                          <td className='attendance-td'>
                            <button
                              className='action-button'
                              onClick={() => handleButtonClick(item)}
                              style={{ backgroundColor: buttonColors[item.student_id] || 'red' }} // Apply color based on item ID
                            >
                              <FaCheck />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {batchNumber && filteredAttendanceData.length === 0 && (
              <p className='no-data-message'>No attendance data found.</p>
            )}
          </div>
        )}

        {showMarks && (
          <div className='input_attendance2'>
            <input type='text' value={batchNumber} placeholder='Enter Batch Number' onChange={(e) => setBatchNumber(e.target.value)} />
            <button className='button' onClick={() => fetchData('Weekelytest')}>Search</button>

            {batchNumber && marksData.length > 0 && (
              <div className='sheet1'>
                <div className='date_input'>
                  <label>
                    Select Session:
                    <select className='section'
                      value={selectedSession}
                      onChange={handleSessionChange}
                    >
                      <option value=''>Select a Session</option>
                      {sessions.length > 0 ? (
                        sessions.map((session) => (
                          <option key={session.id} value={session.id}>
                            {session.session_date} - {session.session_type}
                          </option>
                        ))
                      ) : (
                        <option value=''>No sessions available</option>
                      )}
                    </select>
                  </label>
                </div>
                <div className='filter1'>
                  <input type='text' value={filter} onChange={(e) => setFilter(e.target.value)} />
                  <button onClick={() => fetchData('Weekelytest')}>Filter</button>
                </div>
                <div className='table-container1'>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Marks</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marksData.map((item) => (
                        <tr key={item.student_id}>
                          <td className='attendance-td'>{item.batch}</td>
                          <td className='attendance-td'>{item.userrole.username}</td>
                          <td className='attendance-td'>{item.mobile_no}</td>
                          <td className='attendance-td'>
                            <input
                              type="number"
                              value={marks[item.student_id] || item.marks || ''}
                              onChange={(e) => handleMarksChange(e, item.student_id)}
                            />
                          </td>
                          <td className='attendance-td'>
                            <button
                              className='action-button'
                              onClick={() => handleButtonClick(item)}
                              style={{ backgroundColor: buttonColors[item.student_id] || 'red' }} // Apply color based on item ID
                            >
                              <FaCheck />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {batchNumber && marksData.length === 0 && (
              <p className='no-data-message'>No marks data found.</p>
            )}
          </div>
        )}

        {showMocks && (
          <div className='input_attendance2'>
            <input type='text' value={batchNumber} placeholder='Enter Batch Number' onChange={(e) => setBatchNumber(e.target.value)} />
            <button className='button' onClick={() => fetchData('WeekelyMock')}>Search</button>

            {batchNumber && mocksData.length > 0 && (
              <div className='sheet1'>
                <div className='date_input'>
                  <label>
                    Select Session:
                    <select className='section'
                      value={selectedSession}
                      onChange={handleSessionChange}
                    >
                      <option value=''>Select a Session</option>
                      {sessions.length > 0 ? (
                        sessions.map((session) => (
                          <option key={session.id} value={session.id}>
                            {session.session_date} - {session.session_type}
                          </option>
                        ))
                      ) : (
                        <option value=''>No sessions available</option>
                      )}
                    </select>
                  </label>
                </div>
                <div className='filter1'>
                  <input type='text' value={filter} onChange={(e) => setFilter(e.target.value)} />
                  <button onClick={() => fetchData('WeekelyMock')}>Filter</button>
                </div>
                <div className='table-container1'>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Marks</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mocksData.map((item) => (
                        <tr key={item.student_id}>
                          <td className='attendance-td'>{item.batch}</td>
                          <td className='attendance-td'>{item.userrole.username}</td>
                          <td className='attendance-td'>{item.mobile_no}</td>
                          <td className='attendance-td'>
                            <input
                              type="number"
                              value={marks[item.student_id] || item.marks || ''}
                              onChange={(e) => handleMarksChange(e, item.student_id)}
                            />
                          </td>
                          <td className='attendance-td'>
                            <button
                              className='action-button'
                              onClick={() => handleButtonClick(item)}
                              style={{ backgroundColor: buttonColors[item.student_id] || 'red' }} // Apply color based on item ID
                            >
                              <FaCheck />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {batchNumber && mocksData.length === 0 && (
              <p className='no-data-message'>No mocks data found.</p>
            )}
          </div>
        )}

        {showSessionForm && (
          <div className='sheet1'>
            <form onSubmit={handleSessionCreation} className='session-form'>
              <h2>Create Session</h2>
              <label>
                Batch Number:
                <input className='class'
                  type='text'
                  value={batchNumber}
                  onChange={(e) => setBatchNumber(e.target.value)}
                  required
                />
              </label>
              <br/>
              <label>
                Session Date:
                <input className='class'
                  type='date'
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  required
                />
              </label>
              <br/>
              <label>
                Session Type:
                <select
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value)}
                  required
                >
                  <option value=''>Select Session Type</option>
                  <option value='Lab'>Lab</option>
                  <option value='Weekelytest'>Weekly Test</option>
                  <option value='WeekelyMock'>Mock Sheet</option>
                </select>
              </label>
              <br/>
              <button className="submit" type='submit'>Submit</button>
              <br/>
              <button className="submit" type='button' onClick={() => setShowSessionForm(false)}>Cancel</button>
              {sessionError && <p className='error-message'>{sessionError}</p>}
              {sessionSuccess && <p className='success-message'>{sessionSuccess}</p>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceUpdate1;
