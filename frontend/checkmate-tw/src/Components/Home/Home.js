import React, { useState } from "react";
import "./Home.css";
import AddEvent from "../Events/AddEvent";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="container">
      <div className="pricipal-container">

        <span className="title">
          <img className="logo" src='/logo_checkmate.png'></img>

          <div className="title-description">
            <span className="title-text"> Welcome to, </span>
            <span className="title-checkmate">Checkmate</span>
            <span className="loggin-as">User: </span>
            {/* de adaugat state cu user-ul sa-i apara numele */}
            <button className="btn-sign-in">Sign Out</button> 
            <button className="btn-about-us">About Us</button>
          </div>
          <hr className="linie"></hr>
        </span>
        
        <div className="container-evenimente">
          <button className="green-button" onClick={() => setShowPopup(true)}>
            +
          </button>
        </div>
        {showPopup && <AddEvent onClose={() => setShowPopup(false)} />}
      </div>
    </div>
  );
};

export default Home;
