import React, { useState, useEffect } from 'react';
import { freqSubdayTypeMinMax, freqSubdayType } from './../ScheduleLookup';

const FrequencyScheduleComponent = props => {
    const [state, setState] = useState({
        ...props.schedule
    })

    useEffect(() => {
        let newState = props.schedule;
        setState(newState);
    }, [props.schedule])

    const handleChange = e => {
        let name = e.target.name;
        let value = NaN;
        let tempState = {
            ...state
        }

        if (name.startsWith("active") === true) {
            value = e.target.value
        }
        else if (name === "occurance_choice_state") {
            value = e.target.value === 'true' ? true : e.target.value === 'false' ? false : undefined;
            resetOccuranceData(value, tempState)
        }
        else {
            value = parseInt(e.target.value, 10) || e.target.value;
        }

        tempState[name] = value;

        if (name === "freq_subday_type") {
            if (tempState.freq_subday_type === 2 && tempState.freq_subday_interval > 24) {
                tempState.freq_subday_interval = 24;
            } else if (tempState.freq_subday_type === 1) {
                tempState.freq_subday_interval = 0;
            }
        }

        setState(tempState);
        props.onFrequencyScheduleChange(tempState);
    }

    const resetOccuranceData = (isOccurAt, tempState) => {
        if (isOccurAt === undefined) {
            tempState.occurance_choice_state = undefined;
            tempState.freq_subday_interval = 0;
            tempState.freq_subday_type = 1;
            tempState.active_start_time = undefined;
            tempState.active_end_time = undefined;
        }
        else if (isOccurAt === true) {
            tempState.freq_subday_interval = 0;
            tempState.freq_subday_type = 1;
            tempState.active_end_time = undefined;
        } else if (isOccurAt === false) {
            //reset nothing
        }
    }

    const getFreqSubdayInterval = (key, value, freq_subday_interval) => {
        let description = '';

        if (key === 1) {
            description = value;
        } else {
            if (key === 2 && freq_subday_interval > 24) {
                description = 24 + " " + value
            }
            else {
                description = freq_subday_interval + " " + value
            }
        }

        return description;
    }

    return (
        <div>
            {/* STARTING FROM - AVAILABLE UNTIL */}
            <div className="row">
                <div className="col-lg-6">
                    <div className="form-group">
                        <div>
                            <label className="control-label font-weight-bold" htmlFor="startingDate">STARTING FROM</label>
                            <input id="startingDate" name="active_start_date" className="form-control text-uppercase" type="date"
                                value={state.active_start_date} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <div>
                            <label className="control-label font-weight-bold" htmlFor="availableUntil">AVAILABLE UNTIL</label>
                            <input id="availableUntil" name="active_end_date" className="form-control text-uppercase" type="date"
                                value={state.active_end_date} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                </div>
            </div>
            {/* OCCURS AT CODE */}
            <div className="row">
                <div className="col-lg-12 form-inline form-group">
                    <div className="form-group">
                        <label className="radio-inline control-label">
                            <input id="occurOnceRadio" name="occurance_choice_state" type="radio"
                                value="true" onChange={(e) => handleChange(e)} /><strong className="ml-2" htmlFor="occurOnceRadio">OCCUR AT</strong>
                        </label>
                    </div>
                    <div className={"form-group " + ([false, undefined].includes(state.occurance_choice_state) ? "d-none" : "")}>
                        <label htmlFor="at" className="control-label ml-2 mr-2"></label>
                        <input id="at" name="active_start_time" className="form-control text-uppercase" type="time"
                            value={state.active_start_time} onChange={(e) => handleChange(e)} />
                    </div>
                </div>
            </div>
            {/* OCCURS EVERY CODE */}
            <div className="row">
                <div className="col-lg-12 form-inline form-group">
                    {/* OCCURS EVERY RADIO */}
                    <div className="form-group">
                        <label className="radio-inline control-label" >
                            <input id="occurEveryRadio" name="occurance_choice_state" type="radio"
                                value="false" onChange={(e) => handleChange(e)} />
                            <strong className="ml-2 mr-2" htmlFor="occurEveryRadio">OCCUR EVERY</strong>
                        </label>
                    </div>
                    {/* DURATION NUMBER */}
                    <div className={"form-inline " + ([true, undefined].includes(state.occurance_choice_state) ? "d-none" : "")}>
                        <input type="range" id="durationNumber" className="form-range col-lg-2" placeholder="Duration" name="freq_subday_interval"
                            min={freqSubdayTypeMinMax.hasOwnProperty(state.freq_subday_type) ? freqSubdayTypeMinMax[state.freq_subday_type].min : 0}
                            max={freqSubdayTypeMinMax.hasOwnProperty(state.freq_subday_type) ? freqSubdayTypeMinMax[state.freq_subday_type].max : 0}
                            value={state.freq_subday_interval}
                            onChange={(e) => handleChange(e)} />
                        {/* DURATION UNIT DROPDOWN */}
                        <select id="durationUnit" className="form-control  ml-2" data-toggle="popover" data-trigger="hover" name="freq_subday_type"
                            value={state.freq_subday_type} onChange={(e) => handleChange(e)}>
                            {
                                freqSubdayType.map(i => (
                                    <option key={i.key} value={i.key}>
                                        {getFreqSubdayInterval(i.key, i.value, state.freq_subday_interval)}
                                    </option>))
                            }
                        </select>
                        {/* STARTING TIME */}
                        <div className="form-group">
                            <label className="control-label ml-2 mr-2 font-weight-bold" htmlFor="startTime">STARTING TIME</label>
                            <input id="startTime" className="form-control text-uppercase" type="time" name="active_start_time"
                                value={state.active_start_time} onChange={(e) => handleChange(e)} />
                        </div>
                        {/* END TIME */}
                        <div className="form-group">
                            <label className="control-label ml-2 mr-2 font-weight-bold" htmlFor="endTime">END TIME</label>
                            <input id="endTime" className="form-control text-uppercase" type="time" name="active_end_time"
                                value={state.active_end_time} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FrequencyScheduleComponent;