const {TASK_SCHEMA_VALIDATE} = require('../schemas/task.schema');

module.exports.validateTask = async(req,res,next) =>{
    try {
        const {body} = req;

        const validateTask = await TASK_SCHEMA_VALIDATE.validate(body);
        if(validateTask){
            next()
        }
    } catch (error) {
        next(error)
    }
}