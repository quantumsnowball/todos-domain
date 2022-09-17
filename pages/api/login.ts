import { createRouter } from 'next-connect'
import { Request, Response } from '../../types/backend'
import { defaultHandlerOptions } from '../../utils/backend'
import { signAfterLogin } from '../../utils/backend/login'
import { checkUserEmailPassword } from '../../utils/backend/login/regular'


const router = createRouter<Request, Response>()

router
  .post(
    checkUserEmailPassword,
    signAfterLogin
  )

export default router.handler(defaultHandlerOptions)

