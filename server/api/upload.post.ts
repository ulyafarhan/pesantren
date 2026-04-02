import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, extname } from 'path'
import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const formData = await readMultipartFormData(event)
  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded.' })
  }

  const file = formData[0]
  if (!file.filename) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid file.' })
  }

  const uploadsDir = join(process.cwd(), 'public', 'uploads')
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true })
  }

  const ext = extname(file.filename)
  const fileName = `${randomUUID()}${ext}`
  const filePath = join(uploadsDir, fileName)

  writeFileSync(filePath, file.data)

  return { url: `/uploads/${fileName}` }
})
