import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const DropdownMenu = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  );
};

export default DropdownMenu;
