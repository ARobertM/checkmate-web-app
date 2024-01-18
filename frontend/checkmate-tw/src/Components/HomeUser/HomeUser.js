import React, { useState, useEffect } from "react";
import "./HomeUser.css";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase";
import UserEventChoose from "../UserEventChoose/UserEventChoose"; // Importă UserEventChoose

const HomeUser = () => {
  const [date, setDate] = useState([]);
  const [isUserEventChooseOpen, setIsUserEventChooseOpen] = useState(false); // Stadiu pentru controlul pop-up-ului

  useEffect(() => {
    let email;
    onAuthStateChanged(auth, (user) => {
      if (user) {
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

  const openUserEventChooseModal = () => {
    setIsUserEventChooseOpen(true);
  };

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
          User: {UserFirstName} {UserLastName}
        </div>
      </div>
      <div className="container-evenimente">
        <button className="green-button-1" onClick={openUserEventChooseModal}>
          Add Event
        </button>
        <UserEventChoose
          isOpen={isUserEventChooseOpen}
          onClose={() => setIsUserEventChooseOpen(false)}
        />
      </div>
    </div>
  );
};

export default HomeUser;
