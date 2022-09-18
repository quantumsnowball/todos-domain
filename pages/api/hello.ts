import { createRouter } from 'next-connect'
import { Request, Response } from '../../types/backend'
import { defaultHandlerOptions } from '../../utils/backend'


const router = createRouter<Request, Response>()

router
  .get(
    (_req, res) => res.status(200).json({ message: 'Hello from NextJS api.' })
  )

export default router.handler(defaultHandlerOptions)

