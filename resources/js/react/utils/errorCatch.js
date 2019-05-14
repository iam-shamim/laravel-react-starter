export default function errorCatch(err) {
    const error = new Error(err.message);
    error.response = (err.response && err.response.data.msg)? err.response.data:({
        'status': 'error',
        'error_type':'server',
        'msg': 'Server Error. Try again!'
    });
    throw error;
}