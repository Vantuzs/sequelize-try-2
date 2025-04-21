const {Router } = require('express');
const UserController = require('../controllers/User.controller');
const { route } = require('../app');

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
module.exports = router