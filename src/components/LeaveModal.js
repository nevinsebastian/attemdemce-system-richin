import React from 'react';
import './LeaveModal.css';

const LeaveModal = ({ modalData, onClose, onConfirm }) => {
  const { action, leaves } = modalData;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{action === 'approved' ? 'Approve Leave' : 'Deny Leave'}</h2>
        <div>
          {leaves.map((leave) => (
            <div key={leave.leave_id} className="modal-leave-details">
              <p><strong>Name:</strong> {leave.first_name} {leave.last_name}</p>
              <p><strong>Leave Date:</strong> {leave.leave_date}</p>
              <p><strong>Reason:</strong> {leave.reason}</p>
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={() => onConfirm(action)} className="confirm-btn">
            Confirm
          </button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveModal;
