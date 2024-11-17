import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AddEmployeeModal from './AddEmployeeModal';
import DropdownMenu from './DropdownMenu';
import './Navbar.css';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // To toggle mobile menu visibility
  const navigate = useNavigate(); // Initialize useNavigate

  // Toggle dropdown menu visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleDashboardClick = () => {
    navigate('/'); // Route to the homepage
  };

  // Navigate to Leave page
  const handleLeaveClick = () => {
    navigate('/leave'); // Route to the Leave page
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Logout function (for demonstration, modify based on your authentication logic)
  const handleLogout = () => {
    // Clear the user session or token here
    navigate('/login'); // Redirect to login page or wherever needed
  };

  return (
    <nav className="navbar">
        <h1 className="navbar-logo" onClick={handleDashboardClick}>
        Admin Dashboard
      </h1>

      {/* Navbar actions */}
      <div className="navbar-actions">
        {/* Leave Button */}
        <button className="leave-btn" onClick={handleLeaveClick}>
          Leave
        </button>

        {/* Add Employee Button */}
        <button className="add-employee-btn" onClick={() => setIsModalOpen(true)}>
          <span>+ Add Employee</span>
        </button>

        {/* Avatar with Dropdown (for desktop only) */}
        <div className="relative">
          <div className="user-avatar" onClick={toggleDropdown}>
            {user?.first_name?.charAt(0).toUpperCase()}
          </div>
          {isDropdownOpen && <DropdownMenu />}
        </div>
      </div>

      {/* Mobile menu toggle button (Hamburger) */}
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        ☰
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="mobile-dropdown">
          <button onClick={handleLeaveClick} className="mobile-dropdown-btn">Leave</button>
          <button onClick={() => setIsModalOpen(true)} className="mobile-dropdown-btn">+ Add Employee</button>
          <button onClick={handleLogout} className="mobile-dropdown-btn">Logout</button>
        </div>
      )}

      {/* Add Employee Modal */}
      {isModalOpen && <AddEmployeeModal onClose={() => setIsModalOpen(false)} />}
    </nav>
  );
};

export default Navbar;
