import { createRouter } from 'next-connect'
import { Request, Response } from '../../types/backend'
import { defaultHandlerOptions } from '../../utils/backend'
import { checkIfUserAlreadyExists, registerPendingUser } from '../../utils/backend/register'


const router = createRouter<Request, Response>()

router
  .post(
    checkIfUserAlreadyExists,
    registerPendingUser
  )

export default router.handler(defaultHandlerOptions)


