import moment from 'moment';
import { GENERATE_DESC, GENERATE_EVENTS } from './types';

export const generateDescription = () => (dispatch) => {
    console.log('do somethign in scheduleAction');
    dispatch({
        schedule: {
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
        }
    });
}

export default generateDescription; 