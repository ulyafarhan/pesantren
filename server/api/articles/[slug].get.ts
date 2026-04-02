export default defineEventHandler((event) => {
  const db = useDb()
  const slug = getRouterParam(event, 'slug')

  const article = db.prepare(`
    SELECT a.*, u.name as authorName FROM articles a 
    LEFT JOIN users u ON a.authorId = u.id 
    WHERE a.slug = ?
  `).get(slug)

  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'Artikel tidak ditemukan.' })
  }

  return article
})
