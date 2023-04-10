import jwt from 'jsonwebtoken'
import tsEnv from '@lpgera/ts-env'

const JWT_SECRET = tsEnv.stringOrThrow('JWT_SECRET')

export function sign() {
  return jwt.sign({}, JWT_SECRET, {
    expiresIn: tsEnv.string('JWT_EXPIRY') ?? '1 day',
  })
}

export function verify(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    console.error(error)
    return null
  }
}
