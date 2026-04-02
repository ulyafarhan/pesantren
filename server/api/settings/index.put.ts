export default defineEventHandler(async (event) => {
  requireAuth(event)
  const db = useDb()
  const body = await readBody(event)

  const { settings } = body // Array of { key, value }
  if (!Array.isArray(settings)) {
    throw createError({ statusCode: 400, statusMessage: 'Settings harus berupa array.' })
  }

  const stmt = db.prepare("UPDATE site_settings SET value = ?, updatedAt = datetime('now') WHERE key = ?")
  for (const s of settings) {
    stmt.run(s.value, s.key)
  }

  return { success: true }
})
