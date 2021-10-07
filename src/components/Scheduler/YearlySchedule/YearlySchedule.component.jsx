import React from 'react';
import './YearlySchedule.style.css';
// import { useState } from 'react';

const YearlyScheduleComponent = ({ schedule, onYearlyScheduleChange }) => {
    // const [state, setState] = useState({
    //     ...schedule
    // })

    // const handleChange = (e) => {
    //     let tempState = {
    //         ...state,
    //         [e.target.name]: e.target.value
    //     };
    //     setState(tempState);
    //     onYearlyScheduleChange(tempState);
    // }

    return (
        <div className="panel-body">Yearly schedule</div>
    );
}

export default YearlyScheduleComponent;