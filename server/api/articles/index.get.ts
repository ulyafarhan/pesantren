import { randomUUID } from 'crypto'

export default defineEventHandler((event) => {
  const db = useDb()
  const query = getQuery(event)
  const onlyPublished = query.published === 'true'
  
  let sql = 'SELECT a.*, u.name as authorName FROM articles a LEFT JOIN users u ON a.authorId = u.id'
  if (onlyPublished) {
    sql += ' WHERE a.isPublished = 1'
  }
  sql += ' ORDER BY a.createdAt DESC'

  const articles = db.prepare(sql).all()
  return articles
})
