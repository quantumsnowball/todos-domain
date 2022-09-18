import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import {
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
} from '../../../../constants'


const CALLBACK_URL = '/api/login-google'

export const verifyFunction = new GoogleStrategy(
  {
    clientID: GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: ['email'],
    passReqToCallback: true
  },
  (req, _accessToken, _refreshToken, profile, cb) => {
    if (!profile.emails)
      return cb(null, false)
    const email = profile.emails[0].value
    if (!email)
      return cb(null, false)
    // @ts-ignore
    req.email = email
    // @ts-ignore
    console.log({ reqEmail: req.email })
    return cb(null, email)
  }
)
