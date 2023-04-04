const Router = require('express');

const controller = require('../controllers/UsersController');
const {userValid} = require('../middleware/mwUserValid');
const userValidName = require('../middleware/mwUserValidName');
const userDelete = require('../middleware/mwUserDelete');
const mwUserAuth = require('../middleware/mwUserAuth')

const router = new Router();

router.get('/users/:id', mwUserAuth, controller.get);
router.get('/users', mwUserAuth, controller.getAll);
router.get('/usersInfo', mwUserAuth, controller.getInfoAll);
router.post('/users', mwUserAuth, userValid, userValidName, controller.create);
router.put('/users/:id', mwUserAuth, userValid, controller.update);
router.delete('/users/:id', mwUserAuth, userDelete, controller.delete);


module.exports = router;