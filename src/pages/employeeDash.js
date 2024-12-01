import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext
import EmpNavbar from '../components/empNavbar';
import AttendanceCalendar from '../components/AttendanceCalendar';

function EmployeeDash() {
  const { user } = useContext(AuthContext); // Get logged-in user from context
  const [attendanceData, setAttendanceData] = useState([]);
  
  useEffect(() => {
    // Fetch the attendance data for the logged-in user
    const fetchAttendance = async () => {
      const token = localStorage.getItem('auth_token'); // Get the auth token
      try {
        const response = await fetch(`https://13.233.103.177:8000/admin/attendance/${user?.user_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAttendanceData(data); // Set the fetched attendance data
        } else {
          console.error('Failed to fetch attendance data');
        }
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };
    
    if (user) {
      fetchAttendance(); // Fetch attendance data when the user is available
    }
  }, [user]); // Re-fetch if user data changes

  return (
    <div>
      <EmpNavbar />
      {attendanceData.length > 0 ? (
        <AttendanceCalendar userId={user?.user_id} attendanceData={attendanceData} />
      ) : (
        <p>No attendance data available</p>
      )}
    </div>
  );
}

export default EmployeeDash;
