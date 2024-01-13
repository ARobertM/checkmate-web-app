import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventStyle.css'; 

const Event = () => {
  const [events, setEvents] = useState([
    {
      name: 'Eveniment 1',
      description: 'Descriere Eveniment 1',
      date: '2023-01-01',
      startTime: '10:00',
      endTime: '12:00',
      status: 'open'
    },
    // ... alte evenimente
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate(); // Inițializarea useNavigate aici

  const handleSelect = (event) => {
    const eventDetails = events.find(e => e.name === event.target.value);
    setSelectedEvent(eventDetails);
  };

  const handleAddEvent = () => {
    navigate("/addEvent"); // Navighează la pagina AddEvent
  };

  return (
    <div className="app-container">
      <button onClick={handleAddEvent} className="btn btn-primary">
        Adaugă Eveniment
      </button>
      <select className="event-select" onChange={handleSelect}>
        {events.map((event, index) => (
          <option key={index} value={event.name}>
            {event.name}
          </option>
        ))}
      </select>
      {selectedEvent && (
        <div className="event-details">
          <h3>{selectedEvent.name}</h3>
          <p>{selectedEvent.description}</p>
          <p>Data: {selectedEvent.date}</p>
          <p>Ora început: {selectedEvent.startTime}</p>
          <p>Ora sfârșit: {selectedEvent.endTime}</p>
          <p className={`status-${selectedEvent.status}`}>
            Status: {selectedEvent.status === 'open' ? 'Deschis' : 'Închis'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Event;

