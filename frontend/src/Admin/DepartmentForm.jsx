import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DepartmentForm.css';

const DepartmentForm = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Get auth token from localStorage (admin must be logged in)
  const token = localStorage.getItem('authToken');

  const authHeaders = {
    headers: {
      Authorization: `token ${token}`,
    },
  };

  // Fetch existing departments when component mounts
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/staffportal/departments/',
          authHeaders
        );
        // Normalize: handle both plain array and wrapped {value: [...]} response
        const data = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.value)
          ? response.data.value
          : [];
        setDepartments(data);
      } catch (err) {
        console.error('Fetch departments error:', err.response?.data || err.message);
        setError('Failed to fetch departments. Make sure you are logged in as Admin.');
      }
    };

    fetchDepartments();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!departmentName.trim()) {
      setError('Department name cannot be empty.');
      return;
    }

    if (!token) {
      setError('You must be logged in as Admin to create a department.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8000/staffportal/createdepartment/',
        { Departmentname: departmentName.trim() },
        authHeaders
      );

      // Refresh the departments list
      const refreshed = await axios.get(
        'http://localhost:8000/staffportal/departments/',
        authHeaders
      );
      const refreshedData = Array.isArray(refreshed.data)
        ? refreshed.data
        : Array.isArray(refreshed.data?.value)
        ? refreshed.data.value
        : [];
      setDepartments(refreshedData);


      setSuccess(`Department "${departmentName.trim()}" created successfully!`);
      setDepartmentName('');
    } catch (err) {
      console.error('Create department error:', err.response?.data || err.message);
      const msg =
        err.response?.status === 401 || err.response?.status === 403
          ? 'Permission denied. Only Admins can create departments.'
          : err.response?.data?.Departmentname?.[0] ||
            err.response?.data?.detail ||
            'Failed to create department. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (deptId) => {
    if (!window.confirm('Are you sure you want to delete this department?')) return;
    try {
      await axios.delete(
        `http://localhost:8000/staffportal/departments/${deptId}/delete/`,
        authHeaders
      );
      setDepartments((prev) => prev.filter((d) => d.Department_id !== deptId));
      setSuccess('Department deleted successfully.');
      setError('');
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message);
      setError(
        err.response?.status === 403
          ? 'Only Admins can delete departments.'
          : 'Failed to delete department.'
      );
    }
  };

  return (
    <div className="dept-form-wrapper">
      {/* Create Department Card */}
      <div className="dept-card">
        <div className="dept-card-header">
          <div className="dept-icon">🏢</div>
          <div>
            <h2>Create Department</h2>
            <p>Add a new department to the system</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="dept-form">
          <div className="dept-input-group">
            <label htmlFor="departmentName">Department Name</label>
            <input
              type="text"
              id="departmentName"
              value={departmentName}
              onChange={(e) => {
                setDepartmentName(e.target.value);
                setError('');
                setSuccess('');
              }}
              placeholder="e.g., Full Stack Development"
              required
            />
          </div>

          {error && (
            <div className="dept-alert dept-alert-error">
              <span>⚠️</span> {error}
            </div>
          )}
          {success && (
            <div className="dept-alert dept-alert-success">
              <span>✅</span> {success}
            </div>
          )}

          <button type="submit" className="dept-submit-btn" disabled={loading}>
            {loading ? (
              <span className="dept-loading">
                <span className="dept-spinner"></span> Creating...
              </span>
            ) : (
              '+ Create Department'
            )}
          </button>
        </form>
      </div>

      {/* Departments List Card */}
      <div className="dept-list-card">
        <div className="dept-list-header">
          <h3>All Departments</h3>
          <span className="dept-count">{departments.length} total</span>
        </div>

        <div className="dept-list">
          {departments.length > 0 ? (
            departments.map((dept, index) => (
              <div className="dept-list-item" key={dept.Department_id || index}>
                <div className="dept-list-item-left">
                  <span className="dept-badge">{index + 1}</span>
                  <span className="dept-name">{dept.Departmentname}</span>
                </div>
                <button
                  className="dept-delete-btn"
                  onClick={() => handleDelete(dept.Department_id)}
                  title="Delete department"
                >
                  🗑️
                </button>
              </div>
            ))
          ) : (

            <div className="dept-empty">
              <p>No departments yet. Create one above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentForm;
