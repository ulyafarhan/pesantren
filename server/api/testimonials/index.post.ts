import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  requireAuth(event)
  const body = await readBody(event)
  const db = useDb()

  const { name, role, message, isActive } = body
  if (!name || !role || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Name, role, dan message wajib diisi.' })
  }

  const id = randomUUID()
  db.prepare('INSERT INTO testimonials (id, name, role, message, isActive) VALUES (?, ?, ?, ?, ?)').run(id, name, role, message, isActive !== false ? 1 : 0)
  return { id }
})
