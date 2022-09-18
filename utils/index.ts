import jwt from 'jsonwebtoken'


export const jwtDecode = (token: string) => {
  try {
    // try to decode any jwt token
    const decoded = jwt.decode(token)
    // decoded failed
    if (!decoded || typeof decoded === 'string' || !decoded.hasOwnProperty('user'))
      return false
    // decoded successfully
    return decoded
  } catch (err) {
    console.log(err)
    return false
  }
}

export const getJwtUser = (token: string) => {
  const decoded = jwtDecode(token)
  if (!decoded)
    return ''
  return decoded.user as string
}
