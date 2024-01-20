import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import AddEvent from "../Events/AddEvent";
import QRCodeModal from "../QRCodeModal/QRCodeModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [showQRCodePopup, setShowQRCodePopup] = useState(false); // Aici am modificat numele stării
  const [qrCodeText, setQrCodeText] = useState(""); // Aici am modificat numele stării
  const [user, setUser] = useState({}); //variabila pentru stocarea deatelor despre user
  const navigate = useNavigate();

  useEffect(() => {
    let email;
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        email = userAuth.email;
      }

      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:9000/api/user/email/" + email
          );
          setUser(response.data.users[0]);

          const eventResponse = await axios.get(
            "http://localhost:9000/api/events/organizer/" +
              response.data.users[0].UserId
          );

          const events = eventResponse.data.events.map((event) => {
            let startHours = new Date(event.EventStartDate).getHours();
            let startMinutes = new Date(event.EventStartDate).getMinutes();
            let endHours = new Date(event.EventEndDate).getHours();
            let endMinutes = new Date(event.EventEndDate).getMinutes();
            return {
              eventId: event.EventId,
              eventName: event.EventName,
              eventDescription: event.EventDescription,
              eventDateStart: new Date(event.EventStartDate),
              eventDateEnd: new Date(event.EventEndDate),
              meetingOption: event.EventStatus,
              repeatOption: "Never",
              repeatDays: 1,
              accessCode: event.EventCodAccess,
              startTime:
                startHours +
                ":" +
                (startMinutes < 10 ? "0" + startMinutes : startMinutes),
              endTime:
                endHours +
                ":" +
                (endMinutes < 10 ? "0" + endMinutes : endMinutes),
            };
          });
          setEventData(events);
        } catch (error) {
          console.error("Eroare la preluarea datelor:", error);
        }
      };
      fetchData();
    });
  }, []);

  const handleSaveEvent = (data) => {
    setEventData((prevEvents) => [...prevEvents, data]);
    setShowPopup(false);
  };

  const handleDeleteEvent = async (id) => {
    await axios.delete("http://localhost:9000/api/event/" + id);
    setEventData((prevData) =>
      prevData.filter((event) => event.eventId !== id)
    );
  };

  const handleShowQRCodeModal = (qrCodeText) => {
    // Am modificat funcția
    setQrCodeText(qrCodeText); // Setăm textul QR Code
    setShowQRCodePopup(true); // Deschidem pop-up-ul
  };

  const handleCloseQRCodePopup = () => {
    setShowQRCodePopup(false); // Închidem pop-up-ul
  };

  return (
    <div className="container">
      <div className="principal-container">
        <button
          className="btn-aboutus"
          onClick={() => {
            navigate("/aboutus");
          }}
        >
          About Us
        </button>
        <img className="logo" src="/logo_checkmate.png" alt="Checkmate Logo" />
        <button className="btn-signout">Sign out</button>
        <span className="title">
          <div className="title-description">
            <span className="title-text"> Welcome to, </span>
            <span className="title-checkmate">Checkmate</span>
          </div>
        </span>
        <div className="username">
          Organizer:{user.UserLastName + " " + user.UserFirstName}
        </div>

        <div className="container-evenimente">
          <button className="green-button" onClick={() => setShowPopup(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        {showPopup && (
          <AddEvent
            onSave={async (data) => {
              console.log(data.eventDateStart);
              console.log(data.eventDateEnd);

              const response = await axios.post(
                "http://localhost:9000/api/event",
                {
                  EventName: data.eventName,
                  EventDescription: data.eventDescription,
                  EventStartDate: data.eventDateStart,
                  EventEndDate: data.eventDateEnd,
                  EventStatus: data.meetingOption,
                  EventCodAccess: data.accessCode,
                  GroupId: 1,
                  UserId: user.UserId,
                }
              );
              if (response.data.success) {
                data.eventId = response.data.event.EventId;

                handleSaveEvent(data);
                handleShowQRCodeModal(data.accesCode);
              }
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
                    {event.eventDateStart.toDateString()}
                  </div>
                  <div className="col-2 mb-2">
                    {`${event.startTime} - ${event.endTime}`}
                  </div>
                  <div className="col-2 mb-2">
                    {event.repeatOption === "Never"
                      ? "Va avea loc o singura data"
                      : `Va avea loc zilnic ${event.repeatDays} zile`}
                  </div>
                  <div className="col-1 mb-2">{event.eventDescription}</div>
                  <div className="col-1 mb-2">
                    <span
                      className={`status ${
                        event.meetingOption === "OPEN"
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {event.meetingOption.toUpperCase()}
                    </span>
                  </div>
                  <div className="col-1 mb-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleShowQRCodeModal(event.accesCode)}
                    >
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
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleDeleteEvent(event.eventId)}
                    >
                      Șterge
                    </button>
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
