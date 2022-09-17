import jwt, { TokenExpiredError } from 'jsonwebtoken'
import db from './database/mongo'
import { _Id } from '../../types'
import { Middleware } from '../../types/backend'
import {
  ACCESS_TOKEN_SECRET,
  DATABASE,
  TODOS_COLLECTION
} from '../../constants'


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

export const fetchTodos: Middleware = async (req, res) => {
  const { accessToken } = req.cookies
  if (!accessToken)
    return res.status(401)
  // decode to get back user infos
  const decoded = jwt.decode(accessToken)
  if (!decoded || typeof decoded === 'string' || !decoded.hasOwnProperty('user'))
    return res.status(400).json({ message: 'Failed to decode refreshToken.' })
  // query database to return todos list
  const user = decoded.user
  const filter = { user }
  const todos = await db.findTodos(DATABASE, TODOS_COLLECTION, filter)
  return res.status(200).json({ payload: todos })
}

// export const insertTodo: RequestHandler = async (req, res) => {
//   // decode to get back user infos
//   const decoded = jwt.decode(req.cookies.accessToken)
//   if (typeof decoded === 'string' || !decoded.hasOwnProperty('user'))
//     return res.status(400).json({ message: 'Failed to decode refreshToken.' })
//   // add a new entry to database
//   const user = decoded.user
//   const todo = req.body
//   const doc: TodoDocument = { user, ...todo }
//   await db.insertTodo(DATABASE, TODOS_COLLECTION, doc)
//   // query database for the updated list
//   const filter = { user }
//   const todos = await db.findTodos(DATABASE, TODOS_COLLECTION, filter)
//   return res.status(200).json({ payload: todos })
// }
//
// export const deleteTodo: RequestHandler = async (req, res) => {
//   // decode to get back user infos
//   const decoded = jwt.decode(req.cookies.accessToken)
//   if (typeof decoded === 'string' || !decoded.hasOwnProperty('user'))
//     return res.status(400).json({ message: 'Failed to decode refreshToken.' })
//   // remove the entry from collection
//   const user = decoded.user
//   const _id: _Id = req.body
//   await db.deleteTodo(DATABASE, TODOS_COLLECTION, _id)
//   // query database for the updated list
//   const filter = { user }
//   const todos = await db.findTodos(DATABASE, TODOS_COLLECTION, filter)
//   return res.status(200).json({ payload: todos })
// }
