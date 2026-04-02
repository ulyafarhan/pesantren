import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  requireAuth(event)
  const body = await readBody(event)
  const db = useDb()

  const { title, fileUrl, version } = body
  if (!title || !fileUrl) {
    throw createError({ statusCode: 400, statusMessage: 'Title dan fileUrl wajib diisi.' })
  }

  const id = randomUUID()
  db.prepare('INSERT INTO brochures (id, title, fileUrl, version) VALUES (?, ?, ?, ?)').run(id, title, fileUrl, version || null)
  return { id }
})
