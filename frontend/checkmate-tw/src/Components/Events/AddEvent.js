import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './AddEventStyle.css';
import { reauthenticateWithCredential } from 'firebase/auth';



function AddEvent(props) {
    const [startDate, setStartDate] = useState(new Date()); // data eventtt
    const [startTime, setStartTime] = useState(""); // ora start
    const [endTime, setEndTime] = useState(""); // ora final
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [repeatDays, setRepeatDays] = useState(0);
    const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [repeatOption, setRepeatOption] = useState("Never");
    const [eventData, setEventData] = useState({ eventName: '', eventDate: '', startTime: '', endTime: '' });
    const [accessCode, setAccessCode] = useState(""); // Starea pentru codul de acces



    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="custom-input" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    const toggleMoreOptions = () => {
        setMoreOptionsOpen(!moreOptionsOpen);
    }

    const calculateDuration = () => {
        if (startTime && endTime) {
            const start = new Date(`January 13, 2023 ${startTime}`);
            const end = new Date(`January 13, 2023 ${endTime}`);
            const durationInMinutes = (end - start) / (1000 * 60);

            //un calcul rapid la ore si minute
            const hours = Math.floor(durationInMinutes / 60);
            const minutes = durationInMinutes % 60;

            // facem de tipul 3h40
            let formattedDuration = "";
            if (hours > 0) {
                formattedDuration += hours + "h";
            }
            if (minutes > 0) {
                formattedDuration += minutes + "m";
            }

            return formattedDuration;
        }
        return "";
    };

    const formatTime = (date) => date.toLocaleTimeString([], { timeStyle: 'short' });
    const handleSave = () => {
        const eventDateStart = startDate;
        let eventDateEnd = new Date(startDate);
        if (endTime) {
            const [hours, minutes] = endTime.split(':');
            eventDateEnd.setHours(hours);
            eventDateEnd.setMinutes(minutes);
        }

        const eventData = {
            eventName: eventName,
            eventDateStart: eventDateStart.toDateString(),
            eventDateEnd: eventDateEnd.toDateString(),
            startTime: startTime, 
            endTime: endTime,     
            eventDescription: eventDescription,
            meetingOption: selectedOption,
            repeatOption: repeatOption,
            repeatDays: repeatOption === "Daily" ? repeatDays : 1
        };
        props.onSave(eventData);
    };

    return (
        <div className="add-event-container">
            <button className="close-button" onClick={props.onClose}>X</button>

            <div className="add-event-header">
                Adaugă o întâlnire:
            </div>
            <div className="add-event-body">
                <div className="add-event-attendees">
                    <input
                        type="text"
                        placeholder="Introduceți numele evenimentului:"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                </div>
                <div className="add-event-row">

                    <div className="add-event-time">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            customInput={<CustomInput ref={ref => this.customInput = ref} />}
                            dateFormat="EEE, MMMM d"
                        />
                        <input
                            type="time"
                            value={startTime}
                            defaultValue="10:00"
                            onChange={(e) => setStartTime(e.target.value)}
                        />{" "}
                        to{" "}
                        <input
                            type="time"
                            value={endTime}
                            defaultValue="12:00"
                            onChange={(e) => setEndTime(e.target.value)}
                        />{" "}

                    </div>
                    <div className="add-event-duration">
                        {calculateDuration()}
                    </div>

                </div>
                <div className="add-event-repeat">
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
                                defaultValue="0"
                            />{" "}
                            day(s)
                        </div>
                    )}


                </div>


                <div className="add-event-notice">
                    Întâlnirea ta va avea loc timp de {repeatOption === "Never" ? 1 : repeatDays} zile, de la ora: {startTime} la {endTime}.
                </div>

                <div className="add-event-cod-acces">
                    <label>Cod acces:</label>
                    <input
                        type="text"
                        placeholder="everything"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
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
                    <button onClick={toggleMoreOptions}>More Options</button>
                    {moreOptionsOpen && (
                        <div className="more-options">
                            <label>
                                <input
                                    type="radio"
                                    name="meetingOption"
                                    value="Open"
                                    checked={selectedOption === "Open"}
                                    onChange={() => setSelectedOption("Open")}
                                />
                                Open
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="meetingOption"
                                    value="Closed"
                                    checked={selectedOption === "Closed"}
                                    onChange={() => setSelectedOption("Closed")}
                                />
                                Closed
                            </label>
                        </div>
                    )}
                    <div className="add-event-buttons">
                        <button onClick={handleSave}>Save</button>
                    </div>
                </div>

            </div>

        </div>

    );
}




export default AddEvent;