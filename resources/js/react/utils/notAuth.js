import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'

export default function (ComposedComponent) {
    class Authenticate extends Component{
        render() {
            if(this.props.isAuthenticated){
                return <Redirect  to="/" />
            }else{
                return (
                    <ComposedComponent {...this.props} />
                );   
            }
        }
    }
    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    }
    return connect(mapStateToProps)(Authenticate);
}