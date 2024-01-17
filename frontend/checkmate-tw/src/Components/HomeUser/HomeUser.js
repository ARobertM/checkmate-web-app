import React, { useState } from "react";
import './HomeUser.css'

const HomeUser = () => {

    return(
        <div className="container">
        <div className="principal-container">
        <button className="btn-aboutus">About Us</button>
        <img className="logo" src='/logo_checkmate.png' alt="Checkmate Logo" />
        <button className="btn-signout">Sign out</button>
          <span className="title">
            <div className="title-description">
              <span className="title-text"> Welcome to, </span>
              <span className="title-checkmate">Checkmate</span>
            </div>
          </span>
          <div className="username">User: </div>
        </div>
        
      </div>
      
      
    )
}

export default HomeUser;