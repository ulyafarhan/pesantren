export default defineEventHandler(async (event) => {
  requireAuth(event)
  const db = useDb()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const { name, description } = body
  db.prepare("UPDATE class_programs SET name = ?, description = ?, updatedAt = datetime('now') WHERE id = ?").run(name, description, id)
  return { success: true }
})
