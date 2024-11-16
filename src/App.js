import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import UserDetails from './pages/UserDetails'; // Import UserDetails component

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user-details/:userId" element={<UserDetails />} /> {/* Add route for UserDetails */}
          </>
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
