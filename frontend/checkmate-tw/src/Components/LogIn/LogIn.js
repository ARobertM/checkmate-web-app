import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const SignInHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const response = await axios.get(
        "http://localhost:9000/api/user/email/" + email
      );
      const rol = response.data.users[0].UserRole;

      if (rol === "ORGANIZATOR") {
        navigate("/organizer");
      }
      if (rol === "PARTICIPANT") {
        navigate("/user");
      }
      
    } catch (error) {
      const errorCode = error.code;
      const message = error.message;
      console.log(errorCode, message);
      setErrorMessage(message);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card custom-card col-sm-10 col-md-8 col-lg-6 ">
        <h1 className="custom-heading d-flex justify-content-center">Login</h1>
        <form onSubmit={SignInHandleSubmit}>
          <label htmlFor="emailFormControl" className="form-label mt-2 custom-label">
            Email
          </label>
          <input
            type="text"
            className="form-control custom-input"
            id="emailFormControl"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="passwordFormControl" className="form-label mt-2 custom-label">
            Password
          </label>
          <input
            type="password"
            className="form-control custom-input"
            id="passwordFormControl"
            placeholder="*****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

          <div className="d-flex justify-content-center">
            <button className="tn custom-button col-11 mt-2" type="submit">
              Login
            </button>
          </div>
          <div className="card-footer mt-3 custom-footer">
            <NavLink to="/signup" className="btn btn-success col-12 mt-2">
              Create a new account
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
