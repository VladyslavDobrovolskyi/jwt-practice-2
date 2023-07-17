const ApiError = require('../exceptions/api-error')
const { validateAccessToken } = require('../services/token-service')
module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError())
    }
    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.UnauthorizedError())
    }

    const userData = validateAccessToken(accessToken)

    if (!userData) {
      next(ApiError.UnauthorizedError())
    }

    req.user = userData
    next()
  } catch (error) {
    return next(ApiError.UnauthorizedError())
  }
}
