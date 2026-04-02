import jwt from 'jsonwebtoken'
import { compareSync } from 'bcryptjs'
import type { H3Event } from 'h3'

const JWT_SECRET = process.env.JWT_SECRET || 'pesantrenku-secret-key-change-in-production-2026'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
}

export function createToken(user: AuthUser): string {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string): AuthUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser
  } catch {
    return null
  }
}

export function verifyPassword(plain: string, hashed: string): boolean {
  return compareSync(plain, hashed)
}

export function getAuthUser(event: H3Event): AuthUser | null {
  const cookie = getCookie(event, 'auth_token')
  if (!cookie) return null
  return verifyToken(cookie)
}

export function requireAuth(event: H3Event): AuthUser {
  const user = getAuthUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  return user
}
