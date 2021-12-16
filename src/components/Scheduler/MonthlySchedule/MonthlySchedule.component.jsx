import React, { useState, useEffect } from 'react';
import './MonthlySchedule.style.css';
import { getGetOrdinal } from './../scheduler.data';
import FrequencyScheduleComponent from './../FrequencySchedule/FrequencySchedule.component';

// freq_interval
// freq_recurrence_factor

const MonthlyScheduleComponent = props => {
    const [state, setState] = useState({
        ...props.schedule
    })

    const handleChange = e => {
        let name = e.target.attributes["property_name"].value;
        let value = e.target.value;

        let tempState = {
            ...state,
            [name]: value
        }
        propogateChange(tempState);
    };

    useEffect(() => {
        let newState = props.schedule;
        setState(newState);
    }, [props.schedule])

    const propogateChange = t => {
        setState(t);
        props.onComponentChange(t);
    }

    return (
        <div className="panel-body">
            <div className="row">
                <div className="col-lg-12">
                    <div className="form-group  form-inline">
                        <label className="control-label font-weight-bold" htmlFor="recurrEvery">{getGetOrdinal(state.freq_interval)} OF EVERY</label>
                        <label className="control-label font-weight-bold" htmlFor="recurrEvery">{state.freq_recurrence_factor} MONTH(S)</label>
                        <input id="recurrEvery" property_name="date" className="form-control text-uppercase col-lg-1 ml-1"
                            value={state.freq_interval} placeholder="DAY" type="number" min="1" max="31"
                            onChange={(e) => handleChange(e)} />
                        <input id="recurrEvery" property_name="date" className="form-control text-uppercase col-lg-2  ml-1"
                            value={state.freq_recurrence_factor} placeholder="MONTH" type="number" min="1" max="60"
                            onChange={(e) => handleChange(e)} />
                    </div>
                </div>
            </div>
            <FrequencyScheduleComponent schedule={state}
                onFrequencyScheduleChange={propogateChange}></FrequencyScheduleComponent>
        </div>
    );
}

export default MonthlyScheduleComponent;