import React from 'react';
import './YearLongSchedule.style.css';
import { useState } from 'react';

const YearLongScheduleComponent = ({ schedule, onYearLongScheduleChange }) => {
    const [state, setState] = useState({
        ...schedule
    })

    const handleChange = (e) => {
        let tempState = {
            ...state,
            [e.target.name]: e.target.value
        };
        setState(tempState);
        onYearLongScheduleChange(tempState);
    }

    return (
        <div className="panel-body">Year long schedule</div>
    );
}

export default YearLongScheduleComponent;