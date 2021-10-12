import React, { useState } from 'react';
import './Scheduler.style.css';
import { freqSubdayTypeMinMax, freqSubdayType, freqType } from './ScheduleLookup';

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
import { generateScheduleDescription } from './scheduler.data';

const SchedulerComponent = () => {
	const dateFormatyyyymmdd = "yyyy-MM-DD";
	const timeFormathhMM = "HH:mm";
	const [state, setState] = useState(blankSchedule);
	// const desc = generateScheduleDescription(state);

	const handleChange = e => {
		let name = e.target.name;
		let value = e.target.value;

		let tempState = {
			...state,
			[name]: parseInt(value, 10) || value,
		}

		if (name === "duration_subday_type") {
			if (tempState.duration_subday_type === 2 && tempState.duration_interval > 24) {
				tempState.duration_interval = 24;
			} else if (tempState.duration_subday_type === 1) {
				tempState.duration_interval = 0;
			}
		}

		const desc = generateScheduleDescription(tempState);
		tempState.description = desc;

		setState(tempState);
	}

	// Create a blank schedule when loading component for the first time or after saving/reset the component
	function blankSchedule() {
		let active_start_date = undefined;// moment().startOf('day').format(dateFormatyyyymmdd);
		let active_end_date = undefined;// moment().startOf('day').format(dateFormatyyyymmdd);
		let active_start_time = undefined;//  moment().startOf('hour').format(timeFormathhMM);
		let active_end_time = undefined;//  moment().startOf('hour').format(timeFormathhMM);

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
			duration_interval: '', //duration value
			occurance_choice_state: undefined
		}
	}

	const getDurationInterval = (key, value, duration_interval) => {
		let description = '';

		if (key === 1) {
			description = value;
		} else {
			if (key === 2 && duration_interval > 24) {
				description = 24 + " " + value
			}
			else {
				description = duration_interval + " " + value
			}
		}

		return description;
	}

	const scheduleTypeChange = (new_freq_type) => {
		let tempState = {
			...blankSchedule(),
			freq_type: new_freq_type,
			name: state.name
		}

		setState(tempState);
	}

	const commonScheduleChangeHandler = s => {
		let tempState = {
			...state,
			...s,
		}

		// debugger;
		const desc = generateScheduleDescription(tempState);
		tempState.description = desc;

		setState(tempState);
	}

	const hiddenClass = "";
	const showClass = "show active";

	return (
		<div className="d-flex align-content-start flex-wrap m-2">
			<div className="card col-lg-8 p-2">
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
						{
							freqType.map(freq => {
								return (
									<li key={freq.key} className="nav-item">
										<a href="#freqType1" name="freq_type" className={"nav-link " + (state.freq_type === freq.key ? 'active' : '')}
											onClick={(e) => scheduleTypeChange(freq.key)}
											data-toggle="tab" role="tab" aria-controls="freqType1" aria-selected={state.freq_type === freq.key}>
											{freq.value}</a>
									</li>)
							})
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
								<select id="durationUnit" className="form-control" data-toggle="popover" data-trigger="hover"
									name="duration_subday_type" value={state.duration_subday_type} onChange={(e) => handleChange(e)}>
									{
										freqSubdayType.map(f => (
											<option key={"durationUnit" + f.key} value={f.key} >
												{getDurationInterval(f.key, f.value, state.duration_interval)}
											</option>
										))}
								</select>
							</div>
							<div className="col-lg-6">
								<input type="range" id="durationNumber" className="form-range w-50 align-middle"
									placeholder="Duration" name="duration_interval" value={state.duration_interval} onChange={handleChange}
									min={freqSubdayTypeMinMax.hasOwnProperty(state.duration_subday_type) ? freqSubdayTypeMinMax[state.duration_subday_type].min : 0}
									max={freqSubdayTypeMinMax.hasOwnProperty(state.duration_subday_type) ? freqSubdayTypeMinMax[state.duration_subday_type].max : 0}
								/>
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
			</div>
			<div className="card p-2 ml-2">
				{
					true &&
					<div className="card-body">
						<pre>{JSON.stringify(state, null, 2)}</pre>
					</div>
				}
			</div>
		</div>
	)
}

export default SchedulerComponent;