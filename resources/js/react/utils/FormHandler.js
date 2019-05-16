import React, { Component } from 'react';
import classNames from "classnames";

export default function (ComposedComponent) {
    class FormHandler extends Component{
        initRef = (ref)=>{
            this.child = ref; 
        };
        inputValue  = ({groupKey='form', key, initVal=false, classes='form-control'})=>{
            return {
                name: key,
                value: initVal?initVal:this.child.state[groupKey][key],
                onChange: (e)=>this.onChange(e,groupKey),
                className : classNames(classes,{'is-invalid':this.child.state.errors.has(key)})
            }
        };
        errorMsg = ({key, errorsKey='errors'})=>{
            return this.child.state[errorsKey].has(key) && (<span className="invalid-feedback" role="alert"><strong>{ this.child.state[errorsKey].first(key) }</strong></span>)
        };
        onChange = (e,groupKey) => {
            let value = (e.target.type === 'checkbox' && !e.target.checked)?"":e.target.value;
            this.child.setState({
                ...this.child.state,
                [groupKey]:{
                    ...this.child.state[groupKey],
                    [e.target.name]: value
                }
            });
        };

        addValidationErrors = (validation, resError )=>{
            Object.keys(resError).map((errorKey)=>{
                validation.errors.add(errorKey,resError[errorKey][0]);
                validation.errorCount++;
            });
        };
        render() {
            return <ComposedComponent {...this.props} inputValue={this.inputValue} errorMsg={this.errorMsg} onChange={this.onChange} initRef={this.initRef} addValidationErrors={this.addValidationErrors} />
        }
    }
    return FormHandler;
}