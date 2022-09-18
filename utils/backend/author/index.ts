import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { _Id } from '../../../types'
import { Middleware } from '../../../types/backend'
import { ACCESS_TOKEN_SECRET } from '../../../constants'


export const checkAccessToken: Middleware = (req, res, next) => {
  const { accessToken } = req.cookies
  if (!accessToken)
    return res.status(401)
  // check if the jwt token is still valid
  try {
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET)
    next()
  } catch (error) {
    if (error instanceof TokenExpiredError)
      return res.status(401).json({
        message: 'Your access token is expired, needs renewal.',
        url: `${req.headers.origin}/renew`
      })
    return res.status(400).json({ message: 'Error in token verification.' })
  }
}

