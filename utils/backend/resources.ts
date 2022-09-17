import jwt from 'jsonwebtoken'
import db from './database/mongo'
import { _Id } from '../../types'
import { Middleware, TodoDocument } from '../../types/backend'
import { DATABASE, TODOS_COLLECTION } from '../../constants'


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

export const insertTodo: Middleware = async (req, res) => {
  const { accessToken } = req.cookies
  if (!accessToken)
    return res.status(401)
  // decode to get back user infos
  const decoded = jwt.decode(accessToken)
  if (!decoded || typeof decoded === 'string' || !decoded.hasOwnProperty('user'))
    return res.status(400).json({ message: 'Failed to decode refreshToken.' })
  // add a new entry to database
  const user = decoded.user
  const todo = req.body
  const doc: TodoDocument = { user, ...todo }
  await db.insertTodo(DATABASE, TODOS_COLLECTION, doc)
  // query database for the updated list
  const filter = { user }
  const todos = await db.findTodos(DATABASE, TODOS_COLLECTION, filter)
  return res.status(200).json({ payload: todos })
}

export const deleteTodo: Middleware = async (req, res) => {
  const { accessToken } = req.cookies
  if (!accessToken)
    return res.status(401)
  // decode to get back user infos
  const decoded = jwt.decode(accessToken)
  if (!decoded || typeof decoded === 'string' || !decoded.hasOwnProperty('user'))
    return res.status(400).json({ message: 'Failed to decode refreshToken.' })
  // remove the entry from collection
  const user = decoded.user
  const _id: _Id = req.body
  await db.deleteTodo(DATABASE, TODOS_COLLECTION, _id)
  // query database for the updated list
  const filter = { user }
  const todos = await db.findTodos(DATABASE, TODOS_COLLECTION, filter)
  return res.status(200).json({ payload: todos })
}
