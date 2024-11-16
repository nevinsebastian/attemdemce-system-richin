import React, { useState } from 'react';

const AttendanceModal = ({ selectedEmployees, selectedDate, status, onConfirm, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    
    const token = 'your-jwt-token-here'; // You will need to pass the JWT token here
    const formattedDate = selectedDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD

    // Loop through selected employees and send the API request
    for (let i = 0; i < selectedEmployees.length; i++) {
      const employee = selectedEmployees[i];
      try {
        const response = await fetch(
          `http://13.233.103.177:8000/admin/mark-attendance/?user_id=${employee}&attendance_date=${formattedDate}&status=${status}`,
          {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          console.log('Attendance marked:', data);
        } else {
          console.error('Error marking attendance:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    setIsSubmitting(false);
    onConfirm(); // Call onConfirm to indicate completion
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Attendance Confirmation</h3>
        <p>
          Are you sure you want to mark the attendance for the selected employees on {selectedDate.toLocaleDateString()} as {status}?
        </p>
        <div className="modal-actions">
          <button onClick={handleConfirm} disabled={isSubmitting} className="confirm-btn">
            {isSubmitting ? 'Submitting...' : 'Confirm'}
          </button>
          <button onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal;
