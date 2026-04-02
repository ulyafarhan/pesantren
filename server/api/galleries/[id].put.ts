export default defineEventHandler(async (event) => {
  requireAuth(event)
  const db = useDb()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const { title, description, imageUrl } = body
  db.prepare("UPDATE galleries SET title = ?, description = ?, imageUrl = ?, updatedAt = datetime('now') WHERE id = ?").run(title, description || null, imageUrl, id)
  return { success: true }
})
