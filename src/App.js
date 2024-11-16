import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
  const { user } = useContext(AuthContext); // Ensure AuthContext is wrapped correctly in index.js

  return (
    <>
      {user ? <Dashboard /> : <Login />}
    </>
  );
};

export default App;
