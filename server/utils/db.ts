import Database from 'better-sqlite3'
import { join } from 'path'
import { randomUUID } from 'crypto'
import { hashSync } from 'bcryptjs'

const DB_PATH = join(process.cwd(), 'data.db')

let _db: Database.Database | null = null

export function useDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH)
    _db.pragma('journal_mode = WAL')
    _db.pragma('foreign_keys = ON')
    initTables(_db)
    seedAdmin(_db)
  }
  return _db
}

function initTables(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'ADMIN',
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS articles (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      coverImage TEXT,
      isPublished INTEGER NOT NULL DEFAULT 0,
      authorId TEXT NOT NULL,
      publishedAt TEXT,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (authorId) REFERENCES users(id)
    );

    CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

    CREATE TABLE IF NOT EXISTS galleries (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      imageUrl TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS brochures (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      fileUrl TEXT NOT NULL,
      version TEXT,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS facilities (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      imageUrl TEXT,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS class_programs (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      message TEXT NOT NULL,
      isActive INTEGER NOT NULL DEFAULT 1,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      id TEXT PRIMARY KEY,
      key TEXT NOT NULL UNIQUE,
      value TEXT NOT NULL,
      description TEXT,
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `)
}

function seedAdmin(db: Database.Database) {
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@pesantren.com')
  if (!existing) {
    const hashedPassword = hashSync('admin123', 10)
    db.prepare(`
      INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)
    `).run(randomUUID(), 'Super Admin', 'admin@pesantren.com', hashedPassword, 'ADMIN')

    // Seed default site settings
    const settings = [
      { key: 'site_name', value: 'PesantrenKu', description: 'Nama website pesantren' },
      { key: 'site_tagline', value: 'Pusat Pendidikan Islami Modern', description: 'Tagline utama' },
      { key: 'contact_phone', value: '+62 812-3456-7890', description: 'Nomor telepon kontak' },
      { key: 'contact_email', value: 'info@pesantrenku.com', description: 'Email kontak' },
      { key: 'contact_address', value: 'Jl. Pesantren No. 1, Kab. Bogor, Jawa Barat 16710', description: 'Alamat lengkap' },
      { key: 'social_instagram', value: 'https://instagram.com/pesantrenku', description: 'Link Instagram' },
      { key: 'social_youtube', value: 'https://youtube.com/@pesantrenku', description: 'Link YouTube' },
      { key: 'social_facebook', value: 'https://facebook.com/pesantrenku', description: 'Link Facebook' },
    ]
    const stmt = db.prepare('INSERT INTO site_settings (id, key, value, description) VALUES (?, ?, ?, ?)')
    for (const s of settings) {
      stmt.run(randomUUID(), s.key, s.value, s.description)
    }

    // Seed sample testimonials
    const testimonials = [
      { name: 'Ahmad Fauzi', role: 'Alumni 2023', message: 'Pesantren ini benar-benar mengubah hidup saya. Saya belajar bukan hanya ilmu agama, tapi juga karakter dan kedisiplinan yang sangat berguna di dunia kerja.' },
      { name: 'Siti Aminah', role: 'Wali Santri', message: 'Alhamdulillah anak saya menjadi lebih mandiri dan berakhlak baik sejak belajar di pesantren ini. Para ustadz sangat perhatian terhadap perkembangan setiap santri.' },
      { name: 'Muhammad Rizki', role: 'Alumni 2024', message: 'Program tahfidz di sini luar biasa. Dalam 3 tahun saya berhasil menghafal 30 juz Al-Quran dengan sanad yang bersambung.' },
    ]
    const tStmt = db.prepare('INSERT INTO testimonials (id, name, role, message, isActive) VALUES (?, ?, ?, ?, 1)')
    for (const t of testimonials) {
      tStmt.run(randomUUID(), t.name, t.role, t.message)
    }

    // Seed sample class programs
    const programs = [
      { name: 'Tahfidz Al-Quran', description: 'Program intensif menghafal Al-Quran 30 juz dengan metode mutakhir dan sanad bersertifikat. Santri dibimbing langsung oleh hafidz/hafidzah berpengalaman.' },
      { name: 'Kajian Kitab Kuning', description: 'Kajian mendalam literatur Islam klasik meliputi fikih, tauhid, tasawuf, dan nahwu shorof oleh para asatidz yang berkompeten di bidangnya.' },
      { name: 'Bahasa Internasional', description: 'Pembiasaan bahasa Arab dan Inggris untuk komunikasi harian. Dilengkapi program debat dan public speaking dalam bahasa asing.' },
      { name: 'Madrasah Aliyah', description: 'Kurikulum formal setara SMA yang terintegrasi dengan pelajaran pesantren. Lulusan mendapat ijazah resmi Kementerian Agama.' },
    ]
    const pStmt = db.prepare('INSERT INTO class_programs (id, name, description) VALUES (?, ?, ?)')
    for (const p of programs) {
      pStmt.run(randomUUID(), p.name, p.description)
    }

    // Seed sample facilities
    const facilitiesList = [
      { name: "Masjid Jami'", description: 'Pusat kegiatan ibadah dan kajian kitab kuning yang mampu menampung seluruh santri.', imageUrl: null },
      { name: 'Gedung Asrama', description: 'Asrama putra dan putri yang terpisah, nyaman, dan dilengkapi standar keamanan 24 jam.', imageUrl: null },
      { name: 'Perpustakaan Digital', description: 'Akses ribuan literatur Islam dan keilmuan umum berbasis sistem informasi modern.', imageUrl: null },
      { name: 'Laboratorium Komputer', description: 'Fasilitas pembelajaran teknologi informasi untuk membekali santri di era digital.', imageUrl: null },
      { name: 'Klinik Kesehatan', description: 'Pelayanan medis pertama bagi santri yang ditangani langsung oleh tenaga kesehatan profesional.', imageUrl: null },
      { name: 'Koperasi & Kantin', description: 'Pusat pemenuhan kebutuhan harian santri yang higienis dan terjangkau.', imageUrl: null },
    ]
    const fStmt = db.prepare('INSERT INTO facilities (id, name, description, imageUrl) VALUES (?, ?, ?, ?)')
    for (const f of facilitiesList) {
      fStmt.run(randomUUID(), f.name, f.description, f.imageUrl)
    }

    // Seed sample articles
    const adminUser = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@pesantren.com') as any
    const sampleArticles = [
      {
        title: 'Pentingnya Sanad Keilmuan di Era Digital',
        slug: 'pentingnya-sanad-keilmuan',
        excerpt: 'Dalam menuntut ilmu agama, sanad atau rantai keilmuan yang bersambung hingga Rasulullah SAW adalah sebuah keniscayaan untuk menjaga kemurnian ajaran.',
        content: '<p>Di era di mana informasi dapat diakses hanya dengan sentuhan jari, tantangan terbesar bagi para penuntut ilmu bukanlah kurangnya sumber belajar, melainkan validitas dan kedalaman pemahaman dari sumber tersebut.</p><p>Membaca teks terjemahan tanpa bimbingan seorang guru yang memiliki otoritas (sanad) berpotensi memunculkan pemahaman yang parsial dan salah kaprah.</p><h3>Menjaga Kemurnian Tradisi Keilmuan</h3><p>Pesantren hadir sebagai benteng terakhir pelestarian sanad ini. Melalui metode talaqqi (bertemu langsung dan membacakan kitab di hadapan guru), setiap santri diawasi agar tidak salah dalam memahami matan (teks inti), syarah (penjelasan), hingga hasyiyah (catatan pinggir) dari literatur-literatur ulama salaf.</p>',
        isPublished: 1,
      },
      {
        title: 'Tips Menjaga Hafalan Al-Quran di Tengah Kesibukan',
        slug: 'tips-menjaga-hafalan',
        excerpt: 'Menghafal Al-Quran adalah anugerah, namun menjaganya (murojaah) adalah perjuangan seumur hidup. Berikut metode yang bisa diterapkan.',
        content: '<p>Menghafal Al-Quran adalah anugerah yang luar biasa dari Allah SWT. Namun, menjaga hafalan (murojaah) membutuhkan konsistensi dan metode yang tepat.</p><h3>1. Tentukan Waktu Khusus</h3><p>Alokasikan waktu khusus setiap hari untuk murojaah, idealnya setelah shalat Subuh ketika pikiran masih segar.</p><h3>2. Gunakan Metode Tikrar</h3><p>Ulangi setiap halaman minimal 20 kali sebelum berpindah ke halaman berikutnya.</p><h3>3. Shalat dengan Hafalan</h3><p>Gunakan hafalan Al-Quran dalam shalat-shalat sunnah sebagai media murojaah alami.</p>',
        isPublished: 1,
      },
      {
        title: 'Adab Sebelum Ilmu: Pondasi Utama Penuntut Ilmu',
        slug: 'adab-sebelum-ilmu',
        excerpt: 'Mengapa para ulama terdahulu menghabiskan waktu puluhan tahun untuk mempelajari adab sebelum mulai mempelajari bab-bab fikih dan tauhid?',
        content: '<p>Para ulama salaf memiliki prinsip yang sangat kuat: "Al-Adabu qablal ilmi" — Adab sebelum ilmu. Prinsip ini bukan sekadar slogan, melainkan metodologi pendidikan yang telah terbukti selama berabad-abad.</p><h3>Mengapa Adab Begitu Penting?</h3><p>Ilmu tanpa adab bagaikan api tanpa kendali. Ia bisa membakar dirinya sendiri dan orang-orang di sekitarnya. Sebaliknya, ilmu yang dilandasi adab akan menjadi cahaya yang menerangi jalan penuntutnya.</p>',
        isPublished: 1,
      },
    ]
    const aStmt = db.prepare('INSERT INTO articles (id, title, slug, excerpt, content, coverImage, isPublished, authorId, publishedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
    for (const a of sampleArticles) {
      aStmt.run(randomUUID(), a.title, a.slug, a.excerpt, a.content, null, a.isPublished, adminUser.id, new Date().toISOString())
    }

    console.log('[DB] Database seeded successfully.')
  }
}
