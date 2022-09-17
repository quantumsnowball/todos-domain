import { NextApiRequest, NextApiResponse } from "next"
import { HandlerOptions } from "next-connect"
import { RequestHandler } from "next-connect/dist/types/node"


export const defaultHandlerOptions: HandlerOptions<RequestHandler<NextApiRequest, NextApiResponse>> = {
  // wrong method
  onNoMatch: (_, res) => {
    return res.status(404).json({ message: 'Wrong method.' })
  },
  // server error
  onError: (err, _, res) => {
    console.error(err)
    return res.status(500).json({ message: 'Server error.' })
  },
}
