import React, { Component } from 'react';
import { connect } from 'react-redux'

class Nav extends Component {
    render() {
        console.log('Nav render -> '+new Date().toLocaleTimeString())
        let loginReg = "";
        let withAuth = "";
        if(!this.props.isAuthenticated) {
            loginReg = (
                <React.Fragment>
                    <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
                    <li className="nav-item"><a className="nav-link" href="/register">Register</a></li>
                </React.Fragment>
            );
        }else{
            withAuth = (
                <li className="nav-item dropdown">
                    <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        { this.props.user.name } <span className="caret"></span>
                    </a>

                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/logout">
                            Logout
                        </a>
                    </div>
                </li>
            )
        }
        return (
            <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        Shopint Cart
                    </a>
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
export default connect(mapStateToProps,null)(Nav);