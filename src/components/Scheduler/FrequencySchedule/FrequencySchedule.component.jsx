import React, { useState } from 'react';
import { freqSubdayTypeMinMax, freqSubdayType } from './../ScheduleLookup';

// freq_interval
// active_start_date
// active_end_date
// active_start_time
// freq_subday_interval
// freq_subday_type
// active_start_time
// active_end_time
// scheduler.freqSubdayType

const FrequencyScheduleComponent = ({ schedule, onFrequencyScheduleChange }) => {
    const [state, setState] = useState({
        active_start_date: schedule.active_start_date,
        active_end_date: schedule.active_end_date,
        occuranceChoice: schedule.occuranceChoice,
        active_start_time: schedule.active_start_time,
        freq_subday_type: schedule.freq_subday_type,
        freq_subday_interval: schedule.freq_subday_interval,
        active_end_time: schedule.active_end_time
    })

    const handleChange = e => {
        let tempState = {
            ...state,
            [e.target.name]: e.target.value
        }
        setState(tempState);
        onFrequencyScheduleChange(tempState);
    }

    return (
        <div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="form-group">
                        <div>
                            <label className="control-label font-weight-bold" for="startingDate">STARTING FROM</label>
                            <input id="startingDate" name="active_start_date" className="form-control text-uppercase" type="date"
                                value={state.active_start_date} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <div>
                            <label className="control-label font-weight-bold" for="availableUntil">AVAILABLE UNTIL</label>
                            <input id="availableUntil" name="active_end_date" className="form-control text-uppercase" type="date"
                                value={schedule.active_end_date} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 form-inline form-group">
                    <div className="form-group">
                        <label className="radio-inline control-label" for="occurOnceRadio">
                            <input id="occurOnceRadio" name="occuranceChoice" type="radio" defaultChecked
                                value={state.occuranceChoice} onChange={(e) => handleChange(e)} /><strong className="ml-2">OCCUR</strong>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="at" className="control-label ml-2 mr-2"><strong>AT</strong></label>
                        <input id="at" name="active_start_time" className="form-control text-uppercase" type="time"
                            value={state.active_start_time} onChange={(e) => handleChange(e)} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 form-inline form-group">
                    <div className="form-group">
                        <label className="radio-inline control-label" for="recurrEvery">
                            <input type="radio" name="occuranceChoice" id="recurrEvery"
                                value={state.occuranceChoice} checked={state.occuranceChoice}
                                onChange={(e) => handleChange(e)} /><strong className="ml-2 mr-2">OCCUR EVERY</strong>
                        </label>
                    </div>
                    <input type="number" id="durationNumber" className="form-control" placeholder="Duration" name="freq_subday_interval"
                        min={freqSubdayTypeMinMax.hasOwnProperty(state.freq_subday_type) ? freqSubdayTypeMinMax[state.freq_subday_type].min : 0}
                        max={freqSubdayTypeMinMax.hasOwnProperty(state.freq_subday_type) ? freqSubdayTypeMinMax[state.freq_subday_type].max : 0}
                        value={state.freq_subday_interval}
                        onChange={(e) => handleChange(e)} />

                    <select id="durationUnit" className="form-control" data-toggle="popover" data-trigger="hover" name="freq_subday_type"
                        value={state.freq_subday_type} onChange={(e) => handleChange(e)}>
                        {
                            freqSubdayType.map(i => (
                                <option key={i.key} value={i.key}>
                                    {i.value}
                                </option>))
                        }
                    </select>

                    <div className="form-group">
                        <label className="control-label ml-2 mr-2 font-weight-bold" for="startTime">STARTING TIME</label>
                        <input id="startTime" className="form-control text-uppercase" type="time" name="active_start_time"
                            value={state.active_start_time} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <label className="control-label ml-2 mr-2 font-weight-bold" for="endTime">END TIME</label>
                        <input id="endTime" className="form-control text-uppercase" type="time" name="active_end_time"
                            value={state.active_end_time} onChange={(e) => handleChange(e)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FrequencyScheduleComponent;