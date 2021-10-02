import React from 'react';
import './MonthlySchedule.styles.css';
import FrequencyScheduleComponent from './../FrequencySchedule/FrequencySchedule.component';
// freq_interval
// freq_recurrence_factor

export default class MonthlyScheduleComponent extends React.Component {
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
                                <label className="control-label" for="recurrEvery">{getGetOrdinal(schedule.freq_interval)} OF EVERY</label>
                                <label className="control-label" for="recurrEvery">{schedule.freq_recurrence_factor} MONTH(S)</label>
                                <input id="recurrEvery" name="date" className="form-control text-uppercase" value={schedule.freq_interval} placeholder="DAY" type="number" min="1" max="31" />
                                <input id="recurrEvery" name="date" className="form-control text-uppercase" value={schedule.freq_recurrence_factor} placeholder="MONTH" type="number" min="1" max="60" />
                            </div>
                        </div>
                    </div>
                </div>
                <FrequencyScheduleComponent schedule={schedule} occuranceChoice={occuranceChoice}></FrequencyScheduleComponent>
            </div>
        )
    }
}