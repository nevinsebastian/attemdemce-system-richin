import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom

const UserDetails = ({ onClose }) => {
  const { userId } = useParams(); // Extract userId from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://13.233.103.177:8000/admin/users/${userId}`, {
          headers: { 'accept': 'application/json' }
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

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]); // Re-run effect when userId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-btn">X</button>
        {user && (
          <div>
            <h2>User Details</h2>
            <p><strong>First Name:</strong> {user.first_name}</p>
            <p><strong>Last Name:</strong> {user.last_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Branch ID:</strong> {user.branch_id}</p>
            <p><strong>Role:</strong> {user.role_name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
