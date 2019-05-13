import server from '../../server';
import { SET_LOGIN_USER, LOGOUT } from './types';
import errorCatch from '../../utils/errorCatch'


const setCurrentUser = user => ({type: SET_LOGIN_USER, user: user});
const setLogout = ()=> ({type: LOGOUT});

export const logout = () => {
    console.log("Logout");
    return dispatch => {
        return server.post('/api/logout').then((res)=>{
            dispatch(setLogout());
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