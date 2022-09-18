import jwt from 'jsonwebtoken'
import tokens from '../database/redis'
import { Middleware, TokenPayload } from '../../../types/backend'
import {
  ACCESS_TOKEN_LIFETIME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET
} from '../../../constants'
import { setCookie } from 'cookies-next'
import { jwtDecode } from '../..'


export const checkRefreshToken: Middleware = async (req, res, next) => {
  const { refreshToken } = req.body
  try {
    const tokenExists = await tokens.includes(refreshToken)
    const tokenVerified = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
    if (tokenExists && tokenVerified) {
      next()
    } else
      return res.status(401).json({ message: 'Session expired, please login again.' })
  } catch (error) {
    return res.status(401).json({ message: `${error}` })
  }
}

export const renewToken: Middleware = (req, res) => {
  const { refreshToken } = req.body
  // decode to get back user infos
  const decoded = jwtDecode(refreshToken)
  if (!decoded)
    return res.status(400).json({ message: 'Failed to decode refreshToken.' })
  // sign new access token and return 200
  const payload: TokenPayload = { id: Date.now(), user: decoded.user }
  const accessToken = jwt.sign(
    { ...payload }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFETIME })
  // return accessToken as httpOnly cookie and 200
  setCookie('accessToken', accessToken, { req, res, httpOnly: true })
  return res.status(200)
    .json({ message: 'Token renew successfully.' })
}

