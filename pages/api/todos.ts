import { createRouter } from 'next-connect'
import { Request, Response } from '../../types/backend'
import { defaultHandlerOptions } from '../../utils/backend'
import { checkAccessToken, fetchTodos } from '../../utils/backend/resources'


const router = createRouter<Request, Response>()

router
  .post(
    checkAccessToken,
    fetchTodos
  )

export default router.handler(defaultHandlerOptions)
