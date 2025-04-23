// const { where } = require('sequelize');
const {User} = require('../models/index');

module.exports.createUser = async(req,res,next) => {
    try {
        const {body} = req;
        const createdUser = await User.create(body);
        return res.status(201).send(createdUser);
    } catch (error) {
        next(error)
    }
}

module.exports.findAll = async(req,res,next) =>{
    try {
        const resultsArray = await User.findAll();
        return res.status(200).send(resultsArray)
    } catch (error) {
        next(error)
    }
}

module.exports.findByPk = async(req,res,next) =>{
    try {
        const {userInstance} = req;

        return res.status(200).send(userInstance);
    } catch (error) {
        next(error)
    }
}

module.exports.deleteByPk = async(req,res,next)=>{
    const {params: {userId}} = req;

    const findUser = await User.findByPk(userId);
    const deleteUser = await User.destroy({where: {userId}})
    if(deleteUser){
        return res.status(200).send(findUser)
    }
    return res.status(404).send('User not found')
}   
// static method
// module.exports.updateByPk = async(req,res,next) =>{
//     try {
//         const {params: {id},body} = req;

//         const updateUser = await User.update(body,{where:{id},returning: true})
//         return res.status(200).send(updateUser)
//     } catch (error) {
//         next(error)
//     }
// }

module.exports.updateByPk = async(req,res,next) =>{
    try {
        const {userInstance,body} = req;
        const {id} =  userInstance

        const updateUser = await userInstance.update(body);
        return res.status(200).send(updateUser,{where:{id},returning: true})
    } catch (error) {
        next(error)
    }
}