const initial_state = {
    ...page_data
};
import { SET_LOGIN_USER, LOGOUT } from '../action/types';
export default (state = initial_state, action)=>{
    switch (action.type){
        case SET_LOGIN_USER:
            return {...state, isAuthenticated: true, user: action.user};
        case LOGOUT:
            return { ...state, isAuthenticated: false,user: {} };
        default:
            return state
    }
}