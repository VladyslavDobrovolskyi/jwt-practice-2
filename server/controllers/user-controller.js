const UserService = require('../services/user-service')

class UserController {
  async userRegistration(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await UserService.registation(email, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.json(userData)
    } catch (error) {
      console.log(
        '🚀 ~ file: user-controller.js:14 ~ UserController ~ userRegistration ~ error:',
        error
      )
    }
  }
  async userLogin(req, res, next) {
    try {
    } catch (error) {}
  }
  async userLogout(req, res, next) {
    try {
    } catch (error) {}
  }
  async activateLink(req, res, next) {
    try {
    } catch (error) {}
  }
  async getRefreshToken(req, res, next) {
    try {
    } catch (error) {}
  }
  async getUsers(req, res, next) {
    try {
    } catch (error) {}
  }
}

module.exports = new UserController()
