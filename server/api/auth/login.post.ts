export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email dan password wajib diisi.' })
  }

  const db = useDb()
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any

  if (!user || !verifyPassword(password, user.password)) {
    throw createError({ statusCode: 401, statusMessage: 'Email atau password salah.' })
  }

  const token = createToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  })

  setCookie(event, 'auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  }
})
