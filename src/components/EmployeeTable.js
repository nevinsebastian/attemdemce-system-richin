import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Lottie from 'react-lottie';
import successAnimation from '../assets/success-animation.json';
import AttendanceModal from './AttendanceModal'; // Import AttendanceModal

import './EmployeeTable.css';

const EmployeeTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [token] = useState(''); // Add your actual token here if needed

  // Fetch employee data from API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://13.233.103.177:8000/admin/users', {
          method: 'GET',
          headers: { accept: 'application/json' },
        });
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Filter employees
  const filteredEmployees = employees.filter((employee) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      employee.first_name.toLowerCase().includes(searchLower) ||
      employee.last_name.toLowerCase().includes(searchLower) ||
      employee.user_id.toString().includes(searchLower)
    );
  });

  // Format date as YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split('T')[0];

  const handleCheckboxChange = (id) => {
    const updatedSelectedEmployees = [...selectedEmployees];
    if (updatedSelectedEmployees.includes(id)) {
      setSelectedEmployees(updatedSelectedEmployees.filter((employeeId) => employeeId !== id));
    } else {
      updatedSelectedEmployees.push(id);
      setSelectedEmployees(updatedSelectedEmployees);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map((employee) => employee.user_id));
    }
    setSelectAll(!selectAll);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);

  const handleAction = (action) => {
    if (selectedEmployees.length === 0) {
      alert('Please select at least one employee.');
      return;
    }

    const logMessage = selectedEmployees.map((id) => {
      const employee = employees.find((emp) => emp.user_id === id);
      return {
        id: employee.user_id,
        name: `${employee.first_name} ${employee.last_name}`,
        status: action,
        date: formatDate(selectedDate),
      };
    });

    setStatus(logMessage); // Set status to the log message array
    setShowModal(true); // Open modal
  };

  const handleModalClose = () => setShowModal(false); // Close modal
  const handleConfirm = () => {
    // Add logic for confirmation (if needed)
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowModal(false);
    }, 1500);
  };

  const animationOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
  };

  return (
    <div className="employee-table-container">
      <div className="table-header">
        <button onClick={toggleCalendar} className="date-button">
          {formatDate(selectedDate)}
        </button>
        {isCalendarOpen && (
          <div className="calendar-overlay">
            <DatePicker selected={selectedDate} onChange={handleDateChange} inline />
          </div>
        )}
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
            </th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.user_id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedEmployees.includes(employee.user_id)}
                  onChange={() => handleCheckboxChange(employee.user_id)}
                />
              </td>
              <td>{employee.user_id}</td>
              <td>
                <Link to={`/user-details/${employee.user_id}`} className="user-name-link">
                  {employee.first_name}
                </Link>
              </td>
              <td>{employee.last_name}</td>
              <td>{employee.role_name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="action-buttons">
        <button onClick={() => handleAction('present')} className="action-btn">Present</button>
        <button onClick={() => handleAction('absent')} className="action-btn">Absent</button>
        <button onClick={() => handleAction('leave')} className="action-btn">Leave</button>
      </div>

      {/* AttendanceModal opened when the button is clicked */}
      {showModal && (
        <AttendanceModal
          status={status} // Pass the selected status
          token={token} // Pass the token
          onClose={handleModalClose} // Handle modal close
          onConfirm={handleConfirm} // Handle confirm action
        />
      )}

      {isSuccess && (
        <div className="success-animation">
          <Lottie options={animationOptions} height={100} width={100} />
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
