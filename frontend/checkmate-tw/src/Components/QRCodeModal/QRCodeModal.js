import React,{useState} from "react";
import QRCode from 'qrcode.react';
import Modal from "react-bootstrap/Modal";

const QRCodeModal = ({ show, handleClose, qrCodeText }) => {
  const[qrClick,setQrClick]=useState(false);
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>QR Code</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <QRCode value={qrCodeText} size={!qrClick ? 100 : 500} onClick={()=>setQrClick(!qrClick)}/>
        </div>
        <div>
          <p>Text convertit în QR Code:</p>
          <p>{qrCodeText}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default QRCodeModal;
