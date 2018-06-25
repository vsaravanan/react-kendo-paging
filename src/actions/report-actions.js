import axios from 'axios';
import { FETCH_MIN_MAX, FETCH_ARTICLE59, FETCH_PRODUCTS, SHOW_ERROR } from 'actions';

export const fetchMinMax = () => (dispatch) => {

    axios.get(`http://localhost:2990/min_max_data`)
    .then(res => {
        dispatch({
            type: FETCH_MIN_MAX,
            payload: res.data,
        });
      })
      .catch(error => {
        console.error(`error: ${error}`);
        dispatch({
            type: SHOW_ERROR,
            payload: error.response
        });
      });

}


export const fetchArticle59 = () => (dispatch) => {

    axios.get(`http://localhost:2990/article59_data`)
    .then(res => {
        dispatch({
            type: FETCH_ARTICLE59,
            payload: res.data,
        });
      })
      .catch(error => {
        console.error(`error: ${error}`);
        dispatch({
            type: SHOW_ERROR,
            payload: error.response
        });
      });

}

export const fetchProducts = () => (dispatch) => {

    axios.get(`http://localhost:2990/products`)
    .then(res => {
        dispatch({
            type: FETCH_PRODUCTS,
            payload: res.data,
        });
      })
      .catch(error => {
        console.error(`error: ${error}`);
        dispatch({
            type: SHOW_ERROR,
            payload: error.response
        });
      });

}
