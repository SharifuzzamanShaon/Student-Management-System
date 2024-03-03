function error(msg = 'Something error occured', status = 500) {
    const e = new Error(msg)
    e.status = status
    return e;
}


function authorizationError(){
    const e = new Error();
    e.message ="unauthorized access";
    e.status=401;
}
module.exports = {error, authorizationError}