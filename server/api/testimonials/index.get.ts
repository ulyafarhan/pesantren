export default defineEventHandler((event) => {
  const db = useDb()
  const query = getQuery(event)
  const onlyActive = query.active === 'true'

  let sql = 'SELECT * FROM testimonials'
  if (onlyActive) sql += ' WHERE isActive = 1'
  sql += ' ORDER BY createdAt DESC'

  return db.prepare(sql).all()
})
