import { DATABASE, TODOS_COLLECTION } from "../../constants"
import { TodoWithId } from "../../types"
import { NextHandler } from "../../types/backend"
import db from '../../utils/database'


type ResData = {
  message?: string
  payload?: TodoWithId[]
}

const handler: NextHandler<ResData> = async (req, res) => {
  // post
  if (req.method === 'POST') {
    // check access token here
    // TODO
    // return the result
    const user = 'a@b.c'//decoded.user
    const filter = { user }
    const todos = await db.findTodos(DATABASE, TODOS_COLLECTION, filter)
    if (!todos)
      return res.status(400).json({ message: 'Failed to find todos.' })
    return res.status(200).json({ payload: todos })
  }
  // put
  if (req.method === 'PUT') {
    // check access token here
    // TODO
    // insert to database
    // TODO
    return res.status(200).json({ message: 'TODO' })
  }
  // other methods are not supported
  return res.status(400).json({ message: 'Wrong method.' })
}

export default handler

