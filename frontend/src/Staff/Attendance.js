import React, { useState } from 'react';
import '../Staff/Attendance.css';

const AttendanceUpdate = () => {
  const [showAttendance, setShowAttendance] = useState(false);
  const [showMarks, setShowMarks] = useState(false);
  const [showMocks, setShowMocks] = useState(false);
  const [bachNumber, setBachNumber] = useState('');
  const [attendanceData, setAttendanceData] = useState([
    { id: 1, name: 'John Doe', mobile: '123-456-7890', day1: 'Present', day2: 'Absent', day3: 'Present' },
    { id: 2, name: 'Jane Smith', mobile: '234-567-8901', day1: 'Absent', day2: 'Present', day3: 'Absent' },
    { id: 3, name: 'Michael Johnson', mobile: '345-678-9012', day1: 'Present', day2: 'Present', day3: 'Present' },
    { id: 4, name: 'Emily Davis', mobile: '456-789-0123', day1: 'Absent', day2: 'Absent', day3: 'Absent' },
    { id: 5, name: 'Alexandra Brown', mobile: '567-890-1234', day1: 'Present', day2: 'Absent', day3: 'Absent' },
    { id: 1, name: 'John Doe', mobile: '123-456-7890', day1: 'Present', day2: 'Absent', day3: 'Present' },
    { id: 2, name: 'Jane Smith', mobile: '234-567-8901', day1: 'Absent', day2: 'Present', day3: 'Absent' },
    { id: 3, name: 'Michael Johnson', mobile: '345-678-9012', day1: 'Present', day2: 'Present', day3: 'Present' },
    { id: 4, name: 'Emily Davis', mobile: '456-789-0123', day1: 'Absent', day2: 'Absent', day3: 'Absent' },
    { id: 5, name: 'Alexandra Brown', mobile: '567-890-1234', day1: 'Present', day2: 'Absent', day3: 'Absent' }
  ]);

  const [marksData, setMarksData] = useState([
    { id: 1, name: 'John Doe', mobile: '123-456-7890', subject: 'Math', marks: 85 },
    { id: 2, name: 'Jane Smith', mobile: '234-567-8901', subject: 'Science', marks: 78 },
    { id: 3, name: 'Michael Johnson', mobile: '345-678-9012', subject: 'History', marks: 92 },
    { id: 4, name: 'Emily Davis', mobile: '456-789-0123', subject: 'English', marks: 88 },
    { id: 5, name: 'Alexandra Brown', mobile: '567-890-1234', subject: 'Physics', marks: 80 }
  ]);

  const [mocksData, setMocksData] = useState([
    { id: 1, name: 'John Doe', mobile: '123-456-7890', testNumber: 1, score: 90 },
    { id: 2, name: 'Jane Smith', mobile: '234-567-8901', testNumber: 2, score: 85 },
    { id: 3, name: 'Michael Johnson', mobile: '345-678-9012', testNumber: 3, score: 88 },
    { id: 4, name: 'Emily Davis', mobile: '456-789-0123', testNumber: 4, score: 82 },
    { id: 5, name: 'Alexandra Brown', mobile: '567-890-1234', testNumber: 5, score: 79 }
  ]);

  const fetchData = (sheetType) => {
    switch (sheetType) {
      case 'attendance':
        const filteredAttendance = attendanceData.filter(item => item.mobile.includes(bachNumber));
        setAttendanceData(filteredAttendance);
        break;
      case 'marks':
        const filteredMarks = marksData.filter(item => item.mobile.includes(bachNumber));
        setMarksData(filteredMarks);
        break;
      case 'mocks':
        const filteredMocks = mocksData.filter(item => item.mobile.includes(bachNumber));
        setMocksData(filteredMocks);
        break;
      default:
        break;
    }
  };

  const handleUpdate = (item) => {
    console.log('Update data:', item);
    setBachNumber('');
  };

  return (
    <div className='popup001'>  
    <div className='attendance-page1'>
      <div className='buttons1'>
          <button onClick={() => { setShowAttendance(!showAttendance); setShowMarks(false); setShowMocks(false); }}>Attendance</button>
          <button onClick={() => { setShowMarks(!showMarks); setShowAttendance(false); setShowMocks(false); }}>Weekly Test</button>
          <button onClick={() => { setShowMocks(!showMocks); setShowAttendance(false); setShowMarks(false); }}>Mock Sheet</button>
          <button onClick={() => { setShowAttendance(false); setShowMarks(false); setShowMocks(false); }}>Hide All</button>
      </div> 

        {showAttendance && (
          
          <div className='input_attendance1'>
    
            <input type='text' value={bachNumber} placeholder='Enter BachNumber' onChange={(e) => setBachNumber(e.target.value)} />
            <button className='button' onClick={() => fetchData('attendance')}>Search</button>
          <div className='sheet1'>
          <div className='date_input'>
          <input type='date'/>
          </div>
          <div className='filter1'>
            <input type='text' value={bachNumber} onChange={(e) => setBachNumber(e.target.value)} />
            <button onClick={() => fetchData('marks')}>filter</button>
            </div>
            <div className='table-container1'>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Present</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.mobile}</td>
                      <td><input type='checkbox'/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        )}

        {showMarks && (
            <div className='input_attendance1'>
            <input type='text' value={bachNumber} placeholder='Enter BachNumber' onChange={(e) => setBachNumber(e.target.value)} />
            <button className='button'  onClick={() => fetchData('marks')}>Search</button>
          
          <div className='sheet1'>
          <div className='filter1'>
            <input type='text' value={bachNumber} onChange={(e) => setBachNumber(e.target.value)} />
            <button onClick={() => fetchData('marks')}>filter</button>
            </div>
            <div className='table-container1'>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Subject</th>
                    <th>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {marksData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.mobile}</td>
                      <td><input type='text'/></td>
                      <td><input type='number'/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        )}

        {showMocks && (
             < div className='input_attendance1'>
             <input type='text' value={bachNumber} placeholder='Enter BachNumber' onChange={(e) => setBachNumber(e.target.value)} />
             <button className='button' onClick={() => fetchData('mocks')}>Search</button>
          <div className='sheet1'>
          <div className='filter1'>
            <input type='text' value={bachNumber} onChange={(e) => setBachNumber(e.target.value)} />
            <button onClick={() => fetchData('marks')}>filter</button>
            </div>
            <div className='table-container1'>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Test Number</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {mocksData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.mobile}</td>
                      <td><input type='text'/></td>
                      <td><input type='number'/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        )}
        
      </div>
    </div>
   
  );
};

export default AttendanceUpdate;
