require('dotenv').config()
const UserModel = require('../models/user-model')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')
const tokenService = require('./token-service')
const bcrypt = require('bcrypt')

class UserService {
  async registation(email, password) {
    const candidate = await UserModel.findOne({ email })

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      )
    }

    const hashPassword = bcrypt.hashSync(password, 3)
    const user = await UserModel.create({
      email,
      password: hashPassword,
    })
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }
}

module.exports = new UserService()
