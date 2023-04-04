const Router = require('express')

const controller = require('../controllers/UsersEventsController')
const { eventValid } = require('../middleware/mwEventsValid')
const eventCreate = require('../middleware/mwEventsCreate');
const eventUpdate = require('../middleware/mwEventsUpdate')
const mwUserAuth = require('../middleware/mwUserAuth')

const router = new Router()

router.get('/events/:id', mwUserAuth, controller.get)
router.get('/events', mwUserAuth, controller.getAll)
router.post('/events', mwUserAuth, eventCreate, eventValid, controller.create)
router.put('/events/:id', mwUserAuth, eventUpdate, controller.update)
router.delete('/events/:id', mwUserAuth, controller.delete)


module.exports = router