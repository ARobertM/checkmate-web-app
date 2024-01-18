import React, { useState, useEffect } from "react";
import "./HomeUser.css";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase";
import { Button } from "bootstrap";

const HomeUser = () => {
  const [date, setDate] = useState([]);
  //const [email, setEmail] = useState("");
  useEffect(() => {
    let email;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //setEmail(user.email)
        email = user.email;
      }

      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:9000/api/user/email/" + email
          );
          setDate(response.data.users[0]);
        } catch (error) {
          console.error("Eroare la preluarea datelor:", error);
        }
      };
      fetchData();
    });
  }, []);

  const { UserFirstName, UserLastName, UserRole } = date;
  return (
    <div className="container">
      <div className="principal-container">
        <button className="btn-aboutus-1">About Us</button>
        <img className="logo" src="/logo_checkmate.png" alt="Checkmate Logo" />
        <button className="btn-signout-1">Sign out</button>
        <span className="title">
          <div className="title-description">
            <span className="title-text"> Welcome to, </span>
            <span className="title-checkmate">Checkmate</span>
          </div>
        </span>
        <div className="username">
          User: {UserFirstName} {UserLastName}{" "}
        </div>
      </div>
      <div className="container-evenimente">
        <button className="green-button-1">Add Event</button>
      </div>
    </div>
  );
};

export default HomeUser;
