import Database from 'better-sqlite3';
import { join } from 'path';

try {
  const dbPath = join(process.cwd(), 'db', 'data.db');
  console.log('Opening database at:', dbPath);
  const db = new Database(dbPath);
  const result = db.prepare('SELECT 1 as test').get();
  console.log('Success:', result);
  db.close();
} catch (err) {
  console.error('Failed to open database:', err);
  process.exit(1);
}
