import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from '../components/UserInfo'; // Import UserInfo Component
import AttendanceCalendar from '../components/AttendanceCalendar';

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://13.233.103.177:8000/admin/users/${userId}`, {
          headers: { accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
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
      try {
        const response = await fetch(`https://13.233.103.177:8000/admin/attendance/${userId}`, {
          headers: { accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch attendance data');
        }

        const attendance = await response.json();
        setAttendanceData(attendance);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };

    if (userId) {
      fetchUserDetails();
      fetchAttendance();
    }
  }, [userId]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* User Info */}
      {user && <UserInfo user={user} />}
      {/* Attendance Calendar */}
      <AttendanceCalendar userId={userId} attendanceData={attendanceData} />
    </div>
  );
};

export default UserDetails;