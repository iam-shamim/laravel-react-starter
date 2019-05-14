import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'

export default function (ComposedComponent) {
    class Authenticate extends Component{
        componentWillUpdate(nextProps){
            if(nextProps.isAuthenticated === false){
                this.props.history.push('/login');
            }
        }
        render() {
            if(!this.props.isAuthenticated){
                return <Redirect  to="/login" />
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