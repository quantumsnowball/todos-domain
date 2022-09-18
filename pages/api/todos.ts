import { createRouter } from 'next-connect'
import { Request, Response } from '../../types/backend'
import { defaultHandlerOptions } from '../../utils/backend'
import { checkAccessToken } from '../../utils/backend/author'
import { deleteTodo, fetchTodos, insertTodo } from '../../utils/backend/resources'


const router = createRouter<Request, Response>()

router
  .post(
    checkAccessToken,
    fetchTodos
  )
  .put(
    checkAccessToken,
    insertTodo
  )
  .delete(
    checkAccessToken,
    deleteTodo
  )

export default router.handler(defaultHandlerOptions)
