const {Router} = require('express');
const GroupController = require('../controllers/Group.controller');
const {getUserInstance} = require('../middlewares/user.mv');

const groupRouter = Router();

// Роуты для группы
//POST http://localhost:5000/api/group
groupRouter.post('/',GroupController.createGroup);
groupRouter.put('/:userId/:groupId',getUserInstance, GroupController.addUserToGroup);
// GET http://localhost:5000/api/group/:userId
groupRouter.get('/:userId',getUserInstance,GroupController.getAllGroupToUser);
// DELETE http://localhost:5000/api/groups/:userId/:groupId
groupRouter.delete('/:userId/:groupId',getUserInstance,GroupController.deleteUserFromGroup);

module.exports = groupRouter;