import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { QrReader } from 'react-qr-reader';
 

const UserEventChoose = ({ isOpen, onClose }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [qrData, setQrData] = useState(null); // State pentru a stoca datele citite din codul QR

  const handleEventSelection = (eventType) => {
    setSelectedEvent(eventType);
    onClose();
  };

  // Funcție pentru a gestiona citirea codului QR
  const handleQrScan = (data) => {
    if (data) {
      setQrData(data);
      onClose(); // Închide modalul după ce se citește codul QR cu succes
    }
  };

  // Funcție pentru gestionarea erorilor la citirea codului QR
  const handleError = (error) => {
    console.error("Eroare la citirea codului QR:", error);
  };

  return (
    <div>
      <Modal show={isOpen} onHide={onClose} contentLabel="Event Type Modal">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <h2>Choose Event Type</h2>
          <button
            type="button"
            className="btn btn-primary"
            style={{
              backgroundColor: "rgb(252, 0, 168)",
              marginRight: "10px",
            }}
            onClick={() => handleEventSelection("QR Code Scan")}
          >
            QR Code Scan
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{
              backgroundColor: "rgb(252, 0, 168)",
            }}
            onClick={() => handleEventSelection("Input Text")}
          >
            Input Text
          </button>        
          <QrReader
            delay={300} 
            onError={handleError}
            onScan={handleQrScan}
          /> 
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserEventChoose;
