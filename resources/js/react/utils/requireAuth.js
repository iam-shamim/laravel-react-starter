import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
    class Authenticate extends Component{
        componentWillMount(){
            if(!this.props.isAuthenticated){
                this.props.history.push('/login');
            }
        }
        componentWillUpdate(nextProps){
            if(nextProps.isAuthenticated === false){
                this.props.history.push('/login');
            }
        }
        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }
    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    }
    return connect(mapStateToProps)(Authenticate);
}