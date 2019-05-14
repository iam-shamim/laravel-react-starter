import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../store/action/authAction';

class Nav extends Component {
    render() {
        console.log('Nav render -> '+new Date().toLocaleTimeString());
        let loginReg = "";
        let withAuth = "";
        if(!this.props.isAuthenticated) {
            loginReg = (
                <React.Fragment>
                    <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/register">Register</NavLink></li>
                </React.Fragment>
            );
        }else{
            withAuth = (
                <li className="nav-item dropdown">
                    <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        { this.props.user.name } <span className="caret"></span>
                    </a>

                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        <span className="pointer dropdown-item" onClick={this.props.logout}>
                            Logout
                        </span>
                    </div>
                </li>
            )
        }
        return (
            <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        Shopint Cart
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            {loginReg}
                            { withAuth }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    };
};
export default connect(mapStateToProps,{logout})(Nav);