import moment from 'moment';
import * as schedulerData from './ScheduleLookup';

var timeFormat = "hh:mm A";
var dateFormat = "YYYY/MM/DD";
var dateTimeFormat = dateFormat + ' ' + timeFormat;
var occuranceChoice = true;

export const getGetOrdinal = n => {
    if (n === undefined) {
        return "Nth"
    }
    var s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

//evaluates description property of scheduler everything any UI property is changed
export const generateScheduleDescription = (schedule) => {
    var desc = "Occurs";
    var sch = schedule;

    var f = sch.freq_type;
    switch (f) {
        case 1: //FreqType.OneTimeOnly:
            desc += " on " + sch.active_start_date.toLocaleDateString() + " at "
                + moment(sch.active_start_time).format(timeFormat);
            // Occurs on x(date) at y(time)
            break;
        case 4: //FreqType.Daily:
            desc += " every " + sch.freq_interval + " day(s)";
            // Occurs every n days(s)
            break;
        case 8: //FreqType.Weekly:
            desc += " every " + sch.freq_recurrence_factor + " week(s) ";
            //Occurs every n week(s)
            var selectedWeekdays = '';
            //generate weekday list from freq_interval i.e. 3 = {Monday, Tuesday}, 7 = {Monday, Tuesday, Wednesday}
            var loop = 1;
            while (loop <= 7) {
                var power = Math.pow(2, loop - 1);
                if ((sch.freq_interval & power) === power) {
                    var val = schedulerData.freqIntervalWeekly.filter(f => {
                        if (f.key === power)
                            return f;
                    })[0].value;
                    selectedWeekdays += val + ", ";
                    // Monday,Tuesday,Wednesday...
                }

                loop++;
            }
            desc += "on " + selectedWeekdays;
            //Occurs every n week(s) on Monday, Tuesday, Wednesday, ....
            if (desc.endsWith(", ") === true) {
                // Remove , and space from desc
                desc = desc.substr(0, desc.length - 2);
            }
            break;
        case 16: //FreqType.Monthly:
            desc += " every " + sch.freq_recurrence_factor + " month(s) on day " + sch.freq_interval + " of that month";
            //Occurs every n month(s) on day {1/2/3...} of that month
            break;
        case 32: //FreqType.MonthlyRelativeToFreqInterval:
            desc += " every " + sch.freq_recurrence_factor + " month(s) on the ";
            // Occur every n month(s) on the

            //var fri = sch.freq_relative_interval;
            var freq_rel_intv = '';
            if (sch.freq_relative_interval !== undefined && sch.freq_relative_interval > 0) {
                var x = schedulerData.freqRelativeInterval.filter(f => {
                    if (f.key === sch.freq_relative_interval)
                        return f;
                });
                freq_rel_intv = x !== undefined && x.length > 0 ? x[0].value.toLowerCase() : '';
            }

            var freq_intv_str = '';
            if (sch.freq_interval !== undefined && sch.freq_interval > 0) {
                var y = schedulerData.freqIntervalMonthlyRelative.filter(f => {
                    if (f.key === sch.freq_interval)
                        return f;
                });

                freq_intv_str = y !== undefined && y.length > 0 ? y[0].value.toLowerCase() : '';
            }

            desc += freq_rel_intv + " " + freq_intv_str + " of that month";
            break;
        default:
            desc = "Unable to generate description for this schedule";
            break;
    } //END SWITCH FreqType variations

    var s = sch.freq_subday_type;
    var freq_subday_type_str = '';
    if (sch.freq_subday_interval !== undefined && sch.freq_subday_interval > 0) {
        var z = schedulerData.freqSubdayType.filter(f => {
            if (f.key === s)
                return f;
        });

        freq_subday_type_str = " every " + sch.freq_subday_interval + " " + (z !== undefined && z.length > 0 ? z[0].value.toLowerCase() : '');
    }
    desc = desc + freq_subday_type_str;

    if (occuranceChoice === true) {
        desc += " once at " + moment(sch.active_start_time).format(timeFormat);
    }

    if (occuranceChoice === false && (s === 2 || s === 4 || s === 8)) //if (s == FreqSubdayType.Hours || s == FreqSubdayType.Minutes || s == FreqSubdayType.Seconds)
        desc += " between " + moment(sch.active_start_time).format(timeFormat)
            + " and " + moment(sch.active_end_time).format(timeFormat);

    var d = sch.duration_subday_type;
    if (d === 2 || d === 4 || d === 8) {  //d == FreqSubdayType.Hours || d == FreqSubdayType.Minutes || d == FreqSubdayType.Seconds
        var freqSubdayType = schedulerData.freqSubdayType.filter(f => {
            if (f.key === d)
                return f;
        })[0].value;
        desc = desc + " for " + sch.duration_interval + " " + freqSubdayType;
    }

    if (f !== 1) //FreqType.OneTimeOnly)
    {
        // Schedule will be used starting on x  with no end date
        // Schedule will be used between x and y
        desc += ". Schedule will be used";
        if (sch.active_end_date === undefined || sch.active_end_date === 0) { //if (sch.active_end_date == Convert.ToInt32(Common.ConvertDateToInt(DateTime.MaxValue)) || active_end_date == 0)
            desc += " starting on " + sch.active_start_date.toLocaleDateString() + " with no end date";
        } else {
            desc += " between " + sch.active_start_date.toLocaleDateString()
                + " and " + sch.active_end_date.toLocaleDateString();
        }
    }

    desc += ".";
    return desc;
}; //end generateScheduleDescription

export const generateEvents = (schedule) => {

    var events = [];
    var sch = schedule;
    //var isValid = isScheduleValid(sch);

    var f = sch.freq_type;
    switch (f) {
        case 1: //FreqType.OneTimeOnly:

            var startDate = moment(moment(sch.active_start_date).format(dateFormat)
                + ' ' + moment(sch.active_start_time).format(timeFormat)
                , dateTimeFormat).toDate();
            var endDate = moment(moment(sch.active_end_date).format(dateFormat)
                + ' ' + moment(sch.active_end_time).format(timeFormat)
                , dateTimeFormat).toDate();

            if (sch.duration_interval > 0) {
                var a = schedulerData.freqSubdayType.filter(function (f) { if (f.key === sch.duration_subday_type) return f; });

                if (a.length > 0) {
                    var identifier = a[0].identifier;
                    endDate = moment(startDate).add(sch.duration_interval, identifier);
                }
            }
            events.push({ start: startDate, end: endDate });

            break;
        case 4: //FreqType.Daily:

            var endTimeInSeconds = moment.duration(moment(sch.active_end_time).diff(moment(sch.active_end_time).startOf('day').toDate())).asSeconds();
            var activeEndDate = moment(sch.active_end_date).startOf('days').add(endTimeInSeconds, 'seconds').toDate();

            var startTimeInSeconds = moment.duration(moment(sch.active_start_time).diff(moment(sch.active_end_time).startOf('day').toDate())).asSeconds();
            var nextDate = moment(sch.active_start_date).startOf('days').add(startTimeInSeconds, 'seconds').toDate();

            while (moment(nextDate).isAfter(activeEndDate) === false) {
                var s = sch.freq_subday_type;
                if (occuranceChoice === false && (s === 2 || s === 4 || s === 8)) {
                    var nextTime = nextDate;
                    var nextEndTime = moment(nextDate).startOf('days').add(endTimeInSeconds, 'seconds').toDate();

                    while (moment(nextTime).isAfter(nextEndTime) === false) {
                        if (sch.duration_interval > 0) {
                            endDate = moment(nextTime).add(sch.duration_interval, schedulerData.momentTimeValue[sch.duration_subday_type]).toDate();
                        }
                        events.push({ start: nextTime, end: endDate });

                        nextTime = moment(nextTime).add(sch.freq_subday_interval, schedulerData.momentTimeValue[sch.freq_subday_type]).toDate();
                    }
                } else {
                    if (sch.duration_interval > 0) {
                        endDate = moment(nextDate).add(sch.duration_interval, schedulerData.momentTimeValue[sch.duration_subday_type]);
                    }
                    events.push({ start: nextDate, end: endDate });
                }

                nextDate = moment(nextDate).add(sch.freq_interval, 'days').startOf('days').add(startTimeInSeconds, 'seconds').toDate();
            }
            break;
        case 8: //FreqType.Weekly:
            var selectedWeekDays = [];
            var loop = 1;
            while (loop <= 7) {
                var power = Math.pow(2, loop - 1);
                if ((sch.freq_interval & power) === power) {
                    var val = schedulerData.freqIntervalWeekly.filter(function (f) {
                        if (f.key === power)
                            return f;
                    })[0];
                    selectedWeekDays.push(val);
                }
                loop++;
            }

            if (selectedWeekDays !== undefined || selectedWeekDays.length > 0) {
                var i = 0;
                for (i = 0; i < selectedWeekDays.length; i++) {
                    var weekDay = selectedWeekDays[i];

                    //$weeks
                    var endTimeInSeconds = moment.duration(moment(sch.active_end_time).diff(moment(sch.active_end_time).startOf('day').toDate())).asSeconds();
                    var activeEndDate = moment(sch.active_end_date).startOf('days').add(endTimeInSeconds, 'seconds').toDate();

                    var startTimeInSeconds = moment.duration(moment(sch.active_start_time).diff(moment(sch.active_end_time).startOf('day').toDate())).asSeconds();
                    var nextDate = moment(sch.active_start_date).startOf('days').add(startTimeInSeconds, 'seconds').toDate();

                    if (moment(nextDate).isoWeekday() <= schedulerData.momentWeek[weekDay.value])
                        nextDate = moment(nextDate).isoWeekday(schedulerData.momentWeek[weekDay.value]).toDate();
                    else
                        nextDate = moment(nextDate).add(1, 'weeks').isoWeekday(schedulerData.momentWeek[weekDay.value]).toDate();

                    while (moment(nextDate).isAfter(activeEndDate) === false) {
                        var s = sch.freq_subday_type;
                        if (occuranceChoice === false && (s === 2 || s === 4 || s === 8)) {
                            var nextTime = nextDate;
                            var nextEndTime = moment(nextDate).startOf('days').add(endTimeInSeconds, 'seconds').toDate();

                            while (moment(nextTime).isAfter(nextEndTime) === false) {
                                if (sch.duration_interval > 0) {
                                    endDate = moment(nextTime).add(sch.duration_interval, schedulerData.momentTimeValue[sch.duration_subday_type]).toDate();
                                }
                                events.push({ start: nextTime, end: endDate });

                                nextTime = moment(nextTime).add(sch.freq_subday_interval, schedulerData.momentTimeValue[sch.freq_subday_type]).toDate();
                            }
                        } else {
                            if (sch.duration_interval > 0) {
                                endDate = moment(nextDate).add(sch.duration_interval, schedulerData.momentTimeValue[sch.duration_subday_type]);
                            }
                            events.push({ start: nextDate, end: endDate });
                        }

                        nextDate = moment(nextDate).add(sch.freq_recurrence_factor, 'weeks').startOf('days').add(startTimeInSeconds, 'seconds').toDate();
                    }//end outer while
                }//end for loop
            }//end if selectedWeekDays
            break;
        case 16: //FreqType.Monthly:
            var endTimeInSeconds = moment.duration(moment(sch.active_end_time).diff(moment(sch.active_end_time).startOf('day').toDate())).asSeconds();
            var activeEndDate = moment(sch.active_end_date).startOf('days').add(endTimeInSeconds, 'seconds').toDate();

            var startTimeInSeconds = moment.duration(moment(sch.active_start_time).diff(moment(sch.active_end_time).startOf('day').toDate())).asSeconds();
            var nextDate = moment(sch.active_start_date).startOf('month').add(sch.freq_interval - 1, 'days').add(startTimeInSeconds, 'seconds').toDate();

            if (moment(nextDate).isBefore(sch.active_start_date) === true)
                nextDate = moment(nextDate).add(1, 'month').toDate();

            while (moment(nextDate).isAfter(activeEndDate) === false) {
                var s = sch.freq_subday_type;
                if (occuranceChoice === false && (s === 2 || s === 4 || s === 8)) {
                    var nextTime = nextDate;
                    var nextEndTime = moment(nextDate).startOf('days').add(endTimeInSeconds, 'seconds').toDate();

                    while (moment(nextTime).isAfter(nextEndTime) === false) {
                        if (sch.duration_interval > 0) {
                            endDate = moment(nextTime).add(sch.duration_interval, schedulerData.momentTimeValue[sch.duration_subday_type]).toDate();
                        }
                        events.push({ start: nextTime, end: endDate });

                        nextTime = moment(nextTime).add(sch.freq_subday_interval, schedulerData.momentTimeValue[sch.freq_subday_type]).toDate();
                    }
                } else {
                    if (sch.duration_interval > 0) {
                        endDate = moment(nextDate).add(sch.duration_interval, schedulerData.momentTimeValue[sch.duration_subday_type]);
                    }
                    events.push({ start: nextDate, end: endDate });
                }

                nextDate = moment(nextDate).add(sch.freq_recurrence_factor, 'month').startOf('month').add(sch.freq_interval - 1, 'days').add(startTimeInSeconds, 'seconds').toDate();
            }//end outer while
            break;
        case 32: //FreqType.MonthlyRelativeToFreqInterval:
            var endTimeInSeconds = moment.duration(moment(sch.active_end_time).diff(moment(sch.active_end_time).startOf('day').toDate())).asSeconds();
            var activeEndDate = moment(sch.active_end_date).startOf('days').add(endTimeInSeconds, 'seconds').toDate();

            var startTimeInSeconds = moment.duration(moment(sch.active_start_time).diff(moment(sch.active_end_time).startOf('day').toDate())).asSeconds();
            var activeStartDate = moment(sch.active_start_date).startOf('days').add(startTimeInSeconds, 'seconds').toDate();
            nextDate = activeStartDate;

            var firstSecThrdFrthLast = Math.log2(sch.freq_relative_interval);
            var weekdayWeekendSunToMon = sch.freq_interval;

            while (moment(nextDate).isAfter(activeEndDate) === false) {
                var startOfMonth = moment(nextDate).startOf('month').toDate();
                var endOfMonth = moment(nextDate).endOf('month').startOf('day').toDate();

                if (weekdayWeekendSunToMon >= 1 && weekdayWeekendSunToMon <= 7) {//sunday to saturday
                    var s = (moment(startOfMonth).weekday() <= weekdayWeekendSunToMon ? weekdayWeekendSunToMon - moment(startOfMonth).weekday()
                        : 7 - moment(startOfMonth).weekday() + weekdayWeekendSunToMon) % 7;

                    var e = (moment(endOfMonth).weekday() >= weekdayWeekendSunToMon ? -1 * (moment(endOfMonth).weekday() - weekdayWeekendSunToMon)
                        : -1 * (7 - weekdayWeekendSunToMon + moment(endOfMonth).weekday())) % 7;

                    var first = moment(startOfMonth).add(s, 'days').toDate();
                    var last = moment(endOfMonth).add(e, 'days').toDate();

                    var nth = moment(first).add(firstSecThrdFrthLast, 'weeks').toDate();
                    if (moment(nth).isAfter(last))
                        nth = last;

                    nextDate = moment(nth).add(startTimeInSeconds, 'seconds').toDate();
                }
                else if (weekdayWeekendSunToMon === 8) {//day
                    if (firstSecThrdFrthLast === 4) {//last day of the month
                        nextDate = moment(endOfMonth).add(startTimeInSeconds, 'seconds').toDate();
                    }
                    else {//1st or 2nd or 3rd or 4th day of the month
                        nextDate = moment(startOfMonth).add(firstSecThrdFrthLast, 'days').add(startTimeInSeconds, 'seconds').toDate();
                    }
                }
                else if (weekdayWeekendSunToMon === 9) {//weekday
                    var day = 0;
                    if (firstSecThrdFrthLast === 4) {//last day of the month
                        day = moment(endOfMonth).weekday();
                        if (day === 0) {//end of the month is sunday
                            nextDate = moment(endOfMonth).add(-2, 'days').add(startTimeInSeconds, 'seconds').toDate();//subtract saturday and sunday
                        } else if (day === 6) {//end of the month is saturday
                            nextDate = moment(endOfMonth).add(-1, 'days').add(startTimeInSeconds, 'seconds').toDate();//subtract saturday
                        } else {
                            nextDate = moment(endOfMonth).add(startTimeInSeconds, 'seconds').toDate();//its already a weekday
                        }
                    }
                    else {//1st or 2nd or 3rd or 4th day of the month
                        day = moment(startOfMonth).weekday();
                        day = day === 0 ? 7 : day;

                        if (day + firstSecThrdFrthLast < 6) {
                            nextDate = moment(startOfMonth).add(firstSecThrdFrthLast, 'days').add(startTimeInSeconds, 'seconds').toDate();
                        }
                        else {
                            var delta = day < 7 ? 2 : 1;
                            nextDate = moment(startOfMonth).add(firstSecThrdFrthLast + delta, 'days').add(startTimeInSeconds, 'seconds').toDate();
                        }
                    }
                }
                else if (weekdayWeekendSunToMon === 10) {//weekend day
                    if (firstSecThrdFrthLast === 4) {//last weekend day
                        day = moment(endOfMonth).weekday();
                        if ((new Set([1, 2, 3, 4, 5])).has(day) === true) {//end of the month is any weekday
                            nextDate = moment(endOfMonth).add(-1 * day, 'days').add(startTimeInSeconds, 'seconds').toDate();
                        } else {//end of the month is any weekend day
                            nextDate = moment(endOfMonth).add(startTimeInSeconds, 'seconds').toDate();
                        }
                    }
                    else {//1st, 2nd, 3rd, 4th weekend day
                        day = moment(startOfMonth).weekday();
                        var delta = 0;
                        if (day !== 0) {//1st of the month is anything other than Sunday
                            var delta = 6 - day + ((firstSecThrdFrthLast <= 1) ? firstSecThrdFrthLast : 7 + firstSecThrdFrthLast % 2);
                            nextDate = moment(startOfMonth).add(delta, 'days').add(startTimeInSeconds, 'seconds').toDate();
                        } else if (day === 0) {//1st of the month is Sunday //(1st Oct 2017 = Sunday i.e. day == 0)
                            if (firstSecThrdFrthLast === 0) {//first weekend day
                                nextDate = moment(startOfMonth).add(startTimeInSeconds, 'seconds').toDate();
                            } else if ((new Set([1, 2])).has(firstSecThrdFrthLast) === true) {//2nd or 3rd weekend day
                                //move to saturday of next week from sunday of current week
                                nextDate = moment(startOfMonth).add(6 + firstSecThrdFrthLast - 1, 'days').add(startTimeInSeconds, 'seconds').toDate();
                            } else if (firstSecThrdFrthLast === 3) {//4th weekend day
                                nextDate = moment(startOfMonth).add(1, 'week').add(6, 'days').add(startTimeInSeconds, 'seconds').toDate();
                            }
                        }
                    }
                }

                var s = sch.freq_subday_type;
                if (occuranceChoice === false && (s === 2 || s === 4 || s === 8)) {
                    var nextTime = nextDate;
                    var nextEndTime = moment(nextDate).startOf('days').add(endTimeInSeconds, 'seconds').toDate();

                    while (moment(nextTime).isAfter(nextEndTime) === false) {
                        if (sch.duration_interval > 0) {
                            endDate = moment(nextTime).add(sch.duration_interval, schedulerData.momentTimeValue[sch.duration_subday_type]).toDate();
                        }
                        events.push({ start: nextTime, end: endDate });

                        nextTime = moment(nextTime).add(sch.freq_subday_interval, schedulerData.momentTimeValue[sch.freq_subday_type]).toDate();
                    }
                } else {
                    if (sch.duration_interval > 0) {
                        endDate = moment(nextDate).add(sch.duration_interval, schedulerData.momentTimeValue[sch.duration_subday_type]).toDate();
                    }
                    events.push({ start: nextDate, end: endDate });
                }

                nextDate = moment(nextDate).add(sch.freq_recurrence_factor, 'month').startOf('month').add(startTimeInSeconds, 'seconds').toDate();
            }//end While loop
            break;
    } //END SWITCH FreqType variations


    return events;
};

// export const init = () => {
//     freq_type = 4;
//     weeks = new Array(7);
// };