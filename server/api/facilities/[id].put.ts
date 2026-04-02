export default defineEventHandler(async (event) => {
  requireAuth(event)
  const db = useDb()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const { name, description, imageUrl } = body
  db.prepare("UPDATE facilities SET name = ?, description = ?, imageUrl = ?, updatedAt = datetime('now') WHERE id = ?").run(name, description, imageUrl || null, id)
  return { success: true }
})
