import React, { useState } from 'react';
import './Scheduler.style.css';
import { freqSubdayTypeMinMax, freqSubdayType, freqType } from './ScheduleLookup';
import moment from 'moment';
import ReactJson from 'react-json-view'

import OneTimeOnlyScheduleComponent from './OneTimeOnlySchedule/OneTimeOnlySchedule.component';
import DailyScheduleComponent from './DailySchedule/DailySchedule.component';
import WeeklyScheduleComponent from './WeeklySchedule/WeeklySchedule.component';
import MonthlyScheduleComponent from './MonthlySchedule/MonthlySchedule.component';
import MonthlyRelativeScheduleComponent from './MonthlyRelativeSchedule/MonthlyRelativeSchedule.component';
import YearlyScheduleComponent from './YearlySchedule/YearlySchedule.component';
import YearLongScheduleComponent from './YearLongSchedule/YearLongSchedule.component';
import { generateScheduleDescription, generateEvents, saveEvents, validateSchedule } from './scheduler.data';

const SchedulerComponent = () => {
	const dateFormatyyyymmdd = "yyyy-MM-DD";
	const timeFormathhMM = "HH:mm";

	const [state, setState] = useState(blankSchedule);
	const [eventState, setEventState] = useState([]);
	const [endpoint, setEndpoint] = useState("https://localhost:7049/Scheduler/GenerateEvents");
	const [saveEventOutput, setSaveEventOutput] = useState([]);


	const handleChange = e => {
		let name = e.target.attributes["property_name"].value;
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

	const handleEndpointChange = e => {
		let value = e.target.value;
		setEndpoint(value);
	}

	const generateEventsClick = e => {
		var startTime = performance.now();

		let events = generateEvents(state);

		var endTime = performance.now();
		console.log(`Generate event execution time: ${endTime - startTime} milliseconds. Events count: ${events.length}`);

		setEventState(events);
	}

	const saveEventsClick = async (e) => {
		var saveEventOutput = await saveEvents(endpoint, state);
		setSaveEventOutput(saveEventOutput);
	}

	const validateScheduleClick = e => {
		validateSchedule(state);
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
			freq_type: 1, //onetime, daily, weekly, monthly, monthly relative
			freq_interval: 0,
			freq_relative_interval: 0,
			freq_recurrence_factor: 0,
			active_start_date: active_start_date,
			active_end_date: active_end_date,
			active_start_time: active_start_time,
			active_end_time: active_end_time,
			freq_subday_type: 2, //Occurance in (at specified time, hour, min, sec)
			freq_subday_interval: 1,
			duration_subday_type: 2, //duration in (at specified time, hour, min, sec)
			duration_interval: 1, //duration value
			occurance_choice_state: false
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

		const desc = generateScheduleDescription(tempState);
		tempState.description = desc;

		setState(tempState);
	}

	const hiddenClass = "";
	const showClass = "show active";

	return (
		<div className="row m-1">
			<div className='card col'>
				{/* Scheduler control */}
				<div className='mt-2'>
					{/* SCHEDULE NAME */}
					<div className="card border-0">
						<div className="form-group">
							<label htmlFor="scheduleName" className="font-weight-bold">Please enter a schedule name</label>
							<input type="text" id="scheduleName" property_name="name" className="form-control" placeholder="SCHEDULE NAME" aria-describedby="basic-addon1"
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
										![64, 128].includes(freq.key) &&
										<li key={freq.key} className="nav-item">
											<a href={"#freqType" + state.freq_type} property_name="freq_type" className={"nav-link " + (state.freq_type === freq.key ? 'active' : '')}
												onClick={(e) => scheduleTypeChange(freq.key)}
												data-toggle="tab" role="tab" aria-controls={"freqType" + state.freq_type} aria-selected={state.freq_type === freq.key}>
												{freq.value}</a>
										</li>)
								})
							}
						</ul>
						{/* TAB CONTENT */}
						<div className="tab-content border">
							{/* One time schedule */}
							<div className={"m-2 tab-pane fade " + (state.freq_type === 1 ? showClass : hiddenClass)} id="freqType1" role="tabpanel">
								<OneTimeOnlyScheduleComponent schedule={state} onComponentChange={commonScheduleChangeHandler} />
							</div>
							{/* Daily schedule */}
							<div className={"m-2 tab-pane fade " + (state.freq_type === 4 ? showClass : hiddenClass)} id="freqType4" role="tabpanel">
								<DailyScheduleComponent schedule={state} onComponentChange={commonScheduleChangeHandler} />
							</div >
							{/* Weekly schedule */}
							< div className={"m-2 tab-pane fade " + (state.freq_type === 8 ? showClass : hiddenClass)} id="freqType8" role="tabpanel">
								<WeeklyScheduleComponent schedule={state} onComponentChange={commonScheduleChangeHandler} />
							</div >
							{/* Monthly schedule */}
							< div className={"m-2 tab-pane fade " + (state.freq_type === 16 ? showClass : hiddenClass)} id="freqType16" role="tabpanel">
								<MonthlyScheduleComponent schedule={state} onComponentChange={commonScheduleChangeHandler} />
							</div >
							{/* Monthly relative schedule */}
							< div className={"m-2 tab-pane fade " + (state.freq_type === 32 ? showClass : hiddenClass)} id="freqType32" role="tabpanel">
								<MonthlyRelativeScheduleComponent schedule={state} onComponentChange={commonScheduleChangeHandler} />
							</div >
							{/* Yearly schedule */}
							< div className={"m-2 tab-pane fade " + (state.freq_type === 64 ? showClass : hiddenClass)} id="freqType64" role="tabpanel">
								<YearlyScheduleComponent schedule={state} onComponentChange={commonScheduleChangeHandler} />
							</div >
							{/* Year long schedule */}
							< div className={"m-2 tab-pane fade " + (state.freq_type === 128 ? showClass : hiddenClass)} id="freqType128" role="tabpanel">
								<YearLongScheduleComponent schedule={state} onComponentChange={commonScheduleChangeHandler} />
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
										property_name="duration_subday_type" value={state.duration_subday_type} onChange={(e) => handleChange(e)}>
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
										placeholder="Duration" property_name="duration_interval" value={state.duration_interval} onChange={handleChange}
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
					{/* GENERATE EVENTS */}
					<div className="mt-2">
						<div className="form-group form-inline">
							<input type="button" className="btn btn-primary" onClick={(e) => generateEventsClick(e)} value="Generate Events" />
							<input type="button" className="btn btn-primary ml-2" onClick={(e) => validateScheduleClick(e)} value="Validate schedule" />
							
							<input type="button" className="btn btn-primary ml-2" onClick={(e) => saveEventsClick(e)} value="Save events" />
							<label htmlFor="endpointUrl" className="font-weight-bold ml-2">API endpoint to invoke</label>
							<input type="text" id="endpointUrl" property_name="endpoint" className="form-control col ml-2" placeholder="Scheduler base url endpoint e.g. https://localhost:7049/"
								value={endpoint} onChange={(e) => handleEndpointChange(e)} />
						</div>
					</div>
				</div>
				{/* LIST OF EVENTS */}
				<div>
					<table className="table table-stripe table-hover ">
						<caption>No of events generated : {eventState.length}</caption>
						<thead>
							<tr>
								<th scope="col">S.No.</th>
								<th scope="col">Start date/time</th>
								<th scope="col">End date/time</th>
							</tr>
						</thead>
						<tbody>
							{eventState.map(
								(e, index) => (
									<tr>
										<th scope="row">{index + 1}</th>
										<td>{moment(e.start).format("yyyy-MM-DD hh:mm A")}</td>
										<td>{moment(e.end).format("yyyy-MM-DD hh:mm A")}</td>
									</tr>
								)
							)}
						</tbody>
					</table>
				</div>
			</div>
			{/* JSON RECORD */}
			<div className='card col-3 ml-2 p-2'>
				<label className="font-weight-bold">Input JSON</label>
				{
					true &&
					<ReactJson src={state} />
				}
				<label className="font-weight-bold mt-2">Output from Save events click</label>
				{
					true &&
					<ReactJson src={saveEventOutput} />
				}
			</div>
		</div>
	)
}

export default SchedulerComponent;