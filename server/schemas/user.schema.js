const yup = require('yup');

module.exports.USER_SCHEMA_VALIDATE = yup.object({
    firstName: yup.string().required().min(1),
    lastName: yup.string().required().min(1),
    email: yup.string().required().email('Email validate error'),
    password: yup.string().required().min(6),
    birthday: yup.date(),
    gender: yup.string()
})