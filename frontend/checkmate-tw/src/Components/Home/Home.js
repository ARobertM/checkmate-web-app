// Home.js
import React, { useState } from "react";
import "./Home.css";
import AddEvent from "../Events/AddEvent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [eventData, setEventData] = useState(null); // State pentru stocarea datelor evenimentului

  const handleSaveEvent = (data) => {
    setEventData(data);
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
            <button className="btn-sign-in">Sign Out</button> 
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
        {eventData && (
          <div className="event-data">
            <h2>Detalii eveniment:</h2>
            <p>Nume eveniment: {eventData.eventName}</p>
            <p>Data: {eventData.eventDate}</p>
            {/* <p>Ora de început: {eventData.startTime}</p>
            <p>Ora de sfârșit: {eventData.endTime}</p> */}
            {/* Afișați și alte detalii ale evenimentului */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
