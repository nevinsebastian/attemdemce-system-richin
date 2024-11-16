import React from 'react';

const AttendanceModal = ({ status, token, onClose, onConfirm }) => {
  const handleConfirm = async () => {
    try {
      const promises = status.map(async (log) => {
        // Convert date from 'YYYY/MM/DD' to 'YYYY-MM-DD'
        const formattedDate = log.date.replace(/\//g, '-');
  
        // Log the data being sent to the API
        console.log('Sending Data:', {
          user_id: log.id,
          attendance_date: formattedDate,
          status: log.status,
        });
  
        // Construct the query parameters
        const url = `https://13.233.103.177:8000/admin/mark-attendance/?user_id=${log.id}&attendance_date=${formattedDate}&status=${log.status}`;
  
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Server error:', errorData);
          throw new Error('Failed to mark attendance');
        }
  
        return await response.json();
      });
  
      await Promise.all(promises);
      onConfirm(); // Confirm action
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to mark attendance');
    }
  };
  
  
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Attendance Confirmation</h2>
        <ul>
          {status.map((log, index) => (
            <li key={index}>
              {log.name} - {log.status} on {log.date}
            </li>
          ))}
        </ul>
        <button onClick={handleConfirm} className="confirm-btn">Confirm</button>
        <button onClick={onClose} className="cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default AttendanceModal;
