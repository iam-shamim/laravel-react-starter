import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../store/action/authAction';
import { toastr } from 'react-redux-toastr';
import Validator from 'validatorjs';
import FormHandler from '../../utils/FormHandler';

class Login extends Component{
    constructor(props){
        super(props);
        this.props.initRef(this);
    }
    state = {
        form:{
            email: '',
            password: '',
            remember: ''
        },
        form_button_disabled: false,
        errors: new Validator([],[]).errors
    };
    onSubmit = (e)=> {
        e.preventDefault();
        this.setState({form_button_disabled: true});
        let rules = {
            email: 'required|email',
            password: 'required|min:6'
        };
        const validation = new Validator(this.state.form, rules);
        if(validation.passes()){
            this.setState({errors: validation.errors});
            this.props.login(this.state.form).then(()=>{
                toastr.success('Success','Login succeed');
            }).catch((error)=>{
                toastr.error('Error',error.response.msg);
                this.setState({form_button_disabled: false});
            });
        }else{
            this.setState({form_button_disabled: false, errors: validation.errors});
        }
    };
    render(){
        console.log('Login render -> '+new Date().toLocaleTimeString());
        const {inputValue, errorMsg} = this.props;
        return (
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form method="POST" onSubmit={this.onSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                    <div className="col-md-6">
                                        <input id="email" type="email" {...inputValue({key:'email', groupKey:'form'})} autoFocus />
                                        { errorMsg({key: 'email', errorsKey: 'errors'}) }
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                    <div className="col-md-6">
                                        <input id="password" type="password" {...inputValue({ key:'password'})} />
                                        { errorMsg({key: 'password'}) }
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-md-6 offset-md-4">
                                        <div className="form-check">
                                            <input type="checkbox" {...inputValue({key: 'remember',initVal: 'on',classes:'form-check-input' })} id="remember" />
                                            <label className="form-check-label" htmlFor="remember">Remember Me</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-8 offset-md-4">
                                        <button type="submit" className="btn btn-primary disabled_loading" disabled={this.state.form_button_disabled}>
                                            <i className="fa-custom fa-refresh-custom fa-spin-custom"></i> Login
                                        </button>
                                        <NavLink className="btn btn-link" to="/password/reset">Forgot Your Password?</NavLink>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(false,{login})(FormHandler(Login));