import React, { useState, useEffect } from 'react';
import './OneTimeOnlySchedule.style.css';
// active_start_date
// active_start_time

const OneTimeOnlyScheduleComponent = (props) => {
    const [state, setState] = useState({
        active_start_date: props.schedule.active_start_date,
        active_start_time: props.schedule.active_start_time
    });

    useEffect(() => {
        let newState = props.schedule;
        setState(newState);
    }, [props.schedule])

    const handleChange = e => {
        let name = e.target.attributes["property_name"].value;
        let value = e.target.value;
        let tempState = {
            ...state,
            [name]: value
        }

        if (name === "active_start_date") {
            tempState.active_end_date = tempState.active_start_date;
        }

        if (name === "active_start_time") {
            tempState.active_end_time = tempState.active_start_time;
        }

        setState(tempState);
        props.onComponentChange(tempState);
    }

    return (
        <div className="panel-body row">
            <div className="col-lg-6">
                <div className="form-group">
                    <div>
                        <label className="control-label font-weight-bold" htmlFor="active_start_date">START AT
                            <span am-time-ago="message.time"></span>
                        </label>
                        <input property_name="active_start_date" name="active_start_date" className="form-control text-uppercase" type="date"
                            value={state.active_start_date} onChange={e => handleChange(e)} />
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="form-group">
                    <div>
                        <label className="control-label font-weight-bold" htmlFor="active_start_time">TIME</label>
                        <input property_name="active_start_time" name="active_start_time" className="form-control text-uppercase" type="time"
                            value={state.active_start_time} onChange={e => handleChange(e)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneTimeOnlyScheduleComponent;