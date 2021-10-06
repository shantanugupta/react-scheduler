import React from 'react';
import './MonthlyRelativeSchedule.style.css';
import FrequencyScheduleComponent from './../FrequencySchedule/FrequencySchedule.component';
import { useState } from 'react';
import { freqIntervalMonthlyRelative, freqRelativeInterval } from './../ScheduleLookup';

// freq_relative_interval
// freq_interval
// scheduler.freqRelativeInterval
// scheduler.freqIntervalMonthlyRelative

const MonthlyRelativeScheduleComponent = ({ schedule, onMonthlyRelativeScheduleChange }) => {
    const [state, setState] = useState({
        ...schedule
    });

    const handleChange = e => {
        let tempState = {
            ...state,
            [e.target.name]: e.target.value
        }

        propogateChange(tempState);
    };

    const propogateChange = t => {
        setState(t);
        onMonthlyRelativeScheduleChange(t);
    }

    return (
        <div className="panel-body">
            <div className="row">
                <div className="col-lg-12">
                    <div className="form-group form-inline">
                        <div>
                            <select id="durationUnit" className="form-control" data-toggle="popover" data-trigger="hover"
                                value={state.freq_relative_interval}>
                                {
                                    freqRelativeInterval.map(f => (
                                        <option key={f.key} value={f.value}>
                                            {f.value}
                                        </option>))
                                }
                            </select>
                            <select id="durationUnit" className="form-control" data-toggle="popover" data-trigger="hover"
                                value={state.freq_interval}>
                                {
                                    freqIntervalMonthlyRelative.map(g => (
                                        <option key={g.key} value={g.value}>
                                            {g.value}
                                        </option>))
                                }
                            </select>
                            <label className="control-label font-weight-bold" htmlFor="recurrEvery">OF EVERY</label>
                            <input id="recurrEvery" name="freq_recurrence_factor" className="form-control text-uppercase"
                                value={state.freq_recurrence_factor} placeholder="MONTH" type="number" min="1" max="60"
                                onChange={(e) => handleChange(e)}
                            />
                            <label className="control-label font-weight-bold" htmlFor="recurrEvery">MONTH(S)</label>
                        </div>
                    </div>
                </div>
            </div>
            <FrequencyScheduleComponent schedule={state} onFrequencyScheduleChange={propogateChange}></FrequencyScheduleComponent>
        </div>
    )
}

export default MonthlyRelativeScheduleComponent;