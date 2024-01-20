import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { QrReader } from 'react-qr-reader';
 

const UserEventChoose = ({ isOpen,onClose,handleCodeInput }) => {
 




  const [qrData, setQrData] = useState(null); // State pentru a stoca datele citite din codul QR
  const [QrOption,setQrOption]=useState(false)



 
const handleClose=()=>{
  setQrOption(false)
  onClose()
}
  // Funcție pentru a gestiona citirea codului QR
  const handleQrScan =  (data) => {
    if (data) {
      
      setQrData(data.text);
      
     
      //console.log(data)
      console.log(qrData)
      handleClose()
      
      
    }
  };

  const handleError = (error) => {
    console.error("Eroare la citirea codului QR:", error);
  };

  return (
    <div>
      <Modal show={isOpen} onHide={handleClose}  >
        <Modal.Header closeButton ></Modal.Header>
        <Modal.Body className="text-center">
          <h2>Choose code type</h2>
           <button
            type="button"
            className="btn btn-primary"
            style={{
              backgroundColor: "rgb(252, 0, 168)",
              marginRight: "10px",
            }}
            onClick={()=>setQrOption(true)}
           
          >
            QR Code 
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{
              backgroundColor: "rgb(252, 0, 168)",
            }}
            
          >
             Text Code
          </button>  
           {QrOption &&     
          <QrReader
          
          style={{width: '100%'}}
          onError={handleError}
          onResult={handleQrScan}
          /> }
         
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserEventChoose;
