import bcrypt from 'bcrypt'
import { DATABASE, USERS_COLLECTION } from '../../constants'
import db from './database'


export const checkUserEmailPassword = async (email: string, password: string) => {
  // check email
  const user = await db.findUser(DATABASE, USERS_COLLECTION, { email })
  if (!user)
    return false
  // check password
  const passwordMatch = await bcrypt.compare(password, user.hashedPassword)
  if (!passwordMatch)
    return false
  // all checks passed
  return true
}

