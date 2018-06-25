import { FETCH_MIN_MAX, FETCH_ARTICLE59, FETCH_PRODUCTS } from 'actions';


export default (state = [], action) => {
    switch (action.type) {
        case FETCH_MIN_MAX:
            return {
                ...state,
                min_max : action.payload
            };
        case FETCH_ARTICLE59:
            return {
                ...state,
                article59 : action.payload
            };            
        case FETCH_PRODUCTS:
            return {
                ...state,
                products : action.payload
            };            
        default:
            return state;
    }
}