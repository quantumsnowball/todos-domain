import { setCookie } from 'cookies-next'
import jwt from 'jsonwebtoken'
import {
  ACCESS_TOKEN_LIFETIME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_LIFETIME,
  REFRESH_TOKEN_SECRET
} from '../../../constants'
import {
  Middleware,
  TokenPayload
} from '../../../types/backend'
import tokens from '../database/redis'


const sign = async (email: string) => {
  const payload: TokenPayload = { id: Date.now(), user: email }
  const accessToken = jwt.sign(
    { ...payload }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFETIME })
  const refreshToken = jwt.sign(
    { ...payload }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_LIFETIME })
  await tokens.push(refreshToken)
  return { accessToken, refreshToken }
}

export const signAfterLogin: Middleware = async (req, res) => {
  // sign token
  const { email } = req.body
  const { accessToken, refreshToken } = await sign(email)
  setCookie('accessToken', accessToken, { req, res, httpOnly: true })
  return res
    .json({
      message: `Logged in as ${email}`,
      refreshToken
    })
}

// export const signAfterOAuth: RequestHandler = async (req, res) => {
//   // sign token
//   const { email } = req.body
//   const { accessToken, refreshToken } = sign(email)
//   return res
//     .cookie('accessToken', accessToken, { httpOnly: true })
//     .cookie('refreshToken', refreshToken)
//     .redirect('/')
// }
//

