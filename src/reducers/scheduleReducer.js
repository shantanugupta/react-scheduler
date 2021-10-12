import { GENERATE_DESC, GENERATE_EVENTS } from './../actions/types';

const initialState = {
    schedule: {}
}

export default function (state = initialState, action) {
    console.log('scheduleReducer called');
    switch (action.type) {
        case GENERATE_DESC:
            return {
                ...state
            }
        default:
            return state;
    }
}