import React from 'react';
import './YearLongSchedule.style.css';

export default class YearLongScheduleComponent extends React.Component {
    constructor(props) {
        this.state = { schedule: this.props.schedule }
    }

    render() {
        const { schedule } = this.state.schedule;
        const { occuranceChoice } = this.state.occuranceChoice;
        
        return (
            <div className="panel-body">Year long schedule</div>
        )
    }
}