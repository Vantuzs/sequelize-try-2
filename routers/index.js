const {Router } = require('express');
const UserController = require('../controllers/User.controller');
const TaskController = require('../controllers/Task.controller');


const router = Router()
// POST http://localhost:5000/api/user
router.post('/user',UserController.createUser);
// GET http://localhost:5000/api/users
router.get('/users',UserController.findAll);
// GET http://localhost:5000/api/user
router.get('/user/:id',UserController.findByPk);
// DELETE http://localhost:5000/api/user/id
router.delete('/user/:id',UserController.deleteByPk);
// PUT http://localhost:5000/api/user/id
router.put('/user/:id',UserController.updateByPk)


// Роуты для таски
//POST http://localhost:5000/api/task/25
router.post('/task/:userId',TaskController.createTask)
// GET http://localhost:5000/api/task/25
router.get('/tasks/:userId',TaskController.getAllUserTask)
// GET http://localhost:5000/api/tasks-count/12
router.get('/tasks-count/:userId',TaskController.getCountOfTasks)

module.exports = router