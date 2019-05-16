import React, {Component} from 'react';
import {connect} from 'react-redux';
import {resetPasswordAction} from '../../store/action/authAction';
import { toastr } from 'react-redux-toastr';
import Validator from 'validatorjs';
import FormHandler from '../../utils/FormHandler';
class PasswordResetConfirm extends Component{
    constructor(props){
        super(props);
        this.props.initRef(this);
    }
    state = {
        form:{
            email: '',
            password: '',
            password_confirmation:''
        },
        form_button_disabled: false,
        errors: new Validator([],[]).errors
    };
    onSubmit = (e)=> {
        e.preventDefault();
        this.setState({form_button_disabled: true});
        let rules = {
            email: 'required|email',
            password: 'required|min:6|confirmed',
            password_confirmation: 'required|min:6'
        };
        const validation = new Validator(this.state.form, rules);
        if(validation.passes()){
            this.setState({errors: validation.errors});
            this.props.resetPasswordAction({...this.state.form,token: this.props.match.params.token}).then((res)=>{
                this.setState({...this.state, form:{email: '', password: '', password_confirmation:''}});
                this.setState({form_button_disabled: false, errors: validation.errors});
                toastr.success('Success',res.data.msg);
                this.props.history.push('/login');
            }).catch((error)=>{
                toastr.error('Error',error.response.msg);
                if(error.response.error_type === "validation_error"){
                    this.props.addValidationErrors(validation, error.response.errors);
                }
                this.setState({form_button_disabled: false, errors: validation.errors});
            });
        }else{
            this.setState({form_button_disabled: false, errors: validation.errors});
        }
    };
    render(){
        console.log('Password reset confirm-> '+new Date().toLocaleTimeString());
        const {inputValue, errorMsg} = this.props;
        return (
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Reset Password</div>

                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                    <div className="col-md-6">
                                        <input id="email" type="email" {...inputValue({key:'email'})}/>
                                        { errorMsg({key: 'email'}) }
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                    <div className="col-md-6">
                                        <input id="password" type="password" {...inputValue({key:'password'})} />
                                        { errorMsg({key: 'password'}) }
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-right">Confirm Password</label>

                                    <div className="col-md-6">
                                        <input id="password-confirm" type="password" {...inputValue({key:'password_confirmation'})} />
                                        { errorMsg({key: 'password_confirmation'}) }
                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-6 offset-md-4">
                                        <button type="submit" className="btn btn-primary disabled_loading" disabled={this.state.form_button_disabled}>
                                            <i className="fa-custom fa-refresh-custom fa-spin-custom"></i>
                                            Register
                                        </button>
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
export default connect(false,{resetPasswordAction})(FormHandler(PasswordResetConfirm));