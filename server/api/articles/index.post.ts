import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const body = await readBody(event)
  const db = useDb()

  const { title, excerpt, content, coverImage, isPublished } = body
  if (!title || !excerpt || !content) {
    throw createError({ statusCode: 400, statusMessage: 'Title, excerpt, dan content wajib diisi.' })
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

  // Make slug unique
  let finalSlug = slug
  let counter = 0
  while (db.prepare('SELECT id FROM articles WHERE slug = ?').get(finalSlug)) {
    counter++
    finalSlug = `${slug}-${counter}`
  }

  const id = randomUUID()
  const publishedAt = isPublished ? new Date().toISOString() : null

  db.prepare(`
    INSERT INTO articles (id, title, slug, excerpt, content, coverImage, isPublished, authorId, publishedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, title, finalSlug, excerpt, content, coverImage || null, isPublished ? 1 : 0, user.id, publishedAt)

  return { id, slug: finalSlug }
})
