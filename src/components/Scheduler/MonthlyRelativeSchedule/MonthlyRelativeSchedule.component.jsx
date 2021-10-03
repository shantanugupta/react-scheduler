import React from 'react';
import './MonthlyRelativeSchedule.styles.css';
import FrequencyScheduleComponent from './../FrequencySchedule/FrequencySchedule.component';

// freq_relative_interval
// freq_interval
// scheduler.freqRelativeInterval
// scheduler.freqIntervalMonthlyRelative

export default class MonthlyRelativeScheduleComponent extends React.Component {
    constructor(props) {
        this.state = {
            schedule: this.props.schedule,
            occuranceChoice: this.props.occuranceChoice
        }
    }
    render() {
        const { schedule } = this.state.schedule;
        const { occuranceChoice } = this.state.occuranceChoice;

        return (
            <div className="panel-body">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-group form-inline">
                            <div>
                                <select id="durationUnit" className="form-control" data-toggle="popover" data-trigger="hover"
                                    value={schedule.freq_relative_interval}>
                                    {
                                        scheduler.freqRelativeInterval.map(f => (
                                            <option key={f.key} value={f.value}>
                                                {f.value}
                                            </option>))
                                    }
                                </select>
                                <select id="durationUnit" className="form-control" data-toggle="popover" data-trigger="hover"
                                    value={schedule.freq_interval}>
                                    {
                                        scheduler.freqIntervalMonthlyRelative.map(g => (
                                            <option key={g.key} value={g.value}>
                                                {g.value}
                                            </option>))
                                    }
                                </select>
                                <label className="control-label font-weight-bold" for="recurrEvery">OF EVERY</label>
                                <input id="recurrEvery" name="date" className="form-control text-uppercase"
                                    value={schedule.freq_recurrence_factor} placeholder="MONTH" type="number" min="1" max="60" />
                                <label className="control-label font-weight-bold" for="recurrEvery">MONTH(S)</label>
                            </div>
                        </div>
                    </div>
                </div>
                <FrequencyScheduleComponent schedule={schedule} occuranceChoice={occuranceChoice}></FrequencyScheduleComponent>
            </div>
        )
    }
}