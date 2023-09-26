import React, { useState, useEffect } from 'react';
import './WeeklySchedule.style.css';
import { freqIntervalWeekly } from './../ScheduleLookup'
import FrequencyScheduleComponent from './../FrequencySchedule/FrequencySchedule.component';

// freq_recurrence_factor 
// scheduler.freqIntervalWeekly
//const WeeklyScheduleComponent = ({ schedule, onWeeklyScheduleChange }) => {

const WeeklyScheduleComponent = (props) => {

    const [state, setState] = useState({
        ...props.schedule
    })

    useEffect(() => {
        let newState = props.schedule;
        setState(newState);
    }, [props.schedule])

    const handleChange = e => {
        let name = e.target.attributes["property_name"].value;
        let value = e.target.value;

        let tempState = {
            ...state,
            [name]: parseInt(value, 10) || value
        }
        propogateChange(tempState);
    }

    const checkboxChanged = (e) => {
        let tempState = {
            ...state
        }

        if (e.target.checked)
            tempState.freq_interval += parseInt(e.target.value, 10)
        else
            tempState.freq_interval -= parseInt(e.target.value, 10)

        propogateChange(tempState);
    }

    const propogateChange = t => {
        setState(t);
        props.onComponentChange(t);
    }

    return (
        <div className="panel-body">
            <div className="row">
                <div className="col-lg-12">
                    <div className="form-group">
                        <div>
                            <label className="control-label font-weight-bold" htmlFor="recurrEveryWeek">RECURS EVERY {state.freq_recurrence_factor} WEEK(S)</label>
                            <input id="recurrEveryWeek" property_name="freq_recurrence_factor" className="form-control text-uppercase" value={state.freq_recurrence_factor}
                                placeholder="WEEK(S)" type="number" min="1" max="100"
                                onChange={e => handleChange(e)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="form-group form-inline ml-3">
                    <strong>ON</strong>
                    <div className="form-inline ml-2">
                        {
                            freqIntervalWeekly.map((f, index) => {
                                return (<div className="form-inline ml-4" key={"divFreqIntervalWeekly" + f.key}>
                                    <input id={"cboxFreqIntervalWeekly" + f.key} type="checkbox" value={f.key} onClick={e => checkboxChanged(e)} />
                                    <label className="ml-2" htmlFor={"cboxFreqIntervalWeekly" + f.key}>
                                        {f.value}
                                    </label>
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <FrequencyScheduleComponent schedule={state} onFrequencyScheduleChange={propogateChange}></FrequencyScheduleComponent>
        </div >
    );
}

export default WeeklyScheduleComponent;