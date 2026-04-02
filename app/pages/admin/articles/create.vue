<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const title = ref('')
const excerpt = ref('')
const content = ref('')
const status = ref('Draf')
const author = ref('Admin Utama')

const statusOptions = ['Draf', 'Diterbitkan']

const handleSave = () => {
  navigateTo('/admin/articles')
}
</script>

<template>
  <div class="max-w-5xl mx-auto">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Tulis Artikel Baru</h1>
        <p class="text-foreground/70 text-sm mt-1">Buat konten publikasi baru untuk ditampilkan di halaman web.</p>
      </div>
      <div class="flex gap-3">
        <UButton color="white" variant="solid" to="/admin/articles">Batal</UButton>
        <UButton color="gray" variant="solid" @click="handleSave" icon="i-heroicons-paper-airplane">Simpan & Publikasi</UButton>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
          <UFormGroup label="Judul Artikel" required>
            <UInput v-model="title" placeholder="Masukkan judul utama..." size="lg" />
          </UFormGroup>

          <UFormGroup label="Ringkasan (Excerpt)">
            <UTextarea v-model="excerpt" placeholder="Deskripsi singkat untuk kartu artikel..." :rows="3" />
          </UFormGroup>

          <UFormGroup label="Isi Konten" required>
            <UTextarea v-model="content" placeholder="Tulis isi konten secara lengkap di sini..." :rows="15" />
          </UFormGroup>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
          <h3 class="font-bold text-gray-900 border-b border-gray-100 pb-3">Pengaturan Publikasi</h3>
          
          <UFormGroup label="Status Dokumen">
            <USelect v-model="status" :options="statusOptions" size="md" />
          </UFormGroup>

          <UFormGroup label="Penulis">
            <UInput v-model="author" size="md" icon="i-heroicons-user" />
          </UFormGroup>

          <UFormGroup label="Gambar Sampul">
            <div class="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
              <UIcon name="i-heroicons-photo" class="w-8 h-8 mx-auto text-foreground/60 mb-2" />
              <span class="text-sm text-foreground/70">Klik untuk mengunggah gambar</span>
            </div>
          </UFormGroup>
        </div>
      </div>
    </div>
  </div>
</template>