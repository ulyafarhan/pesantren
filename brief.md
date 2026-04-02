# TECHNICAL PROJECT BRIEF & SYSTEM

# ARCHITECTURE

**Proyek:** Website Profil & Sistem Manajemen Konten (CMS) Pesantren
**Peran Arsitek:** System Architecture Engineer
**Pendekatan:** Modern Serverless, Fullstack Nuxt, Pragmatic & KISS (Keep It Simple, Stupid)

## I. Ringkasan Eksekutif (Executive Summary)

Proyek ini bertujuan untuk membangun website resmi pesantren yang berfungsi sebagai media
informasi publik dan dokumentasi, dilengkapi dengan Panel Admin terintegrasi. Sistem
dirancang menggunakan arsitektur _Serverless Fullstack_ untuk mencapai tiga tujuan utama:
**Performa Maksimal (Skor Lighthouse > 90)** , **Optimasi SEO Tingkat Tinggi** , dan **Biaya
Infrastruktur Mendekati Rp 0 (Zero-Cost Infrastructure)** dengan memanfaatkan layanan
_Free Tier_ modern yang mumpuni.

## II. Kebutuhan Sistem (System Requirements)

### A. Functional Requirements (Fitur Utama)

1. **Public-Facing Web** : Halaman Landing (Hero statis, Testimoni dinamis), Tentang Kami,
    Artikel/Blog, Galeri Foto, Fasilitas, Download Brosur, Program Kelas, Sejarah, dan Kontak.
2. **Admin Panel (CMS)** : Sistem autentikasi admin untuk manajemen konten (CRUD) pada
    entitas dinamis (Artikel, Galeri, Fasilitas, Testimoni, Brosur).

### B. Non-Functional Requirements (NFR)

Kriteria kualitas sistem yang harus dipenuhi:
**Metrik NFR Target & Spesifikasi Strategi Pemenuhan
Performance** Skor Google Lighthouse **> 95
(Hijau)**. LCP < 2.5 detik.
Prerendering (SSG) &
_Stale-While-Revalidate_ (SWR)


```
via Nuxt Nitro.
SEO Indeksasi optimal oleh mesin
pencari.
Server-Side Rendering (SSR)
dinamis & Semantic HTML.
Cost-Efficiency Biaya operasional bulanan Rp
0 (Free Tier).
Penggunaan Vercel, Supabase,
dan Cloudflare R2.
Maintainability Single Codebase , mudah
dipelihara (Prinsip KISS).
Fullstack Nuxt 4 (Vue.js + Nitro
Engine), tidak ada
microservices.
```
## III. Tumpukan Teknologi (Technology Stack)

Pemilihan teknologi didasarkan pada prinsip menghindari _over-engineering_ namun tetap
relevan dengan standar industri terkini.
**Komponen Teknologi Terpilih Justifikasi Arsitektural
Framework Utama Nuxt 4** (Vue.js + Nitro) _Fullstack framework_. Ukuran
_bundle_ kecil, _cold-start_ sangat
cepat, dan _developer-friendly_
bagi yang memiliki dasar Vue.
**Database PostgreSQL** (via Supabase /
Neon)
Relasional yang kuat untuk
integritas data CMS. Layanan
pihak ketiga yang ramah
_Serverless_ (koneksi _pooling_
otomatis).


```
Media Storage Cloudflare R2 Penyimpanan objek
(S3-Compatible) untuk gambar
dan PDF brosur. Terintegrasi
CDN Global dan bebas biaya
egress.
Hosting & CI/CD Vercel Platform deployment terbaik
untuk Nuxt. Menangani
otomatisasi build dari GitHub
dan mendistribusikan cache via
Edge Network.
```
## IV. Desain Arsitektur Sistem (High-Level Design)

