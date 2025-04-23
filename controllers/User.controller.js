// const { where } = require('sequelize');
const UserNotFound = require('../errors/UserNotFound');
const {User, Group} = require('../models/index');

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
/*
// В ответе получить инфу про сутность Юзера + инфу про все групы, в которых этот узер находится
// Это пример Lazy Loading
module.exports.getUserWithGroup = async(req,res,next) =>{
    try {
        // 1. Сперва мы вытягиваем с БД юзера, сутность которого хотим получить
        const {params: {userId}} = req;
        const userInstance = await User.findByPk(userId);
        if(!userInstance) {
            throw new UserNotFound();
        }

        // 2. Вытягиваем все групы юзера (магичный метод)
        const groupsArray = await userInstance.getGroups();

        // 3. Мы получили и юзера и групы в п.1, п.2 
        // Складываем результат как нам нужно

        return res.status(200).send({data: {userInstance,groupsArray}})


    } catch (error) {
        next(error)
    }
}
*/

// Голодная(моментальная) загрузка
module.exports.getUserWithGroup = async(req,res,next) =>{
    try {
        const {params: {userId}} = req;
        // Получам и юзера и его групы за ОДИН запрос
        const userWithGroups = await User.findByPk(userId,{
            attributes: ['id','firstName','lastName'],
            include: {
                model: Group,
                required: true,
                through: { // От это настраивает связующую таблицу
                    attributes: [] // работает на связующую таблицу
                },
                attributes: ['id','name']
            }
        })

        if(!userWithGroups){
            throw new UserNotFound()
        }
        

        return res.status(200).send(userWithGroups)
    } catch (error) {
        next(error)
    }
}