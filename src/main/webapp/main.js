import React from 'react';
import ReactDOM from 'react-dom';
import Apps from './Apps.jsx';

const Redux = require('redux');
const createStore = Redux.createStore;

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            state = 'LOGGED_IN';
            break;
        default:
        case 'LOGGED_OUT':
            state = 'LOGGED_OUT';
            break;
    }

    return state;
}

const store = createStore(reducer);

const render = () => (
    ReactDOM.render( < Apps store = { store }
        />,
        document.getElementById('apps'))
)

store.subscribe(render);
render();