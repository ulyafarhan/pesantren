<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const columns = [
  { key: 'title', label: 'Judul Artikel' },
  { key: 'author', label: 'Penulis' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Tanggal' },
  { key: 'actions' }
]

const articles = [
  { id: 1, title: 'Pentingnya Sanad Keilmuan di Era Digital', author: 'Ust. Ahmad', status: 'Diterbitkan', date: '24 Okt 2026' },
  { id: 2, title: 'Tips Menjaga Hafalan Al-Quran', author: 'Ust. Budi', status: 'Draf', date: '20 Okt 2026' },
  { id: 3, title: 'Adab Sebelum Ilmu: Pondasi Utama Santri', author: 'Ust. Hasan', status: 'Diterbitkan', date: '15 Okt 2026' }
]
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Kelola Artikel</h1>
        <p class="text-foreground/70 text-sm mt-1">Manajemen konten publikasi, berita, dan blog pesantren.</p>
      </div>
      <UButton color="gray" variant="solid" icon="i-heroicons-plus" to="/admin/articles/create">
        Tulis Artikel Baru
      </UButton>
    </div>

    <UCard :ui="{ body: { padding: '' } }">
      <UTable :rows="articles" :columns="columns" class="w-full">
        <template #status-data="{ row }">
          <UBadge :color="row.status === 'Diterbitkan' ? 'green' : 'gray'" variant="subtle">
            {{ row.status }}
          </UBadge>
        </template>
        
        <template #actions-data="{ row }">
          <div class="flex justify-end gap-2">
            <UButton color="gray" variant="ghost" icon="i-heroicons-pencil-square" size="sm" />
            <UButton color="red" variant="ghost" icon="i-heroicons-trash" size="sm" />
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>