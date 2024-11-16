import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Welcome, {user?.first_name} {user?.last_name}!
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
