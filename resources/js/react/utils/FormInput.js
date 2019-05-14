import React, { Component } from 'react';
import classNames from "classnames";

export default class FormInput extends Component{
    inputValue  = ({state, key, initVal=false, classes='form-control'})=>{
        return {
            name: key,
            value: initVal?initVal:state[key],
            onChange: this.onChange,
            className : classNames(classes,{'is-invalid':this.state.errors.has(key)})
        }
    };
    errorMsg = ({errors, key})=>{
        return errors.has(key) && (<span className="invalid-feedback" role="alert"><strong>{ errors.first(key) }</strong></span>)
    };
    onChange = (e) => {
        let value = (e.target.type === 'checkbox' && !e.target.checked)?"":e.target.value;
        this.setState({
            ...this.state,
            form:{
                ...this.state.form,
                [e.target.name]: value
            }
        });
    };
} 