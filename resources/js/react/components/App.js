import React, { Component, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import  { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import {BrowserRouter,Route, Switch} from 'react-router-dom'

import rootReducer from '../rootReducer'
import {component_load} from '../utils/component_load';
import notAuth from '../utils/notAuth';
import requireAuth from '../utils/requireAuth';
import Nav from './Nav'
import Home from './Home';

export default class App extends Component {
    render() {
        return (
            <div>
                <Nav />
                <main className="py-4">
                    <div className="container">
                        <Switch>
                            <Route path="/" exact  component={requireAuth(Home)} />
                            <Route path="/login" exact  component={notAuth(component_load('auth/Login'))} />
                            <Route path="/register" exact  component={notAuth(component_load('auth/Signup'))} />
                            <Route path="/password/reset" exact  component={notAuth(component_load('auth/PasswordReset'))} />
                        </Switch>
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
