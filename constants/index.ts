import dotenv from 'dotenv'


dotenv.config()


export const URL_MONGO = process.env.URL_MONGO as string
export const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL as string
export const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN as string
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string
export const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID as string
export const GOOGLE_OAUTH_CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET as string
export const EMAIL_USERNAME = process.env.EMAIL_USERNAME as string
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD as string
export const DATABASE = process.env.DATABASE as string
export const USERS_COLLECTION = process.env.USERS_COLLECTION as string
export const PENDING_COLLECTION = process.env.PENDING_COLLECTION as string
export const OAUTH_COLLECTION = process.env.OAUTH_COLLECTION as string
export const TODOS_COLLECTION = process.env.TODOS_COLLECTION as string
export const REFRESH_TOKENS_SET = process.env.REFRESH_TOKENS_SET as string
export const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME as string
export const REFRESH_TOKEN_LIFETIME = process.env.REFRESH_TOKEN_LIFETIME as string
