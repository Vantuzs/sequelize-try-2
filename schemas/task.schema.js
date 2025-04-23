const yup = require('yup');

module.exports.TASK_SCHEMA_VALIDATE = yup.object({
    body: yup.string().required().min(1),
    isDone: yup.boolean().required(),
    deadline: yup.date()
})