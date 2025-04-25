const {Task,User} = require('../models');

module.exports.createTask = async(req,res,next) =>{
    try {
        const {userInstance,body} = req;
        // 2. Нужно создать таску найденому юзеру// parent.createChild(body)
        const createdTask = await userInstance.createTask(body);
        return res.status(201).send(createdTask)
    } catch (error) {
        next(error)
    }
}

module.exports.getAllUserTask = async(req,res,next) =>{
    try {
        const {userInstance, pagination} = req;

        const allTasks = await userInstance.getTasks({
            ...pagination
        })
        return res.status(200).send(allTasks)
    } catch (error) {
        next(error)
    }
}

module.exports.getCountOfTasks = async(req,res,next) =>{
    try {
        const {userInstance} = req;

        const countTasks = await userInstance.countTasks()

        return res.status(200).send(countTasks)
    } catch (error) {
        next(error)
    }
}