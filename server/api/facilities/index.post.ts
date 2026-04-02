import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  requireAuth(event)
  const body = await readBody(event)
  const db = useDb()

  const { name, description, imageUrl } = body
  if (!name || !description) {
    throw createError({ statusCode: 400, statusMessage: 'Name dan description wajib diisi.' })
  }

  const id = randomUUID()
  db.prepare('INSERT INTO facilities (id, name, description, imageUrl) VALUES (?, ?, ?, ?)').run(id, name, description, imageUrl || null)
  return { id }
})
