// components/Navbar.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AddEmployeeModal from './AddEmployeeModal';
import DropdownMenu from './DropdownMenu';
import './Navbar.css';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown menu visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <h1>Admin Dashboard</h1>
      <div className="navbar-actions">
        <button className="add-employee-btn" onClick={() => setIsModalOpen(true)}>
          <span>+ Add Employee</span>
        </button>

        {/* Avatar with Dropdown */}
        <div className="relative">
          <div className="user-avatar" onClick={toggleDropdown}>
            {user?.first_name?.charAt(0).toUpperCase()}
          </div>
          {isDropdownOpen && <DropdownMenu />}
        </div>
      </div>

      {/* Add Employee Modal */}
      {isModalOpen && <AddEmployeeModal onClose={() => setIsModalOpen(false)} />}
    </nav>
  );
};

export default Navbar;
