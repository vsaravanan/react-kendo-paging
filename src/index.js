import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk  from 'redux-thunk';
import logger from 'redux-logger';
import allReducers from 'reducers';

import DynamicGrid from './dynamic-grid';

const store = createStore(
    allReducers,
    composeWithDevTools(),
    applyMiddleware(thunk, logger)
);
 
ReactDOM.render(
    <Provider store={store}>
        <DynamicGrid />
    </Provider>,
    document.getElementById('root')
);
