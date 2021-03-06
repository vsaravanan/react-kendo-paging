import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk  from 'redux-thunk';
import logger from 'redux-logger';
import allReducers from 'reducers';

//import MinMaxPage from 'pages/minmaxpage';
//import Products from 'pages/products';
import Main from 'pages/mainpage';

import 'extra.css';

const store = createStore(
    allReducers,
    composeWithDevTools(),
    applyMiddleware(thunk, logger)
);
 
ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('root')
);
