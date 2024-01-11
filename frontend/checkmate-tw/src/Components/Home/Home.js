import React, { useState } from "react";

const Home = () => {
 
  const handleAddEvent = () => {
    console.log("Deschide formularul pentru adăugarea unui nou eveniment.");
   

  return (
    <div className="d-flex justify-content-center">
      <h2>Home sweet home Alabama</h2>
      <button onClick={handleAddEvent} className="btn event">
        Adaugă Eveniment
      </button>
    </div>
  );
};
}
export default Home;
