import dotenv from 'dotenv'


dotenv.config()


export const URL_MONGO = process.env.URL_MONGO_PROD as string
export const DATABASE = process.env.DATABASE as string
export const TODOS_COLLECTION = process.env.TODOS_COLLECTION as string
