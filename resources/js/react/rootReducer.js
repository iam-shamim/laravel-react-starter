import {combineReducers} from 'redux';
import auth from './store/reducers/auth';
import {reducer as toastrReducer} from 'react-redux-toastr'

export default combineReducers({
    auth,
    toastr: toastrReducer
});