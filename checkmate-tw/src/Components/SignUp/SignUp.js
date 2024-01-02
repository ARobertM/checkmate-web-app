import React,{useState} from "react";

const SignUp=()=>{

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    // Funcția pentru gestionarea evenimentului de trimitere a formularului
    const handleSignUp = (e) => {
      e.preventDefault();
  
      // Aici poți adăuga logica pentru gestionarea datelor introduse
      // De exemplu, poți trimite aceste date către un API pentru a crea un cont
  
      // Și/sau poți reseta starea formularului după trimiterea cu succes a datelor
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
                placeholder="Nume"
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
                placeholder="Prenume"
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
                placeholder="Parolă"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary col-11 mt-2">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default SignUp