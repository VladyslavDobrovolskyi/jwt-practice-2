const $api = require('../http/index')

module.exports = class UserService {
  static async fetchUsers() {
    return $api.get('/users')
  }
}
