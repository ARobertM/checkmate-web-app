// Home.js
import React, { useState } from "react";
import "./Home.css";
import AddEvent from "../Events/AddEvent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

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
        {showPopup && <AddEvent onClose={() => setShowPopup(false)} />}
      </div>
    </div>
  );
};

export default Home;
