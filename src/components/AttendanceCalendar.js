import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { parseISO } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const AttendanceCalendar = ({ userId, attendanceData }) => {
  const [events, setEvents] = useState([]);
  
  // Localizer using date-fns
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    // Map the attendance data to events for the calendar
    const mappedEvents = attendanceData.map((attendance) => {
      const eventDate = parseISO(attendance.date);
      let eventColor = '';
      
      // Determine the color based on the attendance status
      switch (attendance.status) {
        case 'present':
          eventColor = 'green';
          break;
        case 'absent':
          eventColor = 'red';
          break;
        case 'leave':
          eventColor = 'yellow';
          break;
        default:
          eventColor = 'gray';
      }
      
      return {
        title: attendance.status.charAt(0).toUpperCase() + attendance.status.slice(1),
        start: eventDate,
        end: eventDate,
        color: eventColor,
      };
    });
    
    setEvents(mappedEvents);
  }, [attendanceData]);

  return (
    <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Attendance Calendar</h2>
      
      {/* Calendar */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color,
            color: 'white',
            borderRadius: '5px',
            padding: '10px',
            fontWeight: 'bold',
          },
        })}
      />
      
      {/* Legend */}
      <div className="flex justify-around mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span>Present</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span>Absent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <span>Leave</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;
