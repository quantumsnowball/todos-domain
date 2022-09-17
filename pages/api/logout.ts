import { createRouter } from 'next-connect'
import { Request, Response } from '../../types/backend'
import { defaultHandlerOptions } from '../../utils/backend'
import { logout } from '../../utils/backend/login'


const router = createRouter<Request, Response>()

router
  .post(
    logout
  )

export default router.handler(defaultHandlerOptions)

