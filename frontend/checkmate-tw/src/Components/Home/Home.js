// Home.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import AddEvent from "../Events/AddEvent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [eventData, setEventData] = useState([]); // State pentru stocarea datelor evenimentului

  const handleSaveEvent = (data) => {
    setEventData(prevEvents => [...prevEvents, data]);
    setShowPopup(false); // Închide popup-ul după salvare
  };

  return (
    <div className="container">
      <div className="principal-container">
        <span className="title">
          <img className="logo" src='/logo_checkmate.png' alt="Checkmate Logo" />
          <div className="title-description">
            <span className="title-text"> Welcome to, </span>
            <span className="title-checkmate">Checkmate</span>
            <span className="loggin-as">User: </span>
            {/* de adaugat state cu user-ul sa-i apara numele */}
            <Link to="/signin" className="btn-sign-in">Sign In</Link>
            <button className="btn-about-us">About Us</button>
          </div>
          <hr className="linie" />
        </span>

        <div className="container-evenimente">
          <button className="green-button" onClick={() => setShowPopup(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        {showPopup && <AddEvent onSave={handleSaveEvent} onClose={() => setShowPopup(false)} />}
        {/* Afișarea datelor evenimentului salvat */}
        {eventData.map((event, index) => (
          <div key={index} className="event-data">
            <h2>Detalii eveniment:</h2>
            <p>Nume eveniment: {event.eventName}</p>
            <p>Data: {event.eventDateStart}</p>
            <p>Ora de început: {event.startTime}</p>
            <p>Ora de sfârșit: {event.endTime}</p>
            <p>Descriere: {event.eventDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
