import { createRouter, expressWrapper } from 'next-connect'
import passport from 'passport'
import '../../utils/backend/authen/passport'
import { Request, Response } from '../../types/backend'
import { defaultHandlerOptions } from '../../utils/backend'
import { signAfterOAuth } from '../../utils/backend/authen'
import { upsertOAuthUserToDatabase } from '../../utils/backend/register'


const router = createRouter<Request, Response>()

router
  .get(
    expressWrapper(passport.authenticate('google', { session: false })),
    upsertOAuthUserToDatabase,
    signAfterOAuth
  )

export default router.handler(defaultHandlerOptions)

