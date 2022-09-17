import { Redis } from '@upstash/redis'
import { NextHandler } from "../../types/backend"


type ResData = {
  message?: string
  payload?: object
}

const handler: NextHandler<ResData> = async (req, res) => {
  // connect
  const redis = Redis.fromEnv()
  // read
  const tokens = await redis.smembers('refreshTokens')
  return res.status(200).json({ payload: tokens })
}

export default handler

