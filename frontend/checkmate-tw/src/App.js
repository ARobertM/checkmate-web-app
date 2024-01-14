
import "./App.css";
import LogIn from "./Components/LogIn/LogIn";
import SignUp from "./Components/SignUp/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import React, { useState } from 'react';
import AddEvent from "./Components/Events/AddEvent";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<LogIn/>} /> 
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/" element={<Home/>}/>
        <Route path="/addevent" element={<AddEvent/>}/>
      </Routes>
    </Router>
  );
}

export default App;
