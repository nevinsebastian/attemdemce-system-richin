// components/DropdownMenu.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './DropdownMenu.css';

const DropdownMenu = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dropdown-menu">
      <button onClick={handleLogout} className="dropdown-item">
        Logout
      </button>
    </div>
  );
};

export default DropdownMenu;
