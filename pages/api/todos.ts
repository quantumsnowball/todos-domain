import { createRouter } from 'next-connect'
import { Request, Response } from '../../types/backend'
import { defaultHandlerOptions } from '../../utils/backend'
import { checkAccessToken, deleteTodo, fetchTodos, insertTodo } from '../../utils/backend/resources'


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
