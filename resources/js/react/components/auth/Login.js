import React,{ Component } from 'react';
import {NavLink} from 'react-router-dom'
import server from '../../server';
import {connect} from 'react-redux'
import {login} from '../../store/action/authAction'
import AlertUI from '../UI/AlertUI'

class Login extends Component{
    state = {
        form:{
            email: '',
            password: '',
            remember: ''
        },
        form_button_disabled: false
    };
    inputValue  = (state, key, initialValue=false)=>{
        return {
            name: key,
            value: initialValue?initialValue:state[key],
            onChange: this.onChange
        }
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
    onSubmit = (e)=> {
        e.preventDefault();
        this.setState({
            form_button_disabled: true
        });
        this.props.login(this.state.form).then(()=>{
            this.setState({form_button_disabled: false});
        }).catch((error)=>{
            console.log(error.response);
        });
    };
    render(){
        console.log('Login render -> '+new Date().toLocaleTimeString());
        return (
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form method="POST" action="/login" onSubmit={this.onSubmit}>
                                <AlertUI msg="Give it a click if you like.  " />
                                <div className="form-group row">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                    <div className="col-md-6">
                                        <input id="email" type="email" className="form-control" {...this.inputValue(this.state.form,'email')} required autoFocus />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                    <div className="col-md-6">
                                        <input id="password" type="password" className="form-control" {...this.inputValue(this.state.form,'password')} required />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-md-6 offset-md-4">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" {...this.inputValue(this.state.form,'remember','on')} id="remember" />
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
export default connect(false,{login})(Login);