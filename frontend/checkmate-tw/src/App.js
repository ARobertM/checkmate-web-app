import "./App.css";
import LogIn from "./Components/LogIn/LogIn";
import SignUp from "./Components/SignUp/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import React, { useState } from "react";
import AddEvent from "./Components/Events/AddEvent";
import HomeUser from "./Components/HomeUser/HomeUser";
import AboutUs from "./Components/AboutUs/AboutUs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/organizer" element={<Home />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/user" element={<HomeUser />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
