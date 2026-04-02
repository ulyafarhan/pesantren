export default defineEventHandler((event) => {
  requireAuth(event)
  const db = useDb()
  const id = getRouterParam(event, 'id')
  db.prepare('DELETE FROM galleries WHERE id = ?').run(id)
  return { success: true }
})
