import React from 'react';
import './WeeklySchedule.style.css';
import FrequencyScheduleComponent from './../FrequencySchedule/FrequencySchedule.component';
// freq_recurrence_factor 
// scheduler.freqIntervalWeekly
export default class WeeklyScheduleComponent extends React.Component {
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
                        <div className="form-group">
                            <div>
                                <label className="control-label" for="recurrEvery">RECURS EVERY {schedule.freq_recurrence_factor} WEEK(S)</label>
                                <input id="recurrEvery" name="date" className="form-control text-uppercase" value={schedule.freq_recurrence_factor}
                                    placeholder="WEEK(S)" type="number" min="1" max="100" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-group form-inline">
                            <strong>ON</strong>
                            <div className="checkbox-inline">
                                {
                                    scheduler.freqIntervalWeekly.map(f => {
                                        <label className="checkbox-inline">
                                            <input type="checkbox" value={f.key}
                                                onClick={checkboxChanged(f.key, $index)}>{f.value}
                                            </input>
                                        </label>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <FrequencyScheduleComponent schedule={schedule} occuranceChoice={occuranceChoice}></FrequencyScheduleComponent>
            </div>
        )
    }
}