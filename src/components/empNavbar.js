import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const EmpNavbar = () => {
  const { user } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo" onClick={() => navigate('/')}>
        Welcome {user?.first_name} {user?.last_name}!
      </h1>

      <div className="navbar-actions">
        <div className="relative">
          <div className="user-avatar" onClick={toggleDropdown}>
            {user?.first_name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        ☰
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-dropdown">
          <button onClick={handleLogout} className="mobile-dropdown-btn">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default EmpNavbar;
