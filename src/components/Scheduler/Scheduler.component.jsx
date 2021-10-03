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

	const hiddenClass = "";
	const showClass = "show active";

	return (
		<div>
			<div className="card border-0">
				<div className="form-group">
					<label htmlFor="scheduleName" className="font-weight-bold">Please enter a schedule name</label>
					<input type="text" id="scheduleName" name="name" className="form-control" placeholder="SCHEDULE NAME" aria-describedby="basic-addon1"
						value={state.name} onChange={(e) => handleChange(e)} />
				</div>
			</div>
			<div >
				<ul className="nav nav-tabs border-bottom-0" role="tablist">
					<li className="nav-item">
						<a href="#freqType1" name="freq_type" className={"nav-link " + (state.freq_type === 1 ? 'active' : '')}
							onClick={(e) => { setState({ ...state, freq_type: 1 }) }}
							data-toggle="tab" role="tab" aria-controls="freqType1" aria-selected={state.freq_type === 1}>
							One time</a>
					</li>
					<li className="nav-item">
						<a href="#freqType4" name="freq_type"
							className={"nav-link " + (state.freq_type === 4 ? 'active' : '')}
							onClick={(e) => { setState({ ...state, freq_type: 4 }) }}
							data-toggle="tab" role="tab" aria-controls="freqType4" aria-selected={state.freq_type === 4} >
							Daily</a>
					</li>
					<li className="nav-item">
						<a className={"nav-link " + (state.freq_type === 8 ? 'active' : '')}
							onClick={(e) => { setState({ ...state, freq_type: 8 }) }} href="#freqType8"
							data-toggle="tab" role="tab" aria-controls="freqType8" aria-selected={state.freq_type === 8}>
							Weekly</a>
					</li>
					<li className="nav-item">
						<a className={"nav-link " + (state.freq_type === 16 ? 'active' : '')}
							onClick={(e) => { setState({ ...state, freq_type: 16 }) }} href="#freqType16"
							data-toggle="tab" role="tab" aria-controls="freqType16" aria-selected={state.freq_type === 16}>
							Monthly</a>
					</li>
					<li className="nav-item">
						<a className={"nav-link " + (state.freq_type === 32 ? 'active' : '')}
							onClick={(e) => { setState({ ...state, freq_type: 32 }) }} href="#freqType32"
							data-toggle="tab" role="tab" aria-controls="freqType32" aria-selected={state.freq_type === 32}>
							Monthly Relative</a>
					</li>
					{
						true &&
						<li className="nav-item">
							<a className={"nav-link " + (state.freq_type === 64 ? 'active' : '')}
								onClick={(e) => { setState({ ...state, freq_type: 64 }) }} href="#freqType64"
								data-toggle="tab" role="tab" aria-controls="freqType64" aria-selected={state.freq_type === 64}>
								Yearly</a>
						</li>
					}
					{
						true &&
						<li className="nav-item">
							<a className={"nav-link " + (state.freq_type === 128 ? 'active' : '')}
								onClick={(e) => { setState({ ...state, freq_type: 128 }) }} href="#freqType128"
								data-toggle="tab" role="tab" aria-controls="freqType128" aria-selected={state.freq_type === 128}>
								Year long</a>
						</li>
					}
				</ul>
				<div className="tab-content border">
					{/* One time schedule */}
					<div className={"m-2 tab-pane fade " + (state.freq_type === 1 ? showClass : hiddenClass)} id="freqType1" role="tabpanel">
						<OneTimeOnlyScheduleComponent schedule={state} onOneTimeOnlyScheduleChange={onOneTimeOnlyScheduleChangeHandler} />
					</div>
					{/* Daily schedule */}
					<div className={"m-2 tab-pane fade " + (state.freq_type === 4 ? showClass : hiddenClass)} id="freqType4" role="tabpanel">
						<DailyScheduleComponent schedule={state} onDailyScheduleChange={onDailyScheduleChangeHandler} />
					</div >
					{/* Weekly schedule */}
					< div className={"m-2 tab-pane fade " + (state.freq_type === 8 ? showClass : hiddenClass)} id="freqType8" role="tabpanel">
						{/* <WeeklyScheduleComponent schedule={state} /> */}
						Weekly scheule
					</div >
					{/* Monthly schedule */}
					< div className={"m-2 tab-pane fade " + (state.freq_type === 16 ? showClass : hiddenClass)} id="freqType16" role="tabpanel">
						{/* <MonthlyScheduleComponent schedule={state} /> */}
						Monthly Schedule
					</div >
					{/* Monthly relative schedule */}
					< div className={"m-2 tab-pane fade " + (state.freq_type === 32 ? showClass : hiddenClass)} id="freqType32" role="tabpanel">
						{/* <MonthlyRelativeScheduleComponent schedule={state} /> */}
						Monthly relative schedule
					</div >
					{/* Yearly schedule */}
					< div className={"m-2 tab-pane fade " + (state.freq_type === 64 ? showClass : hiddenClass)} id="freqType64" role="tabpanel">
						{/* <YearlyScheduleComponent schedule={state} /> */}
						Yearly schedule
					</div >
					{/* Year long schedule */}
					< div className={"m-2 tab-pane fade " + (state.freq_type === 128 ? showClass : hiddenClass)} id="freqType128" role="tabpanel">
						{/* <YearLongScheduleComponent schedule={state} /> */}
						Year long schedule
					</div >
				</div >
			</div >
			<div className="card border-0 mt-2">
				<div className="form-group">
					<div className="row">
						<div className="col-lg-12">
							<label htmlFor="durationNumber" className="font-weight-bold">Duration</label>
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
				</div>
			</div>
			<div className="card mt-2">
				<div className="card-header">
					{state.description}
				</div>
			</div>
			<div className="">
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
					</div> */
			}
			{
				true &&
				<div className="card mt-2">
					<div className="card-body">
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