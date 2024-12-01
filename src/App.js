import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import UserDetails from './pages/UserDetails';
import Leave from './pages/Leave';
import EmployeeDash from './pages/employeeDash';

const App = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) setRole(storedRole);
  }, [user]);

  return (
    <Router>
      <Routes>
        {user ? (
          role === 'admin' ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/user-details/:userId" element={<UserDetails />} />
              <Route path="/leave" element={<Leave />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : role === 'employee' ? (
            <>
              <Route path="/" element={<EmployeeDash />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
