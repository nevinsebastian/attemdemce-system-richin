// AddEmployeeModal.js
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import './AddEmployeeModal.css';

const AddEmployeeModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role_id: 2,
    branch_id: 1,
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://13.233.103.177:8000/admin/create_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSuccess(true); // Show success animation
        setTimeout(() => {
          onClose();
        }, 2000); // Close modal after 2 seconds
      } else {
        alert('Failed to create employee.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Accessing the Lottie animation from the public directory
  const defaultOptions = {
    loop: false,
    autoplay: true,
    path: `${process.env.PUBLIC_URL}/success-animation.json`, // Reference the file from the public directory
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {isSuccess ? (
          <div className="success-animation">
            <Lottie options={defaultOptions} height={150} width={150} />
            <h3>Employee Created Successfully!</h3>
          </div>
        ) : (
          <>
            <h2>Create New Employee</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit">Create Employee</button>
            </form>
            <button className="close-btn" onClick={onClose}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AddEmployeeModal;
