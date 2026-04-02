export default defineEventHandler((event) => {
  requireAuth(event)
  const db = useDb()
  const slug = getRouterParam(event, 'slug')

  const result = db.prepare('DELETE FROM articles WHERE slug = ?').run(slug)
  if (result.changes === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Artikel tidak ditemukan.' })
  }

  return { success: true }
})
