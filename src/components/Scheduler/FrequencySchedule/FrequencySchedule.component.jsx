import React, { useState } from 'react';
import { freqSubdayTypeMinMax, freqSubdayType } from './../ScheduleLookup';

const FrequencyScheduleComponent = ({ schedule, onFrequencyScheduleChange }) => {
    const [state, setState] = useState({
        ...schedule
    })

    const [occuranceChoiceState, setOccuranceChoiceState] = useState({
        occuranceChoiceState: state.occuranceChoice
    })

    const occuranceChoiceChange = e => {
        let t = {
            [e.target.name]: e.target.value
        }
        setOccuranceChoiceState(t)
    }

    const handleChange = e => {
        let name = e.target.name;
        let value = NaN;

        if (name.startsWith("active")) {
            value = e.target.value
        }
        else
            value = parseInt(e.target.value, 10) || e.target.value;

        let tempState = {
            ...state,
            [name]: value
        }
        setState(tempState);
        onFrequencyScheduleChange(tempState);
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
                                value={schedule.active_end_date} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                </div>
            </div>
            {/* OCCURS AT CODE */}
            <div className="row">
                <div className="col-lg-12 form-inline form-group">
                    <div className="form-group">
                        <label className="radio-inline control-label" htmlFor="occurOnceRadio">
                            <input id="occurOnceRadio" name="occuranceChoiceState" type="radio" defaultChecked
                                value={occuranceChoiceState} onChange={(e) => occuranceChoiceChange(e)} /><strong className="ml-2">OCCUR</strong>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="at" className="control-label ml-2 mr-2"><strong>AT</strong></label>
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
                        <label className="radio-inline control-label" htmlFor="recurrEvery">
                            <input type="radio" name="occuranceChoiceState" id="recurrEvery"
                                value={occuranceChoiceState} checked={occuranceChoiceState}
                                onChange={(e) => occuranceChoiceChange(e)} />
                            <strong className="ml-2 mr-2" htmlFor="recurrEvery">OCCUR EVERY</strong>
                        </label>
                    </div>
                    {/* DURATION NUMBER */}
                    <input type="number" id="durationNumber" className="form-control col-lg-2" placeholder="Duration" name="freq_subday_interval"
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
                                    {i.value}
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
    )
}

export default FrequencyScheduleComponent;