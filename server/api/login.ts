import { H3Event, setCookie } from 'h3'
import { defineEventHandler, readBody } from 'h3'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event)
  const { username, password } = body

  const envUsername = process.env.AUTH_USERNAME
  const envPassword = process.env.AUTH_PASSWORD
  const secret = process.env.AUTH_SECRET!

  if (username !== envUsername || password !== envPassword) {
    return { success: false, message: 'Invalid credentials' }
  }

  const token = jwt.sign({ user: username }, secret, {
    expiresIn: '3650d'
  })

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365 * 10,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  })

  return { success: true }
})
