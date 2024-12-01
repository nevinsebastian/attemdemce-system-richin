import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import EmpNavbar from './empNavbar';
import EmpLeaveModal from './EmpLeaveModal';
import { FaPlus } from 'react-icons/fa'; // For the plus icon

function EmpLeave() {
  const { user } = useContext(AuthContext);
  const [leaveData, setLeaveData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchLeaveData = async () => {
      const token = localStorage.getItem('auth_token');
      try {
        const response = await fetch('https://13.233.103.177:8000/employee/leave-status/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setLeaveData(data);
        } else {
          console.error('Failed to fetch leave data');
        }
      } catch (error) {
        console.error('Error fetching leave data:', error);
      }
    };

    if (user) fetchLeaveData();
  }, [user]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      <EmpNavbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Leave Status</h2>
          <button
            className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
            onClick={toggleModal}
          >
            <FaPlus />
          </button>
        </div>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Reason</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.length > 0 ? (
              leaveData.map((leave) => (
                <tr key={leave.leave_id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{leave.leave_date}</td>
                  <td className="border border-gray-300 p-2">{leave.reason}</td>
                  <td className="border border-gray-300 p-2">{leave.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4">No leave data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && <EmpLeaveModal onClose={toggleModal} />}
    </div>
  );
}

export default EmpLeave;
