import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  requireAuth(event)
  const body = await readBody(event)
  const db = useDb()

  const { name, description } = body
  if (!name || !description) {
    throw createError({ statusCode: 400, statusMessage: 'Name dan description wajib diisi.' })
  }

  const id = randomUUID()
  db.prepare('INSERT INTO class_programs (id, name, description) VALUES (?, ?, ?)').run(id, name, description)
  return { id }
})
