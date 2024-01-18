import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import "./Home.css";
import AddEvent from "../Events/AddEvent";
import QRCodeModal from "../QRCodeModal/QRCodeModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Home = ({ UserFirstName, UserLastName }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [showQRCodePopup, setShowQRCodePopup] = useState(false); // Aici am modificat numele stării
  const [qrCodeText, setQrCodeText] = useState(""); // Aici am modificat numele stării

  const handleSaveEvent = (data) => {
    setEventData(prevEvents => [...prevEvents, data]);
    setShowPopup(false);
  };

  const handleShowQRCodeModal = (qrCodeText) => { // Am modificat funcția
    setQrCodeText(qrCodeText); // Setăm textul QR Code
    setShowQRCodePopup(true); // Deschidem pop-up-ul
  };

  const handleCloseQRCodePopup = () => {
    setShowQRCodePopup(false); // Închidem pop-up-ul
  };

  return (
    <div className="container">
      <div className="principal-container">
        <button className="btn-aboutus">About Us</button>
        <img className="logo" src="/logo_checkmate.png" alt="Checkmate Logo" />
        <button className="btn-signout">Sign out</button>
        <span className="title">
          <div className="title-description">
            <span className="title-text"> Welcome to, </span>
            <span className="title-checkmate">Checkmate</span>
          </div>
        </span>
        <div className="username">
          Organizer: {UserFirstName} {UserLastName}{" "}
        </div>

        <div className="container-evenimente">
          <button className="green-button" onClick={() => setShowPopup(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        {showPopup && (
          <AddEvent
            onSave={(data) => {
              handleSaveEvent(data);
              handleShowQRCodeModal(data.accesCode); 
            }}
            onClose={() => setShowPopup(false)}
          />
        )}

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
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => handleShowQRCodeModal(event.accesCode)}>
                      Cod acces
                    </button>
                    {showQRCodePopup && (
                      <QRCodeModal
                        show={showQRCodePopup}
                        handleClose={handleCloseQRCodePopup}
                        qrCodeText={qrCodeText}
                      />
                    )}
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
