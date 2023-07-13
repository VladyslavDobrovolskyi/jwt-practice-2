const UserModel = require('../models/user-model')
const UserDto = require('../dtos/user-dto')

const mailService = require('./mail-service')
const tokenService = require('./token-service')
const bcrypt = require('bcrypt')
const uuid = require('uuid')

class UserService {
  async registation(email, password) {
    const candidate = await UserModel.findOne({ email })

    if (candidate) {
      throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
    }

    const hashPassword = bcrypt.hashSync(password, 3)
    const activationLink = uuid.v4()
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    })
    const userDto = new UserDto(user)

    await mailService.sendActivationMail(email, activationLink)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto,
    }
  }
}

module.exports = new UserService()
