const {Router} = require('express');
const GroupController = require('../controllers/Group.controller');
const {getUserInstance} = require('../middlewares/user.mv');
const multer = require('multer');
const { STATIC_PATH } = require('../config/path.config');

// const upload = multer({ dest: path.resolve(__dirname,'../public/images') });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,STATIC_PATH)
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}.${file.originalname}`)
    }
  })
  
  const upload = multer({ storage })

const groupRouter = Router();

// Роуты для группы
// GET http://localhost:5000/api/group
groupRouter.get('/',GroupController.getAllGroups)
//POST http://localhost:5000/api/group
groupRouter.post('/',GroupController.createGroup);
groupRouter.put('/:userId/:groupId',getUserInstance, GroupController.addUserToGroup);
// GET http://localhost:5000/api/group/:userId
groupRouter.get('/:userId',getUserInstance,GroupController.getAllGroupToUser);
// DELETE http://localhost:5000/api/groups/:userId/:groupId
groupRouter.delete('/:userId/:groupId',getUserInstance,GroupController.deleteUserFromGroup);
// GET http://localhost:5000/api/groups/:groupId/members
groupRouter.get('/:groupId/members',GroupController.getOneGroupWithAllMembers);
// POST http://localhost:5000/api/groups/:groupId
groupRouter.post('/:groupId',upload.single('groupAvatar'),GroupController.createGroupImage);


module.exports = groupRouter;