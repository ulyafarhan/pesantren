import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  requireAuth(event)
  const body = await readBody(event)
  const db = useDb()

  const { title, description, imageUrl } = body
  if (!title || !imageUrl) {
    throw createError({ statusCode: 400, statusMessage: 'Title dan imageUrl wajib diisi.' })
  }

  const id = randomUUID()
  db.prepare('INSERT INTO galleries (id, title, description, imageUrl) VALUES (?, ?, ?, ?)').run(id, title, description || null, imageUrl)
  return { id }
})
