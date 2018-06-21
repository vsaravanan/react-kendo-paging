import axios from 'axios';
import { FETCH_MIN_MAX, SHOW_ERROR } from 'actions';

export const fetchMinMax = () => (dispatch) => {

    axios.get(`http://localhost:2990/products`)
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


// export const fetchData = (url) => (dispatch) => {
//     //let url = 'http://localhost:2990/products';
//     axios.get(`${url}`)
//     .then(res => {
//         dispatch({
//             type: FETCH_MIN_MAX,
//             payload: res.data,
//         });
//       })
//       .catch(error => {
//         console.error(`error: ${error}`);
//         dispatch({
//             type: SHOW_ERROR,
//             payload: error.response
//         });
//       });

// }

