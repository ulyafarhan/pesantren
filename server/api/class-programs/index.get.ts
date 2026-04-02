export default defineEventHandler((event) => {
  const db = useDb()
  return db.prepare('SELECT * FROM class_programs ORDER BY createdAt DESC').all()
})