Sistem menggunakan pola **Serverless Composable Architecture**. Permintaan dari pengguna
tidak langsung membebani _database_ , melainkan disajikan melalui _cache_ Vercel di ujung jaringan
(Edge).
[Pengunjung Web]
│ (Menerima respons instan HTML/CSS/JS dari Vercel Edge Cache)
▼
[Vercel Edge Network] ── (Menjalankan Nuxt 4: SSG / SWR / API Nitro)
│
├─► [Cloudflare R2] ── (Menyajikan aset berat: Gambar WebP & PDF)
│
▼ (Akses Backend/API - Hanya terjadi saat Admin Login / Update Data SWR)
[Supabase / Neon DB] ── (Menyimpan data teks relasional: Artikel, User, dll.)

### Konfigurasi Caching Inti (nuxt.config.ts)


Ilustrasi strategi optimasi performa melalui _route rules_ di Nuxt 4:
TypeScript
export default defineNuxtConfig({
future: { compatibilityVersion: 4 },
routeRules: {
'/': { prerender: true }, // Landing page di-generate menjadi statis
'/sejarah': { prerender: true },
'/artikel/**': { swr: 3600 }, // Artikel di-cache 1 jam (Stale-While-Revalidate)
'/galeri': { swr: 3600 },
'/admin/**': { ssr: false }, // Admin murni Client-Side Rendering
'/api/**': { cors: true } // API endpoint statis & dinamis
}
})

## V. Perancangan Skema Data (Data Model)

Data dirancang secara relasional dengan tingkat normalisasi yang optimal (memenuhi 3NF
untuk entitas utama) demi mencegah redundansi data. Penggunaan ORM **Prisma** diwajibkan
untuk menjamin Type-Safety secara End-to-End antara database PostgreSQL dan Nuxt 4 API.

#### A. Justifikasi Arsitektur Database

```
● Primary Key (UUID) : Semua entitas menggunakan UUID alih-alih Integer
Auto-Increment. Ini mengamankan API publik dari tebakan ID (misalnya, mencegah
pihak luar mengetahui jumlah total artikel atau pengguna dengan mencoba ID 1 , 2 , 3 ).
● Audit Trail (createdAt, updatedAt) : Setiap tabel dilengkapi dengan timestamp
otomatis untuk melacak kapan konten dibuat dan terakhir dimodifikasi oleh Admin.
● Soft Delete / Status Toggle (isActive, isPublished) : Diterapkan pada entitas
seperti Artikel dan Testimoni agar Admin dapat menyembunyikan konten tanpa harus
menghapusnya secara permanen dari database.
```
#### B. Spesifikasi Skema Inti (Prisma Schema)

Berikut adalah representasi tabel database (Data Dictionary) yang disusun secara rapi dan
profesional berdasarkan skema Prisma yang Anda berikan. Format ini akan sangat
memudahkan tim _developer_ atau _database administrator_ dalam membaca struktur, tipe data,


dan relasi antar entitas.

#### 1. Entitas Pengguna (Tabel: users)

Menyimpan data akun Admin atau Editor (CMS).
**Nama Kolom Tipe Data
(PostgreSQL)
Modifier &
Constraint
Keterangan & Relasi
id** UUID **Primary Key** ,
Default: uuid()
Identifier unik
pengguna.
**name** VARCHAR(100) Not Null Nama lengkap
pengguna.
**email** VARCHAR(150) Not Null, **Unique** Alamat email (untuk
login).
**password** VARCHAR(255) Not Null _Hash_ kata sandi.
**role** ENUM('ADMIN',
'EDITOR')
Not Null, Default:
'ADMIN'
Hak akses pengguna.
**createdAt** TIMESTAMP Not Null, Default:
now()
Waktu pembuatan
akun.


```
updatedAt TIMESTAMP Not Null, Auto
Update
Waktu pembaruan
data terakhir.
```
#### 2. Entitas Artikel/Blog (Tabel: articles)

Menyimpan data konten dinamis seperti berita, artikel, atau pengumuman.
**Nama Kolom Tipe Data
(PostgreSQL)
Modifier &
Constraint
Keterangan & Relasi
id** UUID **Primary Key** ,
Default: uuid()
Identifier unik artikel.
**title** VARCHAR(255) Not Null Judul artikel.
**slug** VARCHAR(255) Not Null, **Unique** ,
**Indexed**
URL SEO-friendly.
**excerpt** TEXT Not Null Ringkasan untuk meta
SEO/kartu.
**content** TEXT Not Null Isi lengkap artikel (Rich
Text/HTML).


