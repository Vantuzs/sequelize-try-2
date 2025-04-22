const {Task,User} = require('../models');

module.exports.createTask = async(req,res,next) =>{
    try {
        const {params: {userId},body} = req;
        // 1. Нужно найти юзера которому мы хотим создать таску
        const foundUser = await User.findByPk(userId);
        // 2. Нужно создать таску найденому юзеру// parent.createChild(body)
        const createdTask = await foundUser.createTask(body);
        return res.status(201).send(createdTask)
    } catch (error) {
        next(error)
    }
}

module.exports.getAllUserTask = async(req,res,next) =>{
    try {
        const {params: {userId}} = req;
        const user = await User.findByPk(userId);

        const allTasks = await user.getTasks()
        return res.status(200).send(allTasks)
    } catch (error) {
        next(error)
    }
}

module.exports.getCountOfTasks = async(req,res,next) =>{
    try {
        const {params: {userId}} = req;
        const user = await User.findByPk(userId);

        const countTasks = await user.countTasks()

        return res.status(200).send(countTasks)
    } catch (error) {
        next(error)
    }
}