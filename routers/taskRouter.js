const {Router} = require('express');
const TaskController = require('../controllers/Task.controller');
const {validateTask} = require('../middlewares/task.mv');
const {getUserInstance} = require('../middlewares/user.mv');

const taskRouter = Router()

// Роуты для таски
//POST http://localhost:5000/api/task/25
taskRouter.post('/:userId',validateTask,getUserInstance,TaskController.createTask);
// GET http://localhost:5000/api/task/25
taskRouter.get('/:userId',getUserInstance,TaskController.getAllUserTask);
// GET http://localhost:5000/api/tasks/count/12
taskRouter.get('/count/:userId',getUserInstance,TaskController.getCountOfTasks);

module.exports = taskRouter;