```
coverImage VARCHAR(255) Nullable URL gambar cover (dari
R2).
isPublished BOOLEAN Not Null, Default:
false
Status draf/publikasi.
authorId UUID Not Null, Foreign
Key
Berelasi ke users(id),
OnDelete: Restrict.
publishedAt TIMESTAMP Nullable Waktu artikel diterbitkan
publik.
createdAt TIMESTAMP Not Null, Default:
now()
Waktu artikel dibuat.
updatedAt TIMESTAMP Not Null, Auto
Update
Waktu artikel terakhir
diperbarui.
```
#### 3. Entitas Galeri & Dokumentasi (Tabel: galleries)

Menyimpan dokumentasi foto kegiatan pesantren.
**Nama Kolom Tipe Data
(PostgreSQL)
Modifier &
Constraint
Keterangan &
Relasi**


```
id UUID Primary Key , Default:
uuid()
Identifier unik galeri.
title VARCHAR(150) Not Null Judul foto/kegiatan.
description TEXT Nullable Deskripsi singkat
foto.
imageUrl VARCHAR(255) Not Null URL file gambar (dari
R2).
createdAt TIMESTAMP Not Null, Default:
now()
Waktu foto diunggah.
updatedAt TIMESTAMP Not Null, Auto Update Waktu data
diperbarui.
```
#### 4. Entitas Brosur (Tabel: brochures)

Menyimpan _file_ PDF brosur untuk diunduh pengunjung.
**Nama Kolom Tipe Data
(PostgreSQL)
Modifier &
Constraint
Keterangan & Relasi**


```
id UUID Primary Key ,
Default: uuid()
Identifier unik brosur.
title VARCHAR(150) Not Null Nama brosur.
fileUrl VARCHAR(255) Not Null URL file dokumen PDF
(dari R2).
version VARCHAR(50) Nullable Versi/Tahun Ajaran
brosur.
createdAt TIMESTAMP Not Null, Default:
now()
Waktu brosur
diunggah.
updatedAt TIMESTAMP Not Null, Auto Update Waktu data diperbarui.
```
#### 5. Entitas Fasilitas (Tabel: facilities)

Menyimpan daftar fasilitas fisik yang ada di pesantren.
**Nama Kolom Tipe Data
(PostgreSQL)
Modifier &
Constraint
Keterangan & Relasi**


```
id UUID Primary Key ,
Default: uuid()
Identifier unik fasilitas.
name VARCHAR(150) Not Null Nama fasilitas.
description TEXT Not Null Penjelasan kegunaan
fasilitas.
imageUrl VARCHAR(255) Nullable URL foto fasilitas (dari
R2).
createdAt TIMESTAMP Not Null, Default:
now()
Waktu data dibuat.
updatedAt TIMESTAMP Not Null, Auto Update Waktu data diperbarui.
```
#### 6. Entitas Program Kelas (Tabel: class_programs)

Menyimpan daftar program pendidikan/kelas yang tersedia.
**Nama Kolom Tipe Data
(PostgreSQL)
Modifier &
Constraint
Keterangan & Relasi**


```
id UUID Primary Key ,
Default: uuid()
Identifier unik program
kelas.
name VARCHAR(150) Not Null Nama program (Misal:
Tahfidz).
description TEXT Not Null Detail kurikulum atau
deskripsi program.
createdAt TIMESTAMP Not Null, Default:
now()
Waktu data dibuat.
updatedAt TIMESTAMP Not Null, Auto
Update
Waktu data diperbarui.
```
#### 7. Entitas Testimoni (Tabel: testimonials)

Menyimpan ulasan atau testimoni dari alumni maupun wali santri.
**Nama Kolom Tipe Data
(PostgreSQL)
Modifier &
Constraint
Keterangan & Relasi
id** UUID **Primary Key** ,
Default: uuid()
Identifier unik testimoni.


