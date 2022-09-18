import { createRouter } from 'next-connect'
import { Request, Response } from '../../types/backend'
import { defaultHandlerOptions } from '../../utils/backend'
import {
  addNewUserSampleData,
  registerUserToDatabase,
  verifyPendingUser
} from '../../utils/backend/register'


const router = createRouter<Request, Response>()

router
  .get(
    verifyPendingUser,
    addNewUserSampleData,
    registerUserToDatabase
  )

export default router.handler(defaultHandlerOptions)

