import React, { useState } from 'react';
import './OneTimeOnlySchedule.style.css';
// active_start_date
// active_start_time

const OneTimeOnlyScheduleComponent = ({ schedule, onOneTimeOnlyScheduleChange }) => {
    const [state, setState] = useState({
        active_start_date: schedule.active_start_date,
        active_start_time: schedule.active_start_time
    });

    const handleChange = e => {
        let tempState = {
            ...state,
            [e.target.name]: e.target.value
        }
        setState(tempState);
        onOneTimeOnlyScheduleChange(tempState);
    }

    return (
        <div className="panel-body">
            <div className="col-lg-6">
                <div className="form-group">
                    <div>
                        <label className="control-label" for="active_start_date">START AT
                        <span am-time-ago="message.time"></span>
                        </label>
                        <input name="active_start_date" className="form-control text-uppercase" type="date"
                            value={state.active_start_date} onChange={e => handleChange(e)} />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <div>

                            <label className="control-label" for="active_start_time">TIME</label>
                            <input name="active_start_time" className="form-control text-uppercase" type="time"
                                value={state.active_start_time} onChange={e => handleChange(e)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneTimeOnlyScheduleComponent;