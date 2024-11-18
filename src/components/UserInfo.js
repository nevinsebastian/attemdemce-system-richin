import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiMail, FiUser } from 'react-icons/fi';
import { RiBuilding2Line } from 'react-icons/ri';

const UserInfo = ({ user }) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-lg p-8">
      <FaUserCircle className="text-gray-400 mb-4" size={80} />
      <h2 className="text-3xl font-bold text-gray-800">
        {user.first_name} {user.last_name}
      </h2>
      <p className="text-gray-500 mt-2">{user.role_name}</p>
      <div className="w-full flex flex-col items-center space-y-2 mt-4">
        <div className="flex items-center gap-2">
          <FiUser className="text-gray-500" />
          <p className="text-gray-600">Username: {user.username}</p>
        </div>
        <div className="flex items-center gap-2">
          <FiMail className="text-gray-500" />
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <RiBuilding2Line className="text-gray-500" />
          <p className="text-gray-600">Branch ID: {user.branch_id}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
