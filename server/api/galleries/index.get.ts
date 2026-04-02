export default defineEventHandler((event) => {
  const db = useDb()
  return db.prepare('SELECT * FROM galleries ORDER BY createdAt DESC').all()
})
