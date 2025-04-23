const {User} = require('../models');
const {USER_SCHEMA_VALIDATE} = require('../schemas/user.schema');
const UserNotFound = require('../errors/UserNotFound');

module.exports.getUserInstance = async(req,res,next) =>{
    try {
        const {params: {userId}} = req;
        const user = await User.findByPk(userId,{
            attributes: {
                exclude: ['password']
            }
        })
        if(!user){
            throw new UserNotFound('User not found');
        }
        
        req.userInstance = user;
        next();
    } catch (error) {
        next(error);
    }
}


module.exports.validateUser = async(req,res,next) =>{
    try {
        const {body} =  req;

        const validateUser = await USER_SCHEMA_VALIDATE.validate(body);

        if(validateUser){
            next();
        }
    } catch (error) {
        next(error)
    }
}