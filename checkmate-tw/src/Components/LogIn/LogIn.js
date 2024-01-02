import React,{useState}from "react";
import { Link } from "react-router-dom";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const SignInHandleClick=()=>{
        if (username && password) {
           // de inlocuit cu logica reala
            if (username === "user" && password === "pass") {
              alert("Autentificare reușită!");
              // Navigare catre Home
            } else {
              alert("Login failed. Invalid credintials.");
            }
          } else if(username) {
            alert("Input password.");
          }
          else{
            alert('Input username')
          }   
    }

  return (
    <div class='d-flex justify-content-center'>
    <div class='card col-sm-10 col-md-8 col-lg-6'>
      <h1 class='d-flex justify-content-center'>Login</h1>
      <label for="userNameFormControl" class="form-label mt-2 ">UserName</label>
      <input type="text" class="form-control" id="userNameFormControl" placeholder="UserName"
      value={username} onChange={(e)=>setUsername(e.target.value)}/>

      <label for="passwordFormControl" class="form-label mt-2">Password</label>
      <input type="password" class="form-control" id="passwordFormControl" placeholder="***" value={password}
      onChange={(e)=>setPassword(e.target.value)}/>

      <div class='d-flex justify-content-center'>
      <button onClick={SignInHandleClick} class="btn btn-primary col-11 mt-2 " type="button">Sign In</button>
      </div>
      <div class='card-footer mt-3'>
      <Link to="/signup" className="btn btn-success col-12 mt-2">
          Create a new account
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Login;
