import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';

const initiateState = {};
const middleware = [thunk];
const store = createStore(
    rootReducer,
    initiateState,
    componse(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));
export default store;