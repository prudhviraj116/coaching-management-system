import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title } from 'chart.js';
import { useTheme } from '@mui/material/styles';
import { School, Group, BatchPrediction } from '@mui/icons-material';
import '../Admin/ReportAnalysis.css';  // Import the CSS file

// Register the Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title);

const ReportAnalysis = () => {
  const [staffCount, setStaffCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [batchCount, setBatchCount] = useState(0);
  const [studentData, setStudentData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [staffResponse, studentResponse, batchResponse, notificationResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/studentportal/staff-count/'),
          axios.get('http://127.0.0.1:8000/studentportal/student-count/'),
          axios.get('http://127.0.0.1:8000/studentportal/batches/'),
        ]);

        setStaffCount(staffResponse.data.staff_count);
        setStudentCount(studentResponse.data.student_count);
        setBatchCount(batchResponse.data.length);
      } catch (error) {
        setError('Error fetching counts');
        console.error('Error fetching counts:', error);
      }
    };

    const fetchGraphData = async () => {
      try {
        const [studentGraphResponse, staffGraphResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/studentportal/student-graph-data/'),
          axios.get('http://127.0.0.1:8000/studentportal/staff-graph-data/')
        ]);

        setStudentData(studentGraphResponse.data);
        setStaffData(staffGraphResponse.data);
      } catch (error) {
        setError('Error fetching graph data');
        console.error('Error fetching graph data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
    fetchGraphData();
  }, []);

  const prepareChartData = (data, label) => ({
    labels: data.map(item => item.date),
    datasets: [
      {
        label: label,
        data: data.map(item => item.count),
        borderColor: '#007bff', // Custom color for line chart
        backgroundColor: 'rgba(0, 123, 255, 0.2)', // Custom background color for line chart
        fill: true,
        tension: 0.1, // smooth line
      }
    ]
  });

  if (loading) return <div className="loader"><CircularProgress /></div>;
  if (error) return <Alert className="alert" severity="error">{error}</Alert>;

  return (
    <div className="container">
      <Typography variant="h4" gutterBottom>
        Report Analysis
      </Typography>
      <Grid container spacing={10}>
        <Grid item xs={14} sm={8} md={4}>
          <Card className="students" sx={{ background: 'linear-gradient(135deg, #FF6F61 0%, #FFB74D 100%)', color: '#fff', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ padding: '24px', textAlign: 'center' }}>
              <School sx={{ fontSize: 40, color: '#fff' }} />
              <Typography variant="h5" sx={{ mt: 1 }}>Students</Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>{studentCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={14} sm={8} md={4}>
          <Card className="staff" sx={{
            background: 'linear-gradient(135deg, #a8d5ba 0%, #8bc34a 100%)', // Light green gradient
            color: '#fff',
            borderRadius: '15px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // Subtle shadow for a soft look
          }}>
            <Group sx={{ fontSize: 40, color: '#fff' }} />
            <CardContent sx={{ padding: '24px', textAlign: 'center' }}>
              <Typography variant="h5" sx={{ mt: 1 }}>Staff</Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>{staffCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={14} sm={8} md={4}>
          <Card className="batches" sx={{ background: 'linear-gradient(135deg, #FFEB3B 0%, #FBC02D 100%)', color: '#fff', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <BatchPrediction sx={{ fontSize: 40, color: '#fff' }} />
            <CardContent sx={{ padding: '24px', textAlign: 'center' }}>
              <Typography variant="h5" sx={{ mt: 1 }}>Batches</Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>{batchCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <div className="chart-container">
        <Typography variant="h5" className="chart-title">Trends</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div className="chart">
              <Typography variant="h6">Student Trends</Typography>
              <Line className="line-chart" data={prepareChartData(studentData, 'Students')} options={{ responsive: true }} />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="chart">
              <Typography variant="h6">Staff Trends</Typography>
              <Line className="line-chart" data={prepareChartData(staffData, 'Staff')} options={{ responsive: true }} />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ReportAnalysis;
