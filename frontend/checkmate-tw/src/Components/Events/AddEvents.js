import React, {useState, forwardRef} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './AddEventStyle.css';



function AddEvent() {
    const [startDate, setStartDate] = useState(new Date()); // data eventtt
    const [startTime, setStartTime] = useState(""); // ora start
    const [endTime, setEndTime] = useState(""); // ora final
    const [repeatDays, setRepeatDays] = useState(0);

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="custom-input" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

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
            <div className="add-event-header">
                Adauga o întâlnire:
            </div>
            <div className="add-event-body">
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
                            onChange={(e) => setStartTime(e.target.value)}
                        />{" "}
                        PM to{" "}
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />{" "}
                        PM
                    </div>
                    <div className="add-event-duration">
                        {calculateDuration()}
                    </div>

                </div>
                <div className="add-event-repeat">
                    Repeat
                    <select>
                        <option>Never</option>
                        <option>Daily</option>s
                    </select>
                       every
                    <input type="number" min="0"
                    value={repeatDays}
                    onChange={(e) => setRepeatDays(e.target.value)} defaultValue="0" /> day(s)
                </div>
             
                <div className="add-event-notice">
                    Întâlnirea ta va avea loc timp de {repeatDays} de la: {startTime}.
                </div>
                <div className="add-event-attendees">
                    Attendees
                    <input type="text" placeholder="Email or name" />
                </div>
                <div className="add-event-chat">
                    <label>
                        <input type="checkbox" />
                        Enable Continuous Meeting Chat
                    </label>
                </div>
                <div className="add-event-actions">
                    <button>More Options</button>
                    <button>Save</button>
                </div>
            </div>
        </div>
    );
}




export default AddEvent;