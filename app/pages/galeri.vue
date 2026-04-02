<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
useHead({
  title: 'Galeri - PesantrenKu'
})

const photos = [
  { id: 1, src: 'https://images.unsplash.com/photo-1590402241517-fa252152865d?q=80&w=800&auto=format&fit=crop', title: 'Kegiatan Belajar Mengajar' },
  { id: 2, src: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop', title: 'Hafalan Al-Quran Pagi' },
  { id: 3, src: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?q=80&w=800&auto=format&fit=crop', title: 'Kajian Kitab Kuning' },
  { id: 4, src: 'https://images.unsplash.com/photo-1519817914152-2a2404eb2162?q=80&w=800&auto=format&fit=crop', title: 'Upacara Hari Santri' },
  { id: 5, src: 'https://images.unsplash.com/photo-1622080373023-7fa50d14b4de?q=80&w=800&auto=format&fit=crop', title: 'Suasana Asrama' },
  { id: 6, src: 'https://images.unsplash.com/photo-1560061211-1a87e50c4109?q=80&w=800&auto=format&fit=crop', title: 'Fasilitas Masjid' }
]
</script>

<template>
  <div class="py-16 md:py-24 bg-white min-h-screen">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Galeri Dokumentasi</h1>
        <div class="w-24 h-1 bg-green-600 mx-auto rounded-full mb-6"></div>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">Potret kegiatan harian, fasilitas, dan momen-momen penting di lingkungan pesantren.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="photo in photos" :key="photo.id" class="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 cursor-pointer shadow-sm hover:shadow-lg transition-all">
          <img :src="photo.src" :alt="photo.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <h3 class="text-white font-bold text-lg">{{ photo.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>