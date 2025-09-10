import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarApp = () => {
  const [events, setEvents] = useState([
    { title: "Morning Walk", start: "2025-09-03T06:00:00", end: "2025-09-03T07:00:00" },
    { title: "Coding Session", start: "2025-09-03T10:00:00", end: "2025-09-03T12:00:00" },
  ]);

  // when user selects a time range
  const handleSelect = (info) => {
    console.log(info);
    
    const title = prompt("Enter Task:");
    if (title) {
      setEvents([...events, { title, start: info.startStr, end: info.endStr }]);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📅 Daily/Monthly Planner</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        selectable={true}
        editable={true}
        events={events}
        select={handleSelect}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
    </div>
  );
};

export default CalendarApp;
