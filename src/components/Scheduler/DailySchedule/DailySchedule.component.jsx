import React, { useState } from 'react';
import FrequencyScheduleComponent from './../FrequencySchedule/FrequencySchedule.component';

// freq_interval 
const DailyScheduleComponent = ({ schedule, onDailyScheduleChange }) => {
    const [state, setState] = useState({
        ...schedule
    });

    const onFrequencyScheduleChangeHandler = e => {
        let tempState = {
            ...state,
            ...e
        };
        setState(tempState);
        onDailyScheduleChange(tempState);
    }

    const handleChange = (e) => {
        let tempState = {
            ...state,
            [e.target.name]: e.target.value
        };
        setState(tempState);
        onDailyScheduleChange(tempState);
    }

    return (
        <div className="panel-body">
            <div className="row">
                <div className="col-lg-12">
                    <div className="form-group">
                        <div>
                            <label className="control-label font-weight-bold" htmlFor="recurrEvery">RECURS EVERY {state.freq_interval} DAYS</label>
                            <input id="recurrEvery" className="form-control text-uppercase"
                                placeholder="DAY(S)" type="number" min="1" max="100" name="freq_interval"
                                value={state.freq_interval} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                </div>
            </div>
            <FrequencyScheduleComponent schedule={schedule}
                onFrequencyScheduleChange={onFrequencyScheduleChangeHandler} />
        </div>
    )
}

export default DailyScheduleComponent;