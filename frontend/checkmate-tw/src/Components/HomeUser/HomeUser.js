import React, { useState, useEffect } from "react";
import "./HomeUser.css";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase";
import { signOut } from "firebase/auth";
import UserEventChoose from "../UserEventChoose/UserEventChoose"; // Importă UserEventChoose
import { useNavigate } from "react-router-dom";


const HomeUser = () => {

 

  const [date, setDate] = useState({});
  const [isUserEventChooseOpen, setIsUserEventChooseOpen] = useState(false);
  const navigate = useNavigate();

  const[EventData,setEventData]=useState([])
  const[joinConfirm,setJoinConfirm]=useState(false)
  const[joinError,setJoinError]=useState(false)
  const[existingEvent,setExistingEvent]=useState(false)

 const[cod,setCod]=useState('');
 
 const getEventbyCode=async(cod)=>{
  try {
    
    const response = await axios.get(
      "http://localhost:9000/api/events/code/" + cod
    );
    //console.log(response.data.events[0])
    
    if(response.data.events.length!=0)
    {
      const attendace=await axios.post('http://localhost:9000/api/attendace',{UserId:UserId,EventId:response.data.events[0].EventId,AttendanceListCreateDate:new Date()})
      
      if(attendace.data.succes){
      const eventResponse = response.data.events.map((event) => {
        let startHours = new Date(event.EventStartDate).getHours();
        let startMinutes = new Date(event.EventStartDate).getMinutes();
        let endHours = new Date(event.EventEndDate).getHours();
        let endMinutes = new Date(event.EventEndDate).getMinutes();
        return {
          eventId: event.EventId,
          eventName: event.EventName,
          eventDescription: event.EventDescription,
          eventDateStart: new Date(event.EventStartDate),
          eventDateEnd: new Date(event.EventEndDate),
          meetingOption: event.EventStatus,
          repeatOption: "Never",
          repeatDays: 1,
          accessCode: event.EventCodAccess,
          startTime:
            startHours +
            ":" +
            (startMinutes < 10 ? "0" + startMinutes : startMinutes),
          endTime:
            endHours +
            ":" +
            (endMinutes < 10 ? "0" + endMinutes : endMinutes),
        };
      });
      
      setEventData((prevEvents) => [...prevEvents, eventResponse[0]]);
      setJoinConfirm(true)
      setTimeout(()=>setJoinConfirm(false),5000)
    }
    else{
      setExistingEvent(true)
      setTimeout(()=>setExistingEvent(false),5000)
    }
    }
    else {
      setJoinError(true)
      setTimeout(()=>setJoinError(false),5000)
    }
 }
 catch (error) {
  console.error("Eroare la preluarea datelor:", error);
}}

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
     
    } catch (error) {
      console.error("Eroare la deconectare:", error);
    }
  };

  function handleClick() {
    navigate("/aboutus");
  }

  useEffect(() => {
    let email;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        email = user.email;
      }

      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:9000/api/user/email/" + email
          );
          setDate(response.data.users[0]);

          const eventResponse=await axios.get('http://localhost:9000/api/events/user/'+response.data.users[0].UserId)
          const events = eventResponse.data.events.map((event) => {
            let startHours = new Date(event.EventStartDate).getHours();
            let startMinutes = new Date(event.EventStartDate).getMinutes();
            let endHours = new Date(event.EventEndDate).getHours();
            let endMinutes = new Date(event.EventEndDate).getMinutes();
            return {
              eventId: event.EventId,
              eventName: event.EventName,
              eventDescription: event.EventDescription,
              eventDateStart: new Date(event.EventStartDate),
              eventDateEnd: new Date(event.EventEndDate),
              meetingOption: event.EventStatus,
              repeatOption: "Never",
              repeatDays: 1,
              accessCode: event.EventCodAccess,
              startTime:
                startHours +
                ":" +
                (startMinutes < 10 ? "0" + startMinutes : startMinutes),
              endTime:
                endHours +
                ":" +
                (endMinutes < 10 ? "0" + endMinutes : endMinutes),
            };
          });
          setEventData(events)
          //console.log(events)

        } catch (error) {
          console.error("Eroare la preluarea datelor:", error);
        }
      };
      fetchData();
    });
  }, []);

  const { UserFirstName, UserLastName, UserRole,UserId } = date;

  const openUserEventChooseModal = () => {
    setIsUserEventChooseOpen(true);
  };

  return (
    <div className="container">
      <div className="principal-container">
        <button className="btn-aboutus-1" onClick={handleClick}>About Us</button>
        <img className="logo" src="/logo_checkmate.png" alt="Checkmate Logo" />
        <button className="btn-signout-1" onClick={handleSignOut}>Sign out</button>
        <span className="title">
          <div className="title-description">
            <span className="title-text"> Welcome to, </span>
            <span className="title-checkmate">Checkmate</span>
          </div>
        </span>
        <div className="username">
          User: {UserFirstName} {UserLastName}
        </div>
        {joinConfirm &&<div className="d-flex mt-4  justify-content-center status text-success"> 
        <p >Join corfirmation: Event was added to the list!</p> 
        </div>}
        {joinError &&<div className="d-flex mt-4  justify-content-center status text-danger"> 
        <p >Event was not found!</p> 
        </div>}
        {existingEvent &&<div className="d-flex mt-4  justify-content-center status text-danger"> 
        <p >You already joined this event!</p> 
        </div>}
        
      </div>
     
      <div className="container-evenimente">
        <button className="green-button-1" onClick={openUserEventChooseModal}>
          Add Event
        </button>
        <UserEventChoose
          isOpen={isUserEventChooseOpen}
          onClose={() => setIsUserEventChooseOpen(false)}
          handleCod={(cod)=>{setCod(cod)
          getEventbyCode(cod)}}
        />

       
      </div>
      
      <div className="mt-3">
          {EventData.map((event, index) => (
            <div key={index} className="card mb-2 event-card">
              <div className="card-body p-2">
                <div className="row align-items-center">
                  <div className="col-2 font-weight-bold">
                    {event.eventName}
                  </div>
                  <div className="col-2 mb-2">
                    {event.eventDateStart.toDateString()}
                  </div>
                  <div className="col-2 mb-2">
                    {`${event.startTime} - ${event.endTime}`}
                  </div>
                  <div className="col-2 mb-2">
                    {event.repeatOption === "Never"
                      ? "Va avea loc o singura data"
                      : `Va avea loc zilnic ${event.repeatDays} zile`}
                  </div>
                  <div className="col-1 mb-2">{event.eventDescription}</div>
                  <div className="col-1 mb-2">
                    <span
                      className={`status ${
                        event.meetingOption === "OPEN"
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {event.meetingOption.toUpperCase()}
                    </span>
                  </div>
                 
                  {/*<div className="col-1 mb-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      
                    >
                      Șterge
                    </button>
                    </div>*/}
                  <div className="col-1 mb-2">
                    <span
                      className="status text-success"
                    >
                      JOINED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default HomeUser;