```
name VARCHAR(100) Not Null Nama pemberi testimoni.
role VARCHAR(100) Not Null Peran/Status (Misal: Alumni
2025).
message TEXT Not Null Isi pesan testimoni.
isActive BOOLEAN Not Null, Default:
true
Toggle tampil/sembunyikan
di Landing Page.
createdAt TIMESTAMP Not Null, Default:
now()
Waktu data dibuat.
updatedAt TIMESTAMP Not Null, Auto
Update
Waktu data diperbarui.
```
#### 8. Entitas Pengaturan Global (Tabel: site_settings)

Menyimpan konfigurasi web dinamis berbasis _Key-Value_ (seperti kontak, visi misi).
**Nama Kolom Tipe Data
(PostgreSQL)
Modifier &
Constraint
Keterangan & Relasi**


**id** UUID **Primary Key** ,
Default: uuid()
Identifier unik pengaturan.
**key** VARCHAR(100) Not Null, **Unique** Kunci pengaturan (Misal:
contact_phone).
**value** TEXT Not Null Nilai dari pengaturan
tersebut.
**description** VARCHAR(255) Nullable Panduan untuk Admin
mengenai _key_ ini.
**updatedAt** TIMESTAMP Not Null, Auto
Update
Waktu nilai terakhir diubah.
**CONTOH KODE**
// prisma/schema.prisma
generator client {
provider = "prisma-client-js"
}
datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}
// ==========================================
// 1. ENTITAS PENGGUNA (CMS ADMIN)
// ==========================================
model User {


id String @id @default(uuid()) @db.Uuid
name String @db.VarChar(100)
email String @unique @db.VarChar(150)
password String @db.VarChar(255) // Hashed password
role Role @default(ADMIN)
articles Article[] // Relasi 1-to-Many ke Artikel
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
@@map("users") // Mapping nama tabel ke lowercase/snake_case di Postgres
}
enum Role {
ADMIN
EDITOR
}
// ==========================================
// 2. ENTITAS KONTEN DINAMIS (ARTIKEL/BLOG)
// ==========================================
model Article {
id String @id @default(uuid()) @db.Uuid
title String @db.VarChar(255)
slug String @unique @db.VarChar(255) // Untuk SEO URL
excerpt String @db.Text // Ringkasan untuk meta description/kartu
content String @db.Text // Format Rich Text / HTML / Markdown
coverImage String? @db.VarChar(255) // URL dari Cloudflare R
isPublished Boolean @default(false)
authorId String @db.Uuid
author User @relation(fields: [authorId], references: [id], onDelete: Restrict)
publishedAt DateTime?
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
@@index([slug]) // Indeksasi untuk mempercepat pencarian (Read/Get)
@@map("articles")
}
// ==========================================
// 3. ENTITAS MEDIA & DOKUMENTASI
// ==========================================
model Gallery {
id String @id @default(uuid()) @db.Uuid
title String @db.VarChar(150)
description String? @db.Text
imageUrl String @db.VarChar(255) // URL dari Cloudflare R
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt


@@map("galleries")
}
model Brochure {
id String @id @default(uuid()) @db.Uuid
title String @db.VarChar(150)
fileUrl String @db.VarChar(255) // URL PDF dari Cloudflare R
version String? @db.VarChar(50) // Misal: "Tahun Ajaran 2026/2027"
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
@@map("brochures")
}
// ==========================================
// 4. ENTITAS PROFIL PESANTREN
// ==========================================
model Facility {
id String @id @default(uuid()) @db.Uuid
name String @db.VarChar(150)
description String @db.Text
imageUrl String? @db.VarChar(255) // URL dari Cloudflare R
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
@@map("facilities")
}
model ClassProgram {
id String @id @default(uuid()) @db.Uuid
name String @db.VarChar(150) // Misal: "Madrasah Aliyah", "Tahfidz"
description String @db.Text
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
@@map("class_programs")
}
model Testimonial {
id String @id @default(uuid()) @db.Uuid
name String @db.VarChar(100)
role String @db.VarChar(100) // Misal: "Alumni 2025", "Wali Santri"
message String @db.Text
isActive Boolean @default(true) // Toggle untuk tampil/tidak di Landing Page
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt


@@map("testimonials")
}
// ==========================================
// 5. ENTITAS PENGATURAN GLOBAL (Key-Value)
// ==========================================
model SiteSetting {
id String @id @default(uuid()) @db.Uuid
key String @unique @db.VarChar(100) // Misal: 'contact_phone', 'address'
value String @db.Text
description String? @db.VarChar(255) // Penjelasan untuk Admin
updatedAt DateTime @updatedAt
@@map("site_settings")
}

