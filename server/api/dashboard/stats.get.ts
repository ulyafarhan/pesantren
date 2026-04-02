export default defineEventHandler((event) => {
  requireAuth(event)
  const db = useDb()

  const articles = (db.prepare('SELECT COUNT(*) as count FROM articles').get() as any).count
  const galleries = (db.prepare('SELECT COUNT(*) as count FROM galleries').get() as any).count
  const facilities = (db.prepare('SELECT COUNT(*) as count FROM facilities').get() as any).count
  const testimonials = (db.prepare('SELECT COUNT(*) as count FROM testimonials').get() as any).count
  const programs = (db.prepare('SELECT COUNT(*) as count FROM class_programs').get() as any).count
  const brochures = (db.prepare('SELECT COUNT(*) as count FROM brochures').get() as any).count
  const publishedArticles = (db.prepare('SELECT COUNT(*) as count FROM articles WHERE isPublished = 1').get() as any).count
  const draftArticles = (db.prepare('SELECT COUNT(*) as count FROM articles WHERE isPublished = 0').get() as any).count

  return {
    articles,
    publishedArticles,
    draftArticles,
    galleries,
    facilities,
    testimonials,
    programs,
    brochures,
  }
})
