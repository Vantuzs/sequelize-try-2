const {ValidationError} = require('yup');
const UserNotFound = require('./errors/UserNotFound');

module.exports.errorHandler = (err,req,res,next) =>{
    if(err instanceof ValidationError){
        return res.status(400).send(err.message);
    }

    if(err instanceof UserNotFound){
        return res.status(404).send(err.message)
    }
    console.log('err --->>>', err);
    return res.status(err.status ?? 500).send(err.message ?? 'Server error')
}