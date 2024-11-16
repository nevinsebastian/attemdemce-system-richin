import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Importing styles for the calendar
import Lottie from 'react-lottie';
import successAnimation from '../assets/success-animation.json'; // Import your Lottie JSON
import './EmployeeTable.css';

const EmployeeTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // State to control calendar visibility
  const [status, setStatus] = useState(null); // Store status (Present/Absent/Leave)
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [isSuccess, setIsSuccess] = useState(false); // State to control success animation
  const [employees, setEmployees] = useState([]); // State for employee data
  const [token, setToken] = useState(''); // State for the API token

  const calendarRef = useRef(null); // Ref for the calendar container
  const buttonRef = useRef(null); // Ref for the date button

  // Fetch employee data from API on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://13.233.103.177:8000/admin/users', {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        });
        const data = await response.json();
        setEmployees(data); // Update state with API data
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Filter employees by name or id
  const filteredEmployees = employees.filter((employee) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      employee.first_name.toLowerCase().includes(searchLower) ||
      employee.last_name.toLowerCase().includes(searchLower) ||
      employee.user_id.toString().includes(searchLower)
    );
  });

  // Format date as YYYY/MM/DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if necessary
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if necessary
    return `${year}/${month}/${day}`;
  };

  // Handle single checkbox change
  const handleCheckboxChange = (id) => {
    const updatedSelectedEmployees = [...selectedEmployees];
    if (updatedSelectedEmployees.includes(id)) {
      setSelectedEmployees(updatedSelectedEmployees.filter((employeeId) => employeeId !== id));
    } else {
      updatedSelectedEmployees.push(id);
      setSelectedEmployees(updatedSelectedEmployees);
    }
  };

  // Handle "Select All" checkbox change
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map((employee) => employee.user_id));
    }
    setSelectAll(!selectAll);
  };

  // Handle Date Picker selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false); // Close calendar after selecting a date
  };

  // Handle calendar visibility toggle
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  // Close calendar if clicked outside
  const handleClickOutside = (event) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsCalendarOpen(false);
    }
  };

  // Attach and clean up click outside event listener
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle action buttons (Present, Absent, Leave)
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
        date: formatDate(selectedDate), // Format the selected date
      };
    });

    setStatus(logMessage);
    setShowModal(true); // Show the modal when action is taken
  };

  // Handle Cancel Button (clear selections)
  const handleCancel = () => {
    setSelectedEmployees([]);
    setSelectAll(false);
    setStatus(null);
  };

  // Handle Confirm action in the modal
  const handleConfirm = async () => {
    try {
      const promises = status.map(async (log) => {
        const response = await fetch('http://13.233.103.177:8000/admin/mark-attendance/', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: new URLSearchParams({
            user_id: log.id,
            attendance_date: log.date,
            status: log.status,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to mark attendance');
        }

        return await response.json(); // Assuming API response is in JSON format
      });

      await Promise.all(promises); // Wait for all API calls to complete
      setIsSuccess(true); // Show success animation
      setTimeout(() => {
        setIsSuccess(false);
        setShowModal(false); // Close modal after success animation
      }, 1500);
    } catch (error) {
      console.error('Error confirming attendance:', error);
      alert('Failed to mark attendance');
    }
  };

  // Handle Modal Close (Cancel)
  const handleModalCancel = () => {
    setShowModal(false); // Close modal
  };

  // Lottie animation options
  const animationOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="employee-table-container">
      <div className="table-header">
        <div className="date-button-container">
          <button
            ref={buttonRef}
            onClick={toggleCalendar}
            className="date-button"
          >
            {formatDate(selectedDate)} {/* Show selected date in YYYY/MM/DD format */}
          </button>
          {isCalendarOpen && (
            <div ref={calendarRef} className="calendar-overlay">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                inline
              />
            </div>
          )}
        </div>
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
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="select-all-checkbox"
              />
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
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.role_name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="action-buttons">
        <button onClick={() => handleAction('Present')} className="action-btn present-btn">Present</button>
        <button onClick={() => handleAction('Absent')} className="action-btn absent-btn">Absent</button>
        <button onClick={() => handleAction('Leave')} className="action-btn leave-btn">Leave</button>
        <button onClick={handleCancel} className="action-btn cancel-btn">Cancel</button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Attendance Confirmation</h2>
            <ul>
              {status?.map((log, index) => (
                <li key={index}>
                  {log.name} - {log.status} on {log.date}
                </li>
              ))}
            </ul>
            <button onClick={handleConfirm} className="confirm-btn">Confirm</button>
            <button onClick={handleModalCancel} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}

      {/* Success Animation */}
      {isSuccess && (
        <div className="success-animation">
          <Lottie options={animationOptions} height={100} width={100} />
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
