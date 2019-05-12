import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
class Home extends Component {
    render() {
        console.log('Home render -> '+new Date().toLocaleTimeString());
        return (
            <div>
                Home
            </div>
        );
    }
}
export default Home;