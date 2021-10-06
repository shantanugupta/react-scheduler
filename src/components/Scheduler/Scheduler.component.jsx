import React, { useState } from 'react';
import './Scheduler.style.css';
import * as moment from 'moment';
import { freqSubdayType } from './ScheduleLookup';

// import { connect } from 'react-redux';
// import generateDescription from './../../actions/scheduleActions';
// import { useSelector } from 'react-redux';
import OneTimeOnlyScheduleComponent from './OneTimeOnlySchedule/OneTimeOnlySchedule.component';
import DailyScheduleComponent from './DailySchedule/DailySchedule.component';
import WeeklyScheduleComponent from './WeeklySchedule/WeeklySchedule.component';
import MonthlyScheduleComponent from './MonthlySchedule/MonthlySchedule.component';
import MonthlyRelativeScheduleComponent from './MonthlyRelativeSchedule/MonthlyRelativeSchedule.component';
import YearlyScheduleComponent from './YearlySchedule/YearlySchedule.component';
import YearLongScheduleComponent from './YearLongSchedule/YearLongSchedule.component';


const SchedulerComponent = () => {
	const dateFormatyyyymmdd = "yyyy-MM-DD";
	const timeFormathhMM = "HH:mm";

	const [state, setState] = useState(blankSchedule);

	const handleChange = e => {
		let tempState = {
			...state,
			[e.target.name]: parseInt(e.target.value) || e.target.value
		}
		setState(tempState);
	}

	// Create a blank schedule when loading component for the first time or after saving/reset the component
	function blankSchedule() {
		let active_start_date = moment().startOf('day').format(dateFormatyyyymmdd);
		let active_end_date = moment().startOf('day').format(dateFormatyyyymmdd);
		let active_start_time = moment().startOf('hour').format(timeFormathhMM);
		let active_end_time = moment().startOf('hour').format(timeFormathhMM);

		return {
			name: '',
			description: 'Description goes here',
			freq_type: 8, //onetime, daily, weekly, monthly, monthly relative
			freq_interval: 0,
			freq_relative_interval: 0,
			freq_recurrence_factor: 0,
			active_start_date: active_start_date,
			active_end_date: active_end_date,
			active_start_time: active_start_time,
			active_end_time: active_end_time,
			freq_subday_type: 1,
			freq_subday_interval: 0,
			duration_subday_type: 1, //duration in (hour, min, sec)
			duration_interval: 0 //duration value
		}
	}

	//Reset schedule fields based on component
	const scheduleTypeChange = (e, new_freq_type) => {
		let tempState = {
			...state,
			freq_type: new_freq_type
		}
		resetSchedule(tempState);
	}

	const resetSchedule = oldState => {
		let tempState = blankSchedule();
		tempState.name = oldState.name;
		tempState.duration_subday_type = oldState.duration_subday_type;
		tempState.duration_interval = oldState.duration_interval;
		tempState.freq_type = oldState.freq_type;
		setState(tempState);
	}

	const commonScheduleChangeHandler = s => {
		setState({
			...state,
			...s,
		});
	}

	const hiddenClass = "";
	const showClass = "show active";

	return (
		<div>
			{/* SCHEDULE NAME */}
			<div className="card border-0">
				<div className="form-group">
					<label htmlFor="scheduleName" className="font-weight-bold">Please enter a schedule name</label>
					<input type="text" id="scheduleName" name="name" className="form-control" placeholder="SCHEDULE NAME" aria-describedby="basic-addon1"
						value={state.name} onChange={(e) => handleChange(e)} />
				</div>
			</div>
			{/* SCHEDULE COMPONENT */}
			<div >
				{/* TAB BUTTONS */}
				<ul className="nav nav-tabs border-bottom-0" role="tablist">
					<li className="nav-item">
						<a href="#freqType1" name="freq_type" className={"nav-link " + (state.freq_type === 1 ? 'active' : '')}
							onClick={(e) => scheduleTypeChange(e, 1)}
							data-toggle="tab" role="tab" aria-controls="freqType1" aria-selected={state.freq_type === 1}>
							One time</a>
					</li>
					<li className="nav-item">
						<a href="#freqType4" name="freq_type"
							className={"nav-link " + (state.freq_type === 4 ? 'active' : '')}
							onClick={(e) => scheduleTypeChange(e, 4)}
							data-toggle="tab" role="tab" aria-controls="freqType4" aria-selected={state.freq_type === 4} >
							Daily</a>
					</li>
					<li className="nav-item">
						<a className={"nav-link " + (state.freq_type === 8 ? 'active' : '')}
							onClick={(e) => scheduleTypeChange(e, 8)} href="#freqType8"
							data-toggle="tab" role="tab" aria-controls="freqType8" aria-selected={state.freq_type === 8}>
							Weekly</a>
					</li>
					<li className="nav-item">
						<a className={"nav-link " + (state.freq_type === 16 ? 'active' : '')}
							onClick={(e) => scheduleTypeChange(e, 16)} href="#freqType16"
							data-toggle="tab" role="tab" aria-controls="freqType16" aria-selected={state.freq_type === 16}>
							Monthly</a>
					</li>
					<li className="nav-item">
						<a className={"nav-link " + (state.freq_type === 32 ? 'active' : '')}
							onClick={(e) => scheduleTypeChange(e, 32)} href="#freqType32"
							data-toggle="tab" role="tab" aria-controls="freqType32" aria-selected={state.freq_type === 32}>
							Monthly Relative</a>
					</li>
					{
						true &&
						<li className="nav-item">
							<a className={"nav-link " + (state.freq_type === 64 ? 'active' : '')}
								onClick={(e) => scheduleTypeChange(e, 64)} href="#freqType64"
								data-toggle="tab" role="tab" aria-controls="freqType64" aria-selected={state.freq_type === 64}>
								Yearly</a>
						</li>
					}
					{
						true &&
						<li className="nav-item">
							<a className={"nav-link " + (state.freq_type === 128 ? 'active' : '')}
								onClick={(e) => scheduleTypeChange(e, 128)} href="#freqType128"
								data-toggle="tab" role="tab" aria-controls="freqType128" aria-selected={state.freq_type === 128}>
								Year long</a>
						</li>
					}
				</ul>
				{/* TAB CONTENT */}
				<div className="tab-content border">
					{/* One time schedule */}
					<div className={"m-2 tab-pane fade " + (state.freq_type === 1 ? showClass : hiddenClass)} id="freqType1" role="tabpanel">
						<OneTimeOnlyScheduleComponent schedule={state} onOneTimeOnlyScheduleChange={commonScheduleChangeHandler} />
					</div>
					{/* Daily schedule */}
					<div className={"m-2 tab-pane fade " + (state.freq_type === 4 ? showClass : hiddenClass)} id="freqType4" role="tabpanel">
						<DailyScheduleComponent schedule={state} onDailyScheduleChange={commonScheduleChangeHandler} />
					</div >
					{/* Weekly schedule */}
					< div className={"m-2 tab-pane fade " + (state.freq_type === 8 ? showClass : hiddenClass)} id="freqType8" role="tabpanel">
						<WeeklyScheduleComponent schedule={state} onWeeklyScheduleChange={commonScheduleChangeHandler} />
					</div >
					{/* Monthly schedule */}
					< div className={"m-2 tab-pane fade " + (state.freq_type === 16 ? showClass : hiddenClass)} id="freqType16" role="tabpanel">
						<MonthlyScheduleComponent schedule={state} onMonthlyScheduleChange={commonScheduleChangeHandler} />
					</div >
					{/* Monthly relative schedule */}
					< div className={"m-2 tab-pane fade " + (state.freq_type === 32 ? showClass : hiddenClass)} id="freqType32" role="tabpanel">
						<MonthlyRelativeScheduleComponent schedule={state} onMonthlyRelativeScheduleChange={commonScheduleChangeHandler} />
					</div >
					{/* Yearly schedule */}
					< div className={"m-2 tab-pane fade " + (state.freq_type === 64 ? showClass : hiddenClass)} id="freqType64" role="tabpanel">
						<YearlyScheduleComponent schedule={state} onYearlyScheduleChange={commonScheduleChangeHandler} />
					</div >
					{/* Year long schedule */}
					< div className={"m-2 tab-pane fade " + (state.freq_type === 128 ? showClass : hiddenClass)} id="freqType128" role="tabpanel">
						<YearLongScheduleComponent schedule={state} onYearLongScheduleChange={commonScheduleChangeHandler} />
					</div >
				</div >
			</div >
			{/* DURATION UNIT */}
			<div className="card border-0 mt-2">
				<div className="form-group">
					<div className="row">
						<div className="col-lg-12">
							<label htmlFor="durationNumber" className="font-weight-bold">Duration</label>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-6">
							<input type="number" value={state.duration_interval} id="durationNumber" className="form-control"
								placeholder="Duration" min="0" max="100" name="duration_interval" onChange={(e) => handleChange(e)} />
						</div>
						<div className="col-lg-6">
							<select id="durationUnit" className="form-control" data-toggle="popover" data-trigger="hover"
								name="duration_subday_type" value={state.duration_subday_type} onChange={(e) => handleChange(e)}>
								{
									freqSubdayType.map(f => (
										< option key={f.key} value={f.key} >
											{f.value}
										</option>
									))}
							</select>
						</div>
					</div>
				</div>
			</div>
			{/* DESCRIPTION */}
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
		</div >
	)
}
// const mapStateToProps = state => ({
// 	schedule: state.schedule
// });

// export default connect(mapStateToProps, {generateDescription})(SchedulerComponent);

export default SchedulerComponent;