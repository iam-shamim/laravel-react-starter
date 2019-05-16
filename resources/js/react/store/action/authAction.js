import server from '../../server';
import { SET_LOGIN_USER, LOGOUT } from './types';
import errorCatch from '../../utils/errorCatch'
import { toastr } from 'react-redux-toastr';


const setCurrentUser = user => ({type: SET_LOGIN_USER, user: user});
const setLogout = ()=> ({type: LOGOUT});

export const logout = () => {
    console.log("Logout");
    return dispatch => {
        return server.post('/api/logout').then((res)=>{
            dispatch(setLogout());
            toastr.success('Success','Logout succeed');
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const login = (data) => {
    return dispatch => {
        return server.post('/api/login',data).then((res)=>{
            dispatch(setCurrentUser(res.data));
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const resetPassword = (data)=>{
    return dispatch => {
        return server.post('/api/password/email',data).then((res)=>{
            return res;
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};
export const signup = (data) => {
    return dispatch => {
        return server.post('/api/register',data).then((res)=>{
            return res;
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};

export const resetPasswordAction = (data) => {
    return dispatch => {
        return server.post('/api/password/reset',data).then((res)=>{
            return res;
        }).catch((err)=>{
            return errorCatch(err);
        });
    };
};