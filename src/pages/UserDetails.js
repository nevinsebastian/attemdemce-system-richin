import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FiMail, FiCalendar, FiUser } from 'react-icons/fi';
import { RiBuilding2Line } from 'react-icons/ri';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './UserDetails.css'; // Optional for custom styles

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attendanceDates, setAttendanceDates] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://13.233.103.177:8000/admin/users/${userId}`, {
          headers: { accept: 'application/json' },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('User not found');
          } else {
            throw new Error('Failed to fetch user details');
          }
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchAttendance = async () => {
      // Mock attendance dates, replace with real API call if needed
      const mockAttendance = [
        '2024-11-01',
        '2024-11-03',
        '2024-11-05',
        '2024-11-10',
      ];
      setAttendanceDates(mockAttendance);
    };

    if (userId) {
      fetchUserDetails();
      fetchAttendance();
    }
  }, [userId]);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      if (attendanceDates.includes(dateString)) {
        return 'highlight-attendance';
      }
    }
    return null;
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Section - User Info */}
      <div className="flex flex-col items-center bg-white shadow-lg p-8">
        {user && (
          <>
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
          </>
        )}
      </div>

      {/* Middle-Bottom Section - Larger Calendar */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <FiCalendar /> Attendance Calendar
          </h2>
          <Calendar
            tileClassName={tileClassName}
            view="month"
            defaultView="month"
            className="big-calendar"
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
