import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import  { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import {BrowserRouter,Route, Switch} from 'react-router-dom'

import rootReducer from '../rootReducer'

import Nav from './Nav'
import Login from './Login'

export default class App extends Component {
    render() {
        return (
            <div>
                <Nav />
                <main className="py-4">
                    <div className="container">
                        <Switch>
                            <Route path="/login" exact  component={Login} />
                        </Switch>
                        <Login />
                    </div>
                </main>
            </div>
        );
    }
}

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);
if (document.getElementById('root')) {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
}
