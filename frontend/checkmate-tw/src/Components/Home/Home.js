import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <div className="mt-3">
          {eventData.map((event, index) => (
            <div key={index} className="card mb-2 event-card">
              <div className="card-body p-2">
                <div className="row align-items-center">
                  <div className="col-2 font-weight-bold">
                    {event.eventName}
                  </div>
                  <div className="col-2 mb-2">
                    {event.eventDateStart}
                  </div>
                  <div className="col-2 mb-2">
                    {`${event.startTime} - ${event.endTime}`}
                  </div>
                  <div className="col-2 mb-2">
                    {event.repeatOption === "Never" 
                      ? "Va avea loc 1 zi" 
                      : `Va avea loc zilnic ${event.repeatDays} zile`}
                  </div>
                  <div className="col-1 mb-2">
                    {event.eventDescription}
                  </div>
                  <div className="col-1 mb-2">
                    <span className={`status ${event.meetingOption === "Open" ? "text-success" : "text-danger"}`}>
                      {event.meetingOption.toUpperCase()}
                    </span>
                  </div>
                  <div className="col-1 mb-2">
                    <button className="btn btn-sm btn-outline-secondary">Cod acces</button>
                  </div>
                  <div className="col-1 mb-2">
                    <button className="btn btn-sm btn-outline-secondary">Șterge</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
