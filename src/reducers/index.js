import { combineReducers, CombineReducers } from 'redux';
import scheduleReducer from './scheduleReducer';

export default combineReducers({ 
    schedule: scheduleReducer 
});