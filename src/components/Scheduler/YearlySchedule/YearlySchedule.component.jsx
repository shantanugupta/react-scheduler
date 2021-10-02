import React from 'react';
import './YearlySchedule.style.css';

export default class YearlyScheduleComponent extends React.Component {
    constructor(props) {
        this.state = { schedule: this.props.schedule }
    }

    render() {
        const { schedule } = this.state.schedule;
        const { occuranceChoice } = this.state.occuranceChoice;
        
        return (
            <div className="panel-body">Yearly schedule</div>
        )
    }
}