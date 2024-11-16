import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import DropdownMenu from './DropdownMenu';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-2xl font-bold">Admin Dashboard</div>

      {user && (
        <div className="relative">
          <button
            onClick={handleAvatarClick}
            className="flex items-center justify-center w-10 h-10 bg-indigo-500 text-white rounded-full font-bold"
          >
            {user.first_name[0]}
          </button>
          {isDropdownOpen && <DropdownMenu />}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
