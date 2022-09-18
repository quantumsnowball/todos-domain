import {
  Middleware,
} from '../../../types/backend'
import tokens from '../database/redis'


export const logout: Middleware = async (req, res) => {
  // remove token from redis
  const { refreshToken } = req.body
  if (!refreshToken)
    return res.status(403).json({ message: 'Already logged out.' })
  const result = await tokens.remove(refreshToken)
  if (!result)
    return res.status(403).json({ message: 'Failed to logout' })
  return res.status(200).json({ message: 'Logged out.' })
}

