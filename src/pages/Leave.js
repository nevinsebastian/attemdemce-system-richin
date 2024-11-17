import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './Leave.css'

const Leave = () => {
  const [activeTab, setActiveTab] = useState('pending'); // Track active tab (pending or done)
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [doneLeaves, setDoneLeaves] = useState([]);

  // Fetch Pending Leave Requests
  useEffect(() => {
    const fetchPendingLeaves = async () => {
      try {
        const response = await fetch('https://13.233.103.177:8000/admin/leave-requests-pending/', {
          headers: { 'accept': 'application/json' },
        });
        const data = await response.json();
        setPendingLeaves(data);
      } catch (error) {
        console.error('Error fetching pending leave requests:', error);
      }
    };

    fetchPendingLeaves();
  }, []);

  // Fetch Done Leave Requests (can replace with your API for done leave requests)
  const fetchDoneLeaves = async () => {
    // Assuming there's an API endpoint for done leave requests like:
    // /admin/leave-requests-done
    // This should be replaced with the actual API URL for done leave requests.
    const data = []; // Placeholder, replace with actual API call
    setDoneLeaves(data);
  };

  // Handle approval or denial of leave
  const handleLeaveAction = async (leaveId, action) => {
    try {
      // Make an API call to approve or deny the leave request
      const response = await fetch(`https://13.233.103.177:8000/admin/leave-requests/${leaveId}`, {
        method: 'PATCH',
        headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action }),
      });

      if (response.ok) {
        // Reload the pending leaves after action
        if (activeTab === 'pending') {
          const updatedPending = pendingLeaves.filter((leave) => leave.leave_id !== leaveId);
          setPendingLeaves(updatedPending);
        }
        // Optionally, you can also update the "done" leaves list if necessary
        fetchDoneLeaves();
      } else {
        console.error('Failed to update leave status');
      }
    } catch (error) {
      console.error('Error handling leave action:', error);
    }
  };

  return (
    <div className="leave-page">
      <Navbar />

      {/* Tabs for Pending and Done, centered in the middle of the screen */}
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

      {/* Display Table for Pending Leave Requests */}
      {activeTab === 'pending' && (
        <div className="leave-table">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Leave Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {pendingLeaves.map((leave) => (
                <tr key={leave.leave_id}>
                  <td>{leave.user_id}</td>
                  <td>{leave.leave_date}</td>
                  <td>{leave.reason}</td>
                  <td>{leave.status}</td>
                  <td>{leave.first_name}</td>
                  <td>{leave.last_name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Action Buttons (Approve and Deny) below the table */}
          <div className="leave-actions">
            {pendingLeaves.map((leave) => (
              <div key={leave.leave_id} className="leave-action-buttons">
                <button
                  onClick={() => handleLeaveAction(leave.leave_id, 'approved')}
                  className="approve-btn"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleLeaveAction(leave.leave_id, 'denied')}
                  className="deny-btn"
                >
                  Deny
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display Done Leave Requests (if any) */}
      {activeTab === 'done' && (
        <div className="leave-table">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Leave Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {doneLeaves.length > 0 ? (
                doneLeaves.map((leave) => (
                  <tr key={leave.leave_id}>
                    <td>{leave.user_id}</td>
                    <td>{leave.leave_date}</td>
                    <td>{leave.reason}</td>
                    <td>{leave.status}</td>
                    <td>{leave.first_name}</td>
                    <td>{leave.last_name}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6">No done leave requests found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leave;
