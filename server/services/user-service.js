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
  async login(email, password) {
    const user = await UserModel.findOne({ email })

    if (!user) {
      throw ApiError.BadRequest('Неверный email адрес')
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password)

    if (!isPasswordEqual) {
      throw ApiError.BadRequest('Неверный пароль')
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      userDto,
    }
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = tokenService.findToken(refreshToken)

    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError()
    }
    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      userDto,
    }
  }
}

module.exports = new UserService()
