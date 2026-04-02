export default defineEventHandler((event) => {
  const db = useDb()
  return db.prepare('SELECT * FROM brochures ORDER BY createdAt DESC').all()
})
