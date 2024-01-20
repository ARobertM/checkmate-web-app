import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import axios from "axios";
import "./SignUp.css";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PARTICIPANT");
  const navigate = useNavigate();

  // Funcția pentru gestionarea evenimentului de trimitere a formularului
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const response = await axios.post("http://localhost:9000/api/user", {
        UserFirstName: firstName,
        UserLastName: lastName,
        UserEmail: email,
        UserRole: role,
      });

      //console.log(response.data);
      navigate("/login");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card col-sm-10 col-md-8 col-lg-6 p-4 custom-card" style={{ opacity: '0.85', backdropFilter: 'blur(10px)' }}>
      <h1 className="text-center text-primary custom-font">Create an account</h1>
        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label htmlFor="firstNameFormControl" className="custom-label-size">
              First Name
            </label>
            <input
              type="text"
              className="form-control rounded"
              id="firstNameFormControl"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
            />
          </div>
          <div className="mb-3">
          <label htmlFor="lastNameFormControl" className="custom-label-size">
            Last Name
          </label>
          <input
            type="text"
            className="form-control rounded"
            id="lastNameFormControl"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
          />
        </div>
          <div className="mb-3">
            <label htmlFor="emailFormControl" className="custom-label-size">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="emailFormControl"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordFormControl" className="custom-label-size">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordFormControl"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="selectRole" className="custom-label-size">
              Role
            </label>
            <select
              className="form-select"
              id="selectRole"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="PARTICIPANT">Participant</option>
              <option value="ORGANIZATOR">Event organizer</option>
            </select>
          </div>
          <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary btn-lg rounded-pill col-11 mt-2">
            Sign Up
          </button>
        </div>
        </form>
        <p className="text-center mt-3">
        Already have an account? <NavLink to="/login" className="text-primary">Login</NavLink>
      </p>
      </div>
    </div>
  );
};

export default SignUp;
