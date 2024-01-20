import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { QrReader } from 'react-qr-reader';
 

const UserEventChoose = ({ isOpen,onClose,handleCod }) => {
 



  const[cod,setCod]=useState('');
  const [textOption, setTextOption] = useState(false); // State pentru a stoca datele citite din codul QR
  const [QrOption,setQrOption]=useState(false)



 
const handleClose=()=>{
  setQrOption(false)
  setTextOption(false)
  onClose()
}
  // Funcție pentru a gestiona citirea codului QR
  const handleQrScan =  (data) => {
    if (data) {

      handleCod(data.text);
      handleClose()
      
      
    }
  };
  const handleSubmit=()=>{
    handleCod(cod)
    handleClose()
  }

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
            onClick={()=>setTextOption(true)}
            
          >
             Text Code
          </button>  
           {QrOption &&     
          <QrReader
          
          style={{width: '100%'}}
          onError={handleError}
          onResult={handleQrScan}
          /> }
          {textOption&&
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="formCod" className="form-label">
               Text Code:
            </label>
            <input
              type="text"
              className="form-control"
              id="formCod"
              placeholder="Code"
              onChange={(e) => setCod(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary " style={{
              backgroundColor: "rgb(252, 0, 168)",
            }}>
              Search
            </button>
          </div>
            </form>}
         
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserEventChoose;
