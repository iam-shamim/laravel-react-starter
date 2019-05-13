export default function errorCatch(err) {
    const error = new Error(err.response.statusText);
    error.response = err.response.data;
    if(!err.response.data.msg){
        error.response = {
            'status': 'error',
            'error_type':'server',
            'msg': 'Server Error. Try again!'
        };
    }
    throw error;
}