import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Staff/DeleteStudent.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const DefaultImage = 'path/to/default/image.png'; // Ensure this path is correct

const DeleteStudent = ({ setView }) => {
  const [studentMobile, setStudentMobile] = useState('');
  const [data, setData] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    if (deleteStatus) {
      const timer = setTimeout(() => {
        setDeleteStatus('');
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [deleteStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.get(`http://127.0.0.1:8000/studentportal/Deletestudent/${studentMobile}`);
      setData(response.data);
      setShowForm(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setDeleteStatus('Error fetching student record.');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleDelete = async () => {
    setLoading(true); // Start loading
    try {
      await axios.delete(`http://127.0.0.1:8000/studentportal/Deletestudent/${studentMobile}`);
      setDeleteStatus('Student record deleted successfully.');
      setStudentMobile('');
      setData(null);
      setShowForm(true);
    } catch (error) {
      console.error('Error deleting data:', error);
      setDeleteStatus('Error deleting student record.');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleBackToForm = () => {
    setShowForm(true);
    setData(null);
    setStudentMobile('');
  };

  const studentImage = data?.Image ? `http://127.0.0.1:8000${data.Image}` : DefaultImage;

  return (
    <div className='Delete_dashboard'>
      <div className='delete_form'>
        <div className="delete_content">
          {showForm ? (
            <form onSubmit={handleSubmit} className='delete_student_form'>
              <h2>Delete Student</h2>
              <button type="button" onClick={() => setView('false')} className="close-button-delete">&times;</button>
              <input
                type="text"
                value={studentMobile}
                placeholder='Enter Mobile Number'
                onChange={(e) => setStudentMobile(e.target.value)}
                required
              />
              <button type="submit" className="submit-button-delete" disabled={loading}>
                {loading ? 'Loading...' : 'Submit'}
              </button>
              {deleteStatus && <p className={`status-message ${deleteStatus.includes('Error') ? 'error' : 'success'}`}>{deleteStatus}</p>}
            </form>
          ) : (
            <div className="delete_details_view">
              <div className="fas fa-arrow-left back-arrow" onClick={handleBackToForm}></div>
              <img src={studentImage} alt="Student" className="student-image" />
              <div className="student-details">
                <input type="text" value={data.student_id || ''} readOnly />
                <input type="text" value={data.username || ''} readOnly />
                <input type="text" value={data.email || ''} readOnly />
                <input type="text" value={data.batch || ''} readOnly />
                <input type="text" value={data.mobile_no || ''} readOnly />
                <input type="text" value={data.address || ''} readOnly />
                <input type="text" value={data.Qulification || ''} readOnly /> {/* Updated field name */}
              </div>
              <button className="delete-button" onClick={handleDelete} disabled={loading}>
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteStudent;
