import { FETCH_MIN_MAX } from 'actions';


export default (state = [], action) => {
    switch (action.type) {
        case FETCH_MIN_MAX:
            return {
                ...state,
                min_max : action.payload
            };
        default:
            return state;
    }
}