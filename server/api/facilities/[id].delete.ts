export default defineEventHandler((event) => {
  requireAuth(event)
  const db = useDb()
  const id = getRouterParam(event, 'id')
  db.prepare('DELETE FROM facilities WHERE id = ?').run(id)
  return { success: true }
})
