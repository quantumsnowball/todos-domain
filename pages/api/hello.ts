// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextHandler } from "../../types/backend"


type ResData = {
  message: string
}

const handler: NextHandler<ResData> = (req, res) => {
  if (req.method !== 'GET')
    return res.status(400).json({ message: 'Please use GET request.' })

  return res.status(200).json({ message: 'Hello from NextJS api.' })
}

export default handler
