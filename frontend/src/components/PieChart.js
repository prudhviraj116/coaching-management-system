// src/components/PieChart.js

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ data }) => {
  const chartData = {
    labels: ['Lab', 'Weekly Test', 'Weekly Mock'],
    datasets: [{
      label: 'Attendance',
      data: [data.lab, data.weeklyTest, data.weeklyMock],
      backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)'],
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
      borderWidth: 1,
    }],
  };

  return (
    <div className="pie-chart-container">
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
