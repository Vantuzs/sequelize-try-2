const {Group,User} = require('../models');

module.exports.createGroup = async(req,res,next) =>{
    try {
        const {body} = req;

        const createdGroup = await Group.create(body);

        return res.status(201).send(createdGroup)
    } catch (error) {
        next(error)
    }
}

module.exports.addUserToGroup = async(req,res,next) =>{
    try {
        const {userInstance,params: {groupId}} = req;
        const groupInstance = await Group.findByPk(groupId);

        const result = await groupInstance.addUser(userInstance);

        return res.status(200).send('User successfully added to group')
        
    } catch (error) {
        next(error)
    }
}

module.exports.getAllGroupToUser = async (req,res,next) =>{
    try {
        const {userInstance} = req;

        const result = await userInstance.getGroups();
        return res.status(200).send(result);
    } catch (error) {
        next(error)
    }
}

module.exports.deleteUserFromGroup = async(req,res,next) =>{
    try {
        const {userInstance,params: {groupId}} = req;
        // 1. Найти сущность групы, с которой мы удаляем пользователя
        const groupInstance = await Group.findByPk(groupId);
        const result = await groupInstance.removeUser(userInstance);
        if(result) {
            return res.status(200).send(userInstance)
        } else{
            return res.status(400).send('User is never been in this group')
        }
    } catch (error) {
        next(error)
    }
}


module.exports.getOneGroupWithAllMembers = async(req,res,next) =>{
    try {
        const {params: {groupId}} = req;

        const groupWithUser = await Group.findAll({
            where: {
                id: groupId
            },
            include: [{
                model: User,
                attributes: {
                    exclude: ['password']
                }
            }]
        });

        return res.status(200).send(groupWithUser)
    } catch (error) {
        next(error);
    }
}