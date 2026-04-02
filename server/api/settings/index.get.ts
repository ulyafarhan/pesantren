export default defineEventHandler((event) => {
  const db = useDb()
  return db.prepare('SELECT * FROM site_settings ORDER BY key ASC').all()
})
