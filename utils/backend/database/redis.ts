import { Redis } from '@upstash/redis'
import { REFRESH_TOKENS_SET } from '../../../constants'


const redis = Redis.fromEnv()

export default {
  includes: async (refreshToken: string) => {
    const result = await redis.sismember(REFRESH_TOKENS_SET, refreshToken)
    return result === 1
  },
  push: async (refreshToken: string) => {
    const result = await redis.sadd(REFRESH_TOKENS_SET, refreshToken)
    return result === 1
  },
  remove: async (refreshToken: string) => {
    const result = await redis.srem(REFRESH_TOKENS_SET, refreshToken)
    return result === 1
  }
}


