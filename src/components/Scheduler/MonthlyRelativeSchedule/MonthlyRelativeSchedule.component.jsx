import React, { useState, useEffect } from 'react';
import './MonthlyRelativeSchedule.style.css';
import FrequencyScheduleComponent from './../FrequencySchedule/FrequencySchedule.component';
import { freqIntervalMonthlyRelative, freqRelativeInterval } from './../ScheduleLookup';

// freq_relative_interval
// freq_interval
// scheduler.freqRelativeInterval
// scheduler.freqIntervalMonthlyRelative

const MonthlyRelativeScheduleComponent = (props) => {
    const [state, setState] = useState({
        ...props.schedule
    });

    const handleChange = e => {
        let name = e.target.attributes["property_name"].value;
        let value = e.target.value;

        let tempState = {
            ...state,
            [name]: parseInt(value, 10) || value
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
                    <div className="form-group form-inline">
                        <select className="form-control mr-1" data-toggle="popover" data-trigger="hover" property_name="freq_relative_interval"
                            value={state.freq_relative_interval} onChange={(e) => handleChange(e)}>
                            {
                                freqRelativeInterval.map(f => (
                                    <option key={"dropfreqRelativeInterval" + f.key} value={f.key}>
                                        {f.value}
                                    </option>))
                            }
                        </select>
                        <select className="form-control mx-1" data-toggle="popover" data-trigger="hover" property_name="freq_interval"
                            value={state.freq_interval} onChange={(e) => handleChange(e)}>
                            {
                                freqIntervalMonthlyRelative.map(g => (
                                    <option key={"dropfreqIntervalMonthlyRelative" + g.key} value={g.key}>
                                        {g.value}
                                    </option>))
                            }
                        </select>
                        <label className="control-label font-weight-bold mx-1" htmlFor="recurrEvery">OF EVERY</label>
                        <input id="recurrEvery" property_name="freq_recurrence_factor" className="form-control text-uppercase mx-1"
                            value={state.freq_recurrence_factor} placeholder="MONTH" type="number" min="1" max="60"
                            onChange={(e) => handleChange(e)}
                        />
                        <label className="control-label font-weight-bold" htmlFor="recurrEvery">MONTH(S)</label>
                    </div>
                </div>
            </div>
            <FrequencyScheduleComponent schedule={state} onFrequencyScheduleChange={propogateChange}></FrequencyScheduleComponent>
        </div>
    )
}

export default MonthlyRelativeScheduleComponent;