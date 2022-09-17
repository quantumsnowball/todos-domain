import bcrypt from 'bcrypt'
import { DATABASE, USERS_COLLECTION } from '../../../constants'
import { Middleware } from '../../../types/backend'
import db from '../database'


export const checkUserEmailPassword: Middleware = async (req, res, next) => {
  const email = req.body.email
  // check email
  const user = await db.findUser(DATABASE, USERS_COLLECTION, { email })
  if (!user)
    return res.status(401).json({
      message: `User ${req.body.email} does not exist, please try again.`
    })
  // check password
  const passwordMatch = await bcrypt.compare(req.body.password, user.hashedPassword)
  if (!passwordMatch)
    return res.status(401).json({
      message: `Your password is incorrect.`
    })
  // all checks passed
  next()
}

