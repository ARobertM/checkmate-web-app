import React, {useState, forwardRef} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './AddEventStyle.css';



function AddEvent(props) {
    const [startDate, setStartDate] = useState(new Date()); // data eventtt
    const [startTime, setStartTime] = useState(""); // ora start
    const [endTime, setEndTime] = useState(""); // ora final
    const [repeatDays, setRepeatDays] = useState(0);
    const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(""); 
    const [repeatOption, setRepeatOption] = useState("Never");




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
    
    return (
        <div className="add-event-container">
             <button className="close-button" onClick={props.onClose}>X</button> 
           
            <div className="add-event-header">
                Adaugă o întâlnire:
            </div>
            <div className="add-event-body">
            <div className="add-event-attendees">
                    Nume eveniment:
                    <input type="text" placeholder="Introduceți numele evenimentului:" />
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
                    Întâlnirea ta va avea loc timp de {repeatOption === "Never" ? 1 : repeatDays } zile, de la ora: {startTime} la {endTime}.
                    </div>

                <div className="add-event-attendees">
                    Descriere eveniment:
                    <input type="text" placeholder="Topice eveniment:" />
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
                                Public
                            </label>
                            <label>
                            <input
                            type="radio"
                            name="meetingOption"
                            value="Closed"
                            checked={selectedOption === "Closed"}
                            onChange={() => setSelectedOption("Closed")}
                            />
                            Private
                        </label>
                        </div>
                        )}
          <div className="add-event-buttons">
                <button>Save</button>
                    </div>
                </div>

            </div>
            
        </div>
        
    );
}




export default AddEvent;