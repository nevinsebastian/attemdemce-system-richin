// App.js
import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? <Dashboard /> : <Login />}
    </>
  );
};

export default App;
