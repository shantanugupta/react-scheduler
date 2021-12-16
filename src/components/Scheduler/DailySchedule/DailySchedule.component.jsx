import React, { useState, useEffect } from 'react';
import FrequencyScheduleComponent from './../FrequencySchedule/FrequencySchedule.component';

// freq_interval 
const DailyScheduleComponent = (props) => {
    const [state, setState] = useState({
        ...props.schedule
    });

    const onFrequencyScheduleChangeHandler = e => {
        let tempState = {
            ...state,
            ...e
        };
        setState(tempState);
        props.onComponentChange(tempState);
    }

    useEffect(() => {
        let newState = props.schedule;
        setState(newState);
    }, [props.schedule])

    const handleChange = (e) => {
        let name = e.target.attributes["property_name"].value;
        let value = e.target.value;

        let tempState = {
            ...state,
            [name]: value
        };
        setState(tempState);
        props.onComponentChange(tempState);
    }

    return (
        <div className="panel-body">
            <div className="row">
                <div className="col-lg-12">
                    <div className="form-group">
                        <div>
                            <label className="control-label font-weight-bold" htmlFor="recurrEvery">RECURS EVERY {state.freq_interval} DAYS</label>
                            <input id="recurrEvery" className="form-control text-uppercase"
                                placeholder="DAY(S)" type="number" min="1" max="100" property_name="freq_interval"
                                value={state.freq_interval} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                </div>
            </div>
            <FrequencyScheduleComponent schedule={props.schedule}
                onFrequencyScheduleChange={onFrequencyScheduleChangeHandler} />
        </div>
    )
}

export default DailyScheduleComponent;