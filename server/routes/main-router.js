const Router = require('express').Router
const router = new Router()

const userController = require('../controllers/user-controller')

router.post('/registration', userController.userRegistration)
router.post('/login', userController.userLogin)
router.post('logout', userController.userLogout)
router.get('/activate/:link', userController.activateLink)
router.get('/refresh', userController.getRefreshToken)
router.get('/users', userController.getUsers)

module.exports = router
