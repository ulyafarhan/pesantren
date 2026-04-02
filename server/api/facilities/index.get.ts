export default defineEventHandler((event) => {
  const db = useDb()
  return db.prepare('SELECT * FROM facilities ORDER BY createdAt DESC').all()
})
