
import "./App.css";
import LogIn from "./Components/LogIn/LogIn";
import SignUp from "./Components/SignUp/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Event from "./Components/Events/Events";
import AddEvent from "./Components/Events/AddEvents";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<LogIn/>} /> 
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/" element={<Event/>}/>
        <Route path="/addevent" element={<AddEvent/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
