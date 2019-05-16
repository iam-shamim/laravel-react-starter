import React, {Component} from 'react';
import {connect} from 'react-redux';
import {resetPassword} from '../../store/action/authAction';
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
            email: ''
        },
        form_button_disabled: false,
        errors: new Validator({},{}).errors
    };
    onSubmit = (e)=> {
        e.preventDefault();
        this.setState({form_button_disabled: true});
        let rules = {
            email: 'required|email'
        };
        const validation = new Validator(this.state.form, rules);
        if(validation.passes()){
            this.setState({errors: validation.errors});
            this.props.resetPassword(this.state.form).then((res)=>{
                this.setState({...this.state, form:{email: ''}});
                toastr.success('Success',res.data.msg);
                this.setState({form_button_disabled: false, errors: validation.errors});
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
        console.log('Password Reset render -> '+new Date().toLocaleTimeString());
        const {inputValue, errorMsg} = this.props;
        return (
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Reset Password</div>
                        <div className="card-body">
                            <form method="POST" onSubmit={this.onSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                    <div className="col-md-6">
                                        <input id="email" type="email" {...inputValue({key:'email'})} autoFocus />
                                        { errorMsg({key: 'email', errorsKey: 'errors'}) }
                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-6 offset-md-4">
                                        <button type="submit" className="btn btn-primary disabled_loading" disabled={this.state.form_button_disabled}>
                                            <i className="fa-custom fa-refresh-custom fa-spin-custom"></i> Login
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
export default connect(false,{resetPassword})(FormHandler(Login));