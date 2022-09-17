import { createRouter } from 'next-connect'
import { Request, Response } from '../../types/backend'
import { defaultHandlerOptions } from '../../utils/backend'
import { checkRefreshToken, renewToken } from '../../utils/backend/author/renew'


const router = createRouter<Request, Response>()

router
  .post(
    checkRefreshToken,
    renewToken
  )

export default router.handler(defaultHandlerOptions)

