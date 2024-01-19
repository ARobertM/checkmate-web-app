import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddEventStyle.css";
import { reauthenticateWithCredential } from "firebase/auth";
import axios from "axios";

function AddEvent(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState("10:00"); // Valoarea implicită pentru ora de start
  const [endTime, setEndTime] = useState("12:00"); // Valoarea implicită pentru ora de sfârșit
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [repeatDays, setRepeatDays] = useState(0);
  const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("CLOSED");
  const [repeatOption, setRepeatOption] = useState("Never");
  const [accessCode, setAccessCode] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [showQRCodeModal, setShowQRCodeModal] = useState(false);
  const [qrCodeText, setQrCodeText] = useState("");

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  const toggleMoreOptions = () => {
    setMoreOptionsOpen(!moreOptionsOpen);
  };

  const calculateDuration = () => {
    if (startTime && endTime) {
      const start = new Date(`January 13, 2023 ${startTime}`);
      const end = new Date(`January 13, 2023 ${endTime}`);
      const durationInMinutes = (end - start) / (1000 * 60);
      const hours = Math.floor(durationInMinutes / 60);
      const minutes = durationInMinutes % 60;
      let formattedDuration = "";
      if (hours > 0) {
        formattedDuration += hours + "h";
      }
      if (minutes >= 0) {
        formattedDuration += minutes + "m";
      }
      return formattedDuration;
    }
    return "";
  };

  const formatTime = (date) =>
    date.toLocaleTimeString([], { timeStyle: "short" });

  const handleSave = (e) => {
    e.preventDefault();
    const eventDateStart = startDate;
    let eventDateEnd = new Date(startDate);
    if (endTime) {
      const [hours, minutes] = endTime.split(":");
      eventDateEnd.setHours(parseInt(hours));
      eventDateEnd.setMinutes(parseInt(minutes));
    }
    if (startTime) {
      const [hours, minutes] = startTime.split(":");
      eventDateStart.setHours(parseInt(hours));
      eventDateStart.setMinutes(parseInt(minutes));
    }

    const eventData = {
      eventName: eventName,
      eventDateStart: eventDateStart,
      eventDateEnd: eventDateEnd,
      startTime: startTime,
      endTime: endTime,
      eventDescription: eventDescription,
      meetingOption: selectedOption,
      repeatOption: repeatOption,
      repeatDays: repeatOption === "Daily" ? repeatDays : 1,
      accessCode: accessCode,
    };
    props.onSave(eventData);
  };

  return (
    <div className="add-event-container">
      <button className="close-button" onClick={props.onClose}>
        X
      </button>

      <div className="add-event-header">Adaugă o întâlnire:</div>
      <form onSubmit={handleSave}>
        <div className="add-event-body">
          <div className="add-event-attendees">
            <input
              type="text"
              placeholder="Introduceți numele evenimentului:"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <div className="add-event-row">
            <div className="add-event-time ">
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  if (date >= new Date()) setStartDate(date);
                  else {
                    setErrorMessage("Event cannot start in the past!");
                    setStartDate(new Date());
                    setTimeout(() => setErrorMessage(""), 4000);
                  }
                }}
                customInput={
                  <CustomInput ref={(ref) => (this.customInput = ref)} />
                }
                dateFormat="EEE, MMMM d"
              />
              <input
                type="time"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  setEndTime(e.target.value);
                }}
              />{" "}
              to{" "}
              <input
                type="time"
                value={endTime}
                onChange={(e) => {
                  if (startTime < e.target.value) {
                    setEndTime(e.target.value);
                  } else {
                    setErrorMessage("End date cannot be before start date!");
                    setTimeout(() => setErrorMessage(""), 4000);
                  }
                }}
              />{" "}
            </div>

            <div className="add-event-duration">{calculateDuration()}</div>
          </div>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          <div className="add-event-repeat m-3">
            Repeat
            <select
              value={repeatOption}
              onChange={(e) => setRepeatOption(e.target.value)}
            >
              <option value="Never">Never</option>
              <option value="Daily">Daily</option>
            </select>
            {repeatOption === "Daily" && (
              <div>
                every
                <input
                  type="number"
                  min="0"
                  value={repeatDays}
                  onChange={(e) => setRepeatDays(e.target.value)}
                />{" "}
                day(s)
              </div>
            )}
          </div>
          <div className="add-event-notice">
            Întâlnirea ta va avea loc timp de{" "}
            {repeatOption === "Never" ? 1 : repeatDays} zile, de la ora:{" "}
            {startTime} la {endTime}.
          </div>
          <div className="add-event-cod-acces">
            <label>Cod acces:</label>
            <input
              type="text"
              placeholder="Acces code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              required
            />
          </div>
          <div className="add-event-attendees">
            <input
              type="text"
              placeholder="Descriere eveniment:"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </div>
          <div className="add-event-actions">
            <button type="button" onClick={toggleMoreOptions}>
              More Options
            </button>
            {moreOptionsOpen && (
              <div className="more-options">
                <label>
                  <input
                    type="radio"
                    name="meetingOption"
                    value="OPEN"
                    checked={selectedOption === "OPEN"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  Open
                </label>
                <label>
                  <input
                    type="radio"
                    name="meetingOption"
                    value="CLOSED"
                    checked={selectedOption === "CLOSED"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  Closed
                </label>
              </div>
            )}
            <div className="add-event-buttons">
              <button type="submit">Save</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddEvent;
