import {combineReducers} from 'redux';
import reportReducer from 'reducers/report-reducers';

 
const allReducers = combineReducers({
    report: reportReducer
});

export default allReducers