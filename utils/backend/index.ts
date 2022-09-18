import { NextApiRequest, NextApiResponse } from "next"
import { HandlerOptions } from "next-connect"
import { RequestHandler } from "next-connect/dist/types/node"


export const defaultHandlerOptions: HandlerOptions<RequestHandler<NextApiRequest, NextApiResponse>> = {
  // wrong method
  onNoMatch: (req, res) => {
    return res
      .status(405)
      .json({ message: `${req.method} method is not allowed on ${req.url}.` })
  },
  // server error
  onError: (err, _, res) => {
    console.error(err)
    return res.status(500).json({ message: `Server error: ${err}.` })
  },
}
