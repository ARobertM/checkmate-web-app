
import "./App.css";
import LogIn from "./Components/LogIn/LogIn";
import SignUp from "./Components/SignUp/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<LogIn/>} /> 
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/" element={<LogIn/>} />
      </Routes>
    </Router>
  );
}

export default App;