## VI. Keandalan Sistem & Penanganan Kegagalan

## (Reliability Strategy)

Sesuai prinsip pragmatis dan _KISS_ , sistem tidak menggunakan _layer_ infrastruktur yang
berlebihan (seperti Redis atau RabbitMQ). Keandalan dibangun pada level aplikasi:

1. **Proteksi Lonjakan Trafik:** Ditangani sepenuhnya oleh _Vercel Edge Caching_. Backend
    _database_ akan tetap aman meskipun ada ribuan akses bersamaan, karena pengunjung
    hanya mengakses _cache_ HTML statis.
2. **Penanganan Kegagalan Database:** Jika Supabase mengalami _downtime_ , Nuxt akan
    menangkap _error_ di sisi server dan menampilkan komponen error.vue yang ramah
    pengguna (halaman _maintenance_ ).
3. **Resiliensi Aset Media:** Komponen gambar (<img>) pada Nuxt akan dilengkapi dengan
    _fallback event_ (@error). Jika gambar dari Cloudflare R2 gagal dimuat, sistem otomatis
    menampilkan logo _default_ pesantren.
4. **Monitoring Pragmatis:** Menggunakan _dashboard_ analitik bawaan Vercel dan Supabase
    tanpa memerlukan instalasi _tools observability_ pihak ketiga.
Berikut adalah strategi **Fault Tolerance (Toleransi Kesalahan) & Reliability** yang dirancang
khusus untuk arsitektur _Serverless_ kita.
Mengingat kita mengedepankan prinsip **KISS (Keep It Simple, Stupid)** dan efisiensi biaya
( _Zero-Cost/Free Tier_ ), kita tidak akan membangun infrastruktur rumit seperti _Kubernetes cluster_ ,


_Service Mesh_ , atau sistem _Queue_ pihak ketiga (seperti RabbitMQ).
Sebaliknya, kita mendelegasikan sebagian besar beban _fault tolerance_ kepada penyedia _cloud_
(Vercel, Supabase, Cloudflare) yang sudah memiliki SLA (Service Level Agreement) 99.99%,
dan menerapkan pola **Graceful Degradation** (penurunan fungsionalitas secara anggun) di level
kode aplikasi Nuxt 4.

#### Matriks Skenario Kegagalan & Solusi Arsitektural

```
Skenario Kegagalan
(Failure Scenario)
Komponen
Terdampak
Strategi Fault Tolerance & Mitigasi
Lonjakan Trafik
Tiba-tiba (Misal:
Pengumuman
penerimaan santri
baru)
Server Nuxt
(Vercel)
Edge Caching (SWR): Vercel tidak akan
meneruskan ribuan request tersebut ke
database. Pengunjung dilayani sepenuhnya
oleh cache CDN global Vercel. Sistem secara
otomatis kebal terhadap lonjakan beban
( Auto-scaling by default ).
Koneksi Database
Habis ( Connection
Exhaustion )
Supabase /
Neon DB
Connection Pooling: Kita akan menggunakan
URL Connection Pooler (PgBouncer) bawaan
dari Supabase/Neon (biasanya menggunakan
port 6543 ), bukan koneksi langsung ( 5432 ),
sehingga ribuan request API dikompresi
menjadi beberapa koneksi database saja.
Database Down atau
Timeout
Nuxt Nitro API
& Database
Nuxt Error Boundary: Alih-alih menampilkan
layar putih atau kode error 500 yang
menakutkan, aplikasi akan menangkap error
secara lokal dan menampilkan UI "Halaman
Sedang Perbaikan" yang ramah.
```

