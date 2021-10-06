import React from 'react';
import './MonthlySchedule.style.css';
import { getGetOrdinal } from './../scheduler.data';
import FrequencyScheduleComponent from './../FrequencySchedule/FrequencySchedule.component';
import { useState } from 'react';

// freq_interval
// freq_recurrence_factor

const MonthlyScheduleComponent = (schedule, onMonthlyScheduleChange) => {
    const [state, setState] = useState({
        ...schedule
    })

    const handleChange = e => {
        let tempState = {
            ...state,
            [e.target.name]: e.target.value
        }
        propogateChange(tempState);
    };

    const propogateChange = t => {
        setState(t);
        onMonthlyScheduleChange(t);
    }

    return (
        <div className="panel-body">
            <div className="row">
                <div className="col-lg-12">
                    <div className="form-group form-inline">
                        <div>
                            <label className="control-label font-weight-bold" htmlFor="recurrEvery">{getGetOrdinal(state.freq_interval)} OF EVERY</label>
                            <label className="control-label font-weight-bold" htmlFor="recurrEvery">{state.freq_recurrence_factor} MONTH(S)</label>
                            <input id="recurrEvery" name="date" className="form-control text-uppercase"
                                value={state.freq_interval} placeholder="DAY" type="number" min="1" max="31"
                                onChange={(e) => handleChange(e)} />
                            <input id="recurrEvery" name="date" className="form-control text-uppercase"
                                value={state.freq_recurrence_factor} placeholder="MONTH" type="number" min="1" max="60"
                                onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                </div>
            </div>
            <FrequencyScheduleComponent schedule={state}
                onFrequencyScheduleChange={propogateChange}></FrequencyScheduleComponent>
        </div>
    );
}

export default MonthlyScheduleComponent;