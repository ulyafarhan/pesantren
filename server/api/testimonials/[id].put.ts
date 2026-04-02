export default defineEventHandler(async (event) => {
  requireAuth(event)
  const db = useDb()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const { name, role, message, isActive } = body
  db.prepare("UPDATE testimonials SET name = ?, role = ?, message = ?, isActive = ?, updatedAt = datetime('now') WHERE id = ?").run(name, role, message, isActive ? 1 : 0, id)
  return { success: true }
})
