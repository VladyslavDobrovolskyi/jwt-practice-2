const Router = require('express').Router
const router = new Router()
const { body } = require('express-validator')

const userController = require('../controllers/user-controller')

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.userRegistration
)
router.post('/login', userController.userLogin)
router.post('logout', userController.userLogout)
router.get('/refresh', userController.getRefreshToken)
router.get('/users', userController.getUsers)

module.exports = router
