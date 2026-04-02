export default defineEventHandler(async (event) => {
  requireAuth(event)
  const db = useDb()
  const slug = getRouterParam(event, 'slug')
  const body = await readBody(event)

  const existing = db.prepare('SELECT id FROM articles WHERE slug = ?').get(slug) as any
  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Artikel tidak ditemukan.' })
  }

  const { title, excerpt, content, coverImage, isPublished } = body

  let publishedAt = null
  if (isPublished) {
    const current = db.prepare('SELECT publishedAt FROM articles WHERE slug = ?').get(slug) as any
    publishedAt = current?.publishedAt || new Date().toISOString()
  }

  db.prepare(`
    UPDATE articles SET title = ?, excerpt = ?, content = ?, coverImage = ?, isPublished = ?, publishedAt = ?, updatedAt = datetime('now')
    WHERE slug = ?
  `).run(title, excerpt, content, coverImage || null, isPublished ? 1 : 0, publishedAt, slug)

  return { success: true }
})
