import { defineEventHandler, getCookie, sendRedirect } from 'h3'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const url = event.node.req.url || '/'

  if (
    url.startsWith('/login') ||
    url.startsWith('/_nuxt') ||
    url.startsWith('/api') ||
    url.startsWith('/images') ||
    url.startsWith('/favicon.ico') ||
    url.startsWith('/robots.txt') ||
    url.startsWith('/_ipx') ||
    url.startsWith('/__nuxt_image')
  ) return

  const token = getCookie(event, 'auth_token')
  const secret = process.env.AUTH_SECRET!

  try {
    if (!token) throw new Error('No token')
    jwt.verify(token, secret)
  } catch (err) {
    return sendRedirect(event, '/login?redirect=' + encodeURIComponent(url))
  }
})

