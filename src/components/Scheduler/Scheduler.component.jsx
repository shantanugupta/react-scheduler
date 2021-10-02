import React, { useState } from 'react';
import './Scheduler.style.css';
import moment from 'moment';
// import { connect } from 'react-redux';
// import generateDescription from './../../actions/scheduleActions';
// import { schedulerData } from './scheduler.data';
// import { useSelector } from 'react-redux';

import OneTimeOnlyScheduleComponent from './OneTimeOnlySchedule/OneTimeOnlySchedule.component';
import DailyScheduleComponent from './DailySchedule/DailySchedule.component';
import { freqSubdayType } from './ScheduleLookup';
// import WeeklyScheduleComponent from './WeeklySchedule/WeeklySchedule.component';
// import MonthlyScheduleComponent from './MonthlySchedule/MonthlySchedule.component';
// import MonthlyRelativeScheduleComponent from './MonthlyRelativeSchedule/MonthlyRelativeSchedule.component';
// import YearlyScheduleComponent from './YearlySchedule/YearlySchedule.component';
// import YearLongScheduleComponent from './YearLongSchedule/YearLongSchedule.component';
// active_start_date
// active_start_time
const SchedulerComponent = () => {
	const [state, setState] = useState(
		{
			name: 'Default schedule name',
			description: 'Description goes here',
			freq_type: 1, //onetime, daily, weekly, monthly, monthly relative
			freq_interval: 0,
			freq_relative_interval: 0,
			freq_recurrence_factor: 0,
			active_start_date: moment().startOf('day').toDate(),
			active_end_date: moment().startOf('day').toDate(),
			active_start_time: moment().startOf('hour').toDate(),
			active_end_time: moment().startOf('hour').toDate(),
			freq_subday_type: 0,
			freq_subday_interval: 0,
			duration_subday_type: 1, //duration in (hour, min, sec)
			duration_interval: 0 //duration value
		});

	const handleChange = e => {
		let tempState = {
			...state,
			[e.target.name]: e.target.value
		}
		setState(tempState);
	}

	const onOneTimeOnlyScheduleChangeHandler = s => {
		setState({
			...state,
			...s,
			active_start_date: s.active_start_date,
			active_start_time: s.active_start_time
		});
	}

	const onDailyScheduleChangeHandler = s => {
		setState({
			...state,
			...s,
			active_start_date: s.active_start_date,
			active_start_time: s.active_start_time
		});
	}

	return (
		<div>
			<div className="col-lg-12">
				<div className="row">
					<div>
						<div className="form-group">
							<label for="scheduleName">Please enter a schedule name</label>
							<input type="text" id="scheduleName" name="name" className="form-control" placeholder="SCHEDULE NAME" aria-describedby="basic-addon1"
								value={state.name} onChange={(e) => handleChange(e)} />
						</div>
					</div>
				</div>
				<div className="row">
					<div >
						<ul className="nav nav-tabs">
							<li className="nav-item">
								<a href="#freqType1" name="freq_type" className={"nav-link " + (state.freq_type === 1 ? 'active' : '')} data-toggle="tab"
									onClick={(e) => { setState({ ...state, freq_type: 1 }) }}
								>One time</a>
							</li>
							<li className="nav-item">
								<a href="#freqType4" name="freq_type"
									className={"nav-link " + (state.freq_type === 4 ? 'active' : '')} data-toggle="tab"
									onClick={(e) => { setState({ ...state, freq_type: 4 }) }}>
									Daily</a>
							</li>
							<li className="nav-item">
								<a className={"nav-link" + (state.freq_type === 8 ? 'active' : '')} data-toggle="tab"
									onClick={(e) => { setState({ ...state, freq_type: 8 }) }} href="#freqType8">Weekly</a>
							</li>
							<li className="nav-item">
								<a className={"nav-link" + (state.freq_type === 16 ? 'active' : '')} data-toggle="tab"
									onClick={(e) => { setState({ ...state, freq_type: 16 }) }} href="#freqType16">Monthly</a>
							</li>
							<li className="nav-item">
								<a className={"nav-link" + (state.freq_type === 32 ? 'active' : '')} data-toggle="tab"
									onClick={(e) => { setState({ ...state, freq_type: 32 }) }} href="#freqType32">Monthly Relative</a>
							</li>
							{
								true &&
								<li className="nav-item">
									<a className={"nav-link" + (state.freq_type === 64 ? 'active' : '')} data-toggle="tab"
										onClick={(e) => { setState({ ...state, freq_type: 64 }) }} href="#freqType64">Yearly</a>
								</li>
							}
							{
								true &&
								<li className="nav-item">
									<a className={"nav-link" + (state.freq_type === 128 ? 'active' : '')} data-toggle="tab"
										onClick={(e) => { setState({ ...state, freq_type: 128 }) }} href="#freqType128">Year long</a>
								</li>
							}
						</ul>
						<div className="tab-content">
							{/* One time schedule */}
							<div className={"tab-panel" + (state.freq_type === 1 ? 'active' : '')} id="freqType1">
								<div className="panel panel-default">
									<OneTimeOnlyScheduleComponent schedule={state} onOneTimeOnlyScheduleChange={onOneTimeOnlyScheduleChangeHandler} />
								</div>
							</div>
							{/* Daily schedule */}
							<div className={"tab-panel" + (state.freq_type === 4 ? 'active' : '')} id="freqType4" >
								<div className="panel panel-default">
									<DailyScheduleComponent schedule={state} onDailyScheduleChange={onDailyScheduleChangeHandler} />
								</div>
							</div >
							{/* Weekly schedule */}
							< div className={"tab-panel" + (state.freq_type === 8 ? 'active' : '')} id="freqType8" >
								<div className="panel panel-default">

									{/* <WeeklyScheduleComponent schedule={state} /> */}
											Weekly scheule

								</div>
							</div >
							{/* Monthly schedule */}
							< div className={"tab-panel" + (state.freq_type === 16 ? 'active' : '')} id="freqType16" >
								<div className="panel panel-default">

									{/* <MonthlyScheduleComponent schedule={state} /> */}
											Monthly Schedule

								</div>
							</div >
							{/* Monthly relative schedule */}
							< div className={"tab-panel" + (state.freq_type === 32 ? 'active' : '')} id="freqType32" >
								<div className="panel panel-default">
									{/* <MonthlyRelativeScheduleComponent schedule={state} /> */}
											Monthly relative schedule
								</div>
							</div >
							{/* Yearly schedule */}
							< div className={"tab-panel" + (state.freq_type === 64 ? 'active' : '')} id="freqType64" >
								<div className="panel panel-default">
									{/* <YearlyScheduleComponent schedule={state} /> */}
											Yearly schedule
								</div>
							</div >
							{/* Year long schedule */}
							< div className={"tab-panel" + (state.freq_type === 128 ? 'active' : '')} id="freqType128" >
								<div className="panel panel-default">

									{/* <YearLongScheduleComponent schedule={state} /> */}
											Year long schedule

								</div>
							</div >
						</div >
					</div >
				</div >
				<div className="row">
					<div className="form-group">
						<div className="row">
							<div className="col-lg-12">
								<label for="durationNumber">Duration</label>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-6">
								<input type="number" value={state.duration_interval} id="durationNumber" className="form-control" placeholder="Duration" min="0" max="100" />
							</div>
							<div className="col-lg-6">
								<select id="durationUnit" className="form-control" data-toggle="popover" data-trigger="hover"
									value={state.duration_subday_type}>
									{
										freqSubdayType.map(f => (
											<option key={f.key} value={f.value}>
												{f.value}
											</option>))
									}
								</select>
							</div>
						</div>
					</div>*
					</div>
				<div className="row">
					<div className="well">
						{state.description}
					</div>
				</div>
				<div className="row">
					{/* <input type="submit" onClick={generateEventsClick()} /> */}
				</div>
				{/* <div className="row">
						<ul className="nav nav-tabs">
							{
								events.map(e => (
									<li>
										<strong>Start:</strong>{e.start}<strong>End:</strong>{e.end}
									</li>))
							}
						</ul>
					</div> */}
			</div>
			{
				true &&
				<div className="col-lg-4">
					<div>
						<pre>{JSON.stringify(state, null, 2)}</pre>
					</div>
				</div>
			}
		</div>
	)
}
// const mapStateToProps = state => ({
// 	schedule: state.schedule
// });

// export default connect(mapStateToProps, { generateDescription })(SchedulerComponent);

export default SchedulerComponent;