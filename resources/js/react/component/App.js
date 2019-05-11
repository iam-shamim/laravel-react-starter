import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import reduce from '../store/reducers/reduce'
import  { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';

import Nav from './Nav'

export default class App extends Component {
    render() {
        return (
            <div>
                <Nav />
            </div>
        );
    }
}

const store = createStore(
    reduce,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);
if (document.getElementById('root')) {
    ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
}
