import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './Leave.css';
import LeaveModal from '../components/LeaveModal'; // Import the modal component

const Leave = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [doneLeaves] = useState([]);
  const [selectedLeaves, setSelectedLeaves] = useState([]); // Store selected leave requests
  const [modalData, setModalData] = useState(null); // Data for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Pending Leave Requests
  useEffect(() => {
    const fetchPendingLeaves = async () => {
      try {
        const response = await fetch('https://13.233.103.177:8000/admin/leave-requests-pending/', {
          headers: { 'accept': 'application/json' },
        });
        const data = await response.json();
        // Ensure data is an array
        setPendingLeaves(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching pending leave requests:', error);
        setPendingLeaves([]); // Fallback to empty array on error
      }
    };

    fetchPendingLeaves();
  }, []);

  // Handle checkbox selection
  const handleCheckboxChange = (leaveId) => {
    setSelectedLeaves((prevSelected) =>
      prevSelected.includes(leaveId)
        ? prevSelected.filter((id) => id !== leaveId)
        : [...prevSelected, leaveId]
    );
  };

  // Handle approval or denial of leave
  const handleAction = (action) => {
    const selectedLeavesData = pendingLeaves.filter((leave) => selectedLeaves.includes(leave.leave_id));
    setModalData({ action, leaves: selectedLeavesData });
    setIsModalOpen(true); // Open modal for confirmation
  };

  return (
    <div>
      <Navbar />
      <div className="leave-page">
        {/* Tabs for Pending and Done */}
        <div className="tabs-container">
          <button
            className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </button>
          <button
            className={`tab ${activeTab === 'done' ? 'active' : ''}`}
            onClick={() => setActiveTab('done')}
          >
            Done
          </button>
        </div>

        {/* Display Pending Leave Requests */}
        {activeTab === 'pending' && (
          <div className="leave-table">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>User ID</th>
                  <th>Leave Date</th>
                  <th>Reason</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {pendingLeaves && Array.isArray(pendingLeaves) && pendingLeaves.length > 0 ? (
                  pendingLeaves.map((leave) => (
                    <tr key={leave.leave_id}>
                      <td>
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(leave.leave_id)}
                        />
                      </td>
                      <td>{leave.user_id}</td>
                      <td>{leave.leave_date}</td>
                      <td>{leave.reason}</td>
                      <td>{leave.first_name} {leave.last_name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No pending leave requests found.</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Action Buttons */}
            <div className="leave-actions">
              <button onClick={() => handleAction('approved')} className="approve-btn">
                Approve
              </button>
              <button onClick={() => handleAction('denied')} className="deny-btn">
                Deny
              </button>
            </div>
          </div>
        )}

        {/* Done Leave Requests */}
        {activeTab === 'done' && (
          <div className="leave-table">
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Leave Date</th>
                  <th>Reason</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {doneLeaves.length > 0 ? (
                  doneLeaves.map((leave) => (
                    <tr key={leave.leave_id}>
                      <td>{leave.user_id}</td>
                      <td>{leave.leave_date}</td>
                      <td>{leave.reason}</td>
                      <td>{leave.first_name} {leave.last_name}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4">No done leave requests found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for approval/denial */}
      {isModalOpen && (
        <LeaveModal
          modalData={modalData}
          onClose={() => setIsModalOpen(false)}
          onConfirm={async (action) => {
            const status = action === 'approved' ? 'approved' : 'rejected';
            modalData.leaves.forEach(async (leave) => {
              try {
                const response = await fetch(
                  `https://13.233.103.177:8000/admin/leave-requests/${leave.leave_id}/status`,
                  {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      'accept': 'application/json',
                    },
                    body: JSON.stringify({ status }),
                  }
                );
                const data = await response.json();
                if (response.ok) {
                  console.log(data.message); // Handle success
                } else {
                  console.error('Failed to update leave status:', data);
                }
              } catch (error) {
                console.error('Error updating leave status:', error);
              }
            });

            setIsModalOpen(false);
            setSelectedLeaves([]); // Clear selected leaves after the action
          }}
        />
      )}
    </div>
  );
};

export default Leave;
