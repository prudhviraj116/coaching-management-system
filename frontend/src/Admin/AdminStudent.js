import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Admin/AdminStudents.css'; // Ensure to add your styles here

const AdminStudent = () => {
    const [batches, setBatches] = useState([]);
    const [selectedBatchId, setSelectedBatchId] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [additionalStudentData, setAdditionalStudentData] = useState([]);
    const [feeStatus, setFeeStatus] = useState('paid'); // Default to 'paid'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [additionalError, setAdditionalError] = useState('');
    const [showFeesTable, setShowFeesTable] = useState(true); // New state to toggle table views
    const token = localStorage.getItem('authToken'); // Retrieve the token from local storage

    const axiosConfig = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/studentportal/batches/', axiosConfig);
                setBatches(response.data);
            } catch (error) {
                console.error('Error fetching batches:', error);
                setError('Failed to fetch batches. Please try again later.');
            }
        };

        fetchBatches();
    }, []);

    useEffect(() => {
        if (selectedBatchId) {
            fetchFilteredData();
            fetchAdditionalStudentData();
        } else {
            setFilteredData([]);
            setAdditionalStudentData([]);
        }
    }, [selectedBatchId, feeStatus]);

    const fetchFilteredData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/studentportal/students-with-outstanding-fees/${selectedBatchId}/${feeStatus}/`, axiosConfig);
            setFilteredData(response.data);
            setError('');
        } catch (error) {
            setError('Failed to fetch filtered data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const fetchAdditionalStudentData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/studentportal/batch/${selectedBatchId}/students/`, axiosConfig);
            setAdditionalStudentData(response.data);
            setAdditionalError('');
        } catch (error) {
            setAdditionalError('Failed to fetch additional student data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleFeeStatusChange = (e) => {
        setFeeStatus(e.target.value);
    };

    const toggleTable = (table) => {
        setShowFeesTable(table === 'fees');
    };

    return (
        <div className='batch-student-page'>
            <h1>Batch and Student List</h1>

            <div className='batch-list'>
                <ul>
                    {batches.map(batch => (
                        <li key={batch.batch_id}>
                            <button onClick={() => setSelectedBatchId(batch.batch_id)} className="batch-button">
                                {batch.batch_name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {selectedBatchId && (
                <>
                    <div className='table-toggle-buttons'>
                        <button onClick={() => toggleTable('fees')} className={`toggle-button ${showFeesTable ? 'active' : ''}`}>
                            Show Fees Table
                        </button>
                        <button onClick={() => toggleTable('details')} className={`toggle-button ${!showFeesTable ? 'active' : ''}`}>
                            Show Details Table
                        </button>
                    </div>

                    {showFeesTable && (
                        <div className='students-container'>
                            <h2>Students in Batch {selectedBatchId}</h2>
                            
                            <div className='filter-container'>
                                <h3>Filter by Fee Status</h3>
                                <select
                                    id="feeStatus"
                                    value={feeStatus}
                                    onChange={handleFeeStatusChange}
                                    className='filter-select'
                                >
                                    <option value="paid">Paid</option>
                                    <option value="pending">Pending</option>
                                    <option value="all">All</option>
                                </select>
                            </div>

                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <>
                                    {error && <p className="error-message">{error}</p>}
                                    {filteredData.length > 0 ? (
                                        <div className="student-data-table">
                                            <h3>Filtered Students with Fee Status {feeStatus}</h3>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Student ID</th>
                                                        <th>Username</th>
                                                        <th>Email</th>
                                                        <th>Batch</th>
                                                        <th>Mobile No</th>
                                                        {feeStatus === 'paid' || feeStatus === 'pending' || feeStatus === 'all' ? (
                                                            <>
                                                                <th>Amount Paid</th>
                                                                <th>Fee Status</th>
                                                                <th>Total Amount</th>
                                                                <th>Balance Due</th>
                                                            </>
                                                        ) : null}
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
                                                            {feeStatus === 'paid' || feeStatus === 'pending' || feeStatus === 'all' ? (
                                                                <>
                                                                    <td>{student.fee.amount_paid}</td>
                                                                    <td>{student.fee.fee_status}</td>
                                                                    <td>{student.fee.total_amount}</td>
                                                                    <td>{student.fee.balance_due}</td>
                                                                </>
                                                            ) : null}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <p>No students found.</p>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    {!showFeesTable && (
                        <div className='additional-students-container'>
                            <h2>All Students in Batch {selectedBatchId}</h2>

                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <>
                                    {additionalError && <p className="error-message">{additionalError}</p>}
                                    {additionalStudentData.length > 0 ? (
                                        <div className="additional-student-data-table">
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
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {additionalStudentData.map(student => (
                                                        <tr key={student.student_id}>
                                                            <td>{student.student_id}</td>
                                                            <td>{student.userrole.username}</td>
                                                            <td>{student.userrole.email}</td>
                                                            <td>{student.batch}</td>
                                                            <td>{student.mobile_no}</td>
                                                            <td>{student.address}</td>
                                                            <td>{student.Qulification}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <p>No additional student data found.</p>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminStudent;
