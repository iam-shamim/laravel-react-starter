import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
    class Authenticate extends Component{
        render() {
            if(this.props.isAuthenticated){
                this.props.history.replace('/');
                return false;
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