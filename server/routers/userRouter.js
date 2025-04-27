const {Router} = require('express');
const UserController =  require('../controllers/User.controller');
const {validateUser,getUserInstance} = require('../middlewares/user.mv');
const pagitanionMv = require('../middlewares/pagitanion.mv');

const userRouter = Router()

// POST http://localhost:5000/api/user
userRouter.post('/',validateUser,UserController.createUser);
// GET http://localhost:5000/api/users
userRouter.get('/',pagitanionMv,UserController.findAll);
// GET http://localhost:5000/api/user
userRouter.get('/:userId',getUserInstance,UserController.findByPk);
// GET http://localhost:5000/api/users/groups/userId
userRouter.get('/groups/:userId',UserController.getUserWithGroup);
// DELETE http://localhost:5000/api/user/id
userRouter.delete('/:userId',UserController.deleteByPk);
// PUT http://localhost:5000/api/user/id
userRouter.put('/users/:userId',getUserInstance,UserController.updateByPk);

module.exports = userRouter;