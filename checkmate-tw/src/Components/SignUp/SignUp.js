import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Funcția pentru gestionarea evenimentului de trimitere a formularului
  const handleSignUp = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/signin");
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      
      });


    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card col-sm-10 col-md-8 col-lg-6">
        <h1 className="d-flex justify-content-center">Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label htmlFor="firstNameFormControl" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstNameFormControl"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastNameFormControl" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastNameFormControl"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="emailFormControl" className="form-label">
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
            <label htmlFor="passwordFormControl" className="form-label">
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
            <label htmlFor="selectRole" className="form-label">
              Role
            </label>
            <select className="form-select" id="selectRole">
              <option value="1">Participant</option>
              <option value="2">Event organizer</option>
            </select>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary col-11 mt-2">
              Sign Up
            </button>
          </div>
        </form>
        <p className="d-flex justify-content-center">
          Already have an account? <NavLink to="/signin">Sign in</NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
