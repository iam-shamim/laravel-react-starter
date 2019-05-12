import React from 'react';
import {NavLink} from 'react-router-dom'
import axios from 'axios';
export default ()=>{
    const onSubmit = (e)=> {
        e.preventDefault();
        axios.post('/api/login',{
            email: e.target.email.value,
            email: e.target.email.value,
            remember: e.target.remember.checked
        }).then((res)=>{
            console.log('res:',res);
        }).catch((err)=>{
            console.log(err);
        });
    };
    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">Login</div>

                    <div className="card-body">
                        <form method="POST" action="/login" onSubmit={onSubmit}>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                <div className="col-md-6">
                                    <input id="email" type="email" className="form-control" name="email" required autoFocus />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                <div className="col-md-6">
                                    <input id="password" type="password" className="form-control" name="password" required />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-md-6 offset-md-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="remember" id="remember" />
                                        <label className="form-check-label" htmlFor="remember">Remember Me</label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row mb-0">
                                <div className="col-md-8 offset-md-4">
                                    <button type="submit" className="btn btn-primary">
                                        <i className="fa fa-refresh fa-spin"></i> Login
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