```
Aset R2 Gagal
Dimuat (Misal:
Timeout pada CDN
R2)
Frontend
(Vue.js)
UI Fallback (Graceful Degradation): Setiap
komponen <img /> akan dilengkapi deteksi
error. Jika gambar galeri atau artikel gagal
ditarik, sistem otomatis merender logo default
pesantren.
Kegagalan Upload
Data oleh Admin
(Misal: Jaringan
Admin putus)
Admin Panel
(CMS)
Client-Side Retries & Idempotency: Jika
proses submit artikel gagal (baik saat upload
gambar ke R2 atau simpan teks ke Supabase),
UI akan memberikan pesan jelas dan tombol
"Coba Lagi" tanpa menghilangkan teks yang
sudah diketik Admin.
```
#### Ilustrasi Implementasi Teknis (Konseptual)

Untuk mewujudkan matriks di atas, berikut adalah ilustrasi bagaimana hal tersebut diterapkan
pada level kode (Nuxt 4 / Vue.js):

**1. Penanganan Kegagalan Database di Frontend (Error Boundary)**
Menggunakan fitur bawaan Nuxt untuk mengisolasi komponen yang gagal agar tidak merusak
seluruh halaman.
Cuplikan kode
<template>
<NuxtErrorBoundary>
<ArticleGrid :articles="data" />
<template #error="{ error, clearError }">
<div class="error-state text-center p-8 bg-gray-50 rounded-lg">
<Icon name="lucide:server-crash" class="text-gray-400 text-4xl" />
<h3 class="mt-4 font-bold text-gray-800">Sistem Sedang Sibuk</h3>
<p class="text-gray-600">Gagal memuat artikel saat ini. Tim kami sedang menanganinya.</p>
<button @click="clearError" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">


Coba Muat Ulang
</button>
</div>
</template>
</NuxtErrorBoundary>
</template>

**2. Penanganan Kegagalan Aset Gambar (UI Fallback)**
Sebuah _directive_ atau fungsi sederhana di Vue untuk mendeteksi gambar yang _broken_ dari R2.
Cuplikan kode
<template>
<img
:src="imageSource"
:alt="altText"
@error="handleImageError"
class="object-cover w-full h-full transition-opacity"
/>
</template>
<script setup>
const props = defineProps(['src', 'altText']);
const imageSource = ref(props.src);
// Jika URL dari Cloudflare R2 gagal dimuat/timeout
const handleImageError = () => {
// Ganti dengan logo default pesantren yang disimpan secara lokal di folder public/
imageSource.value = '/images/default-pesantren-logo.png';
};
</script>


**3. Keandalan Mutasi Data Admin (Auto-Retry Fetch API)**
Di sisi Admin (CMS), saat melakukan _request_ penyimpanan data, kita bisa menggunakan
kapabilitas $fetch di Nuxt 4 untuk melakukan _retry_ otomatis jika terjadi _network timeout_ ringan.
TypeScript
// composables/useAdminApi.ts
export const useAdminApi = () => {
const saveArticle = async (articleData: any) => {
try {
const response = await $fetch('/api/admin/articles', {
method: 'POST',
body: articleData,
retry: 2 , // Otomatis mencoba ulang 2 kali jika koneksi terputus tiba-tiba
retryDelay: 1000 , // Jeda 1 detik antar percobaan
});
return response;
} catch (error) {
// Lempar ke sistem notifikasi UI (Toast) agar Admin tahu persis apa yang terjadi
console.error('Gagal menyimpan setelah beberapa percobaan:', error);
throw new Error('Gagal terhubung ke server. Silakan periksa koneksi internet Anda.');
}
};
return { saveArticle };
};
Dengan desain _Fault Tolerance_ ini, sistem pesantren Anda tetap tangguh (memiliki resiliensi
tinggi) dan terlihat profesional di mata pengunjung, tanpa Anda harus membayar biaya
tambahan untuk infrastruktur _backup_ atau alat _monitoring_ yang berlebihan.


