// pages/Dashboard.js
import React from 'react';
import Navbar from '../components/Navbar';
import EmployeeTable from '../components/EmployeeTable'; // Import the EmployeeTable component

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <h2>Welcome to the Amin Dashboard</h2>
      
      {/* Add the EmployeeTable component here */}
      <EmployeeTable />
    </div>
  );
};

export default Dashboard;
