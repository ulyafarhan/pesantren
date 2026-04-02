<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
useHead({
  title: 'Artikel & Berita - PesantrenKu'
})

const articles = [
  { id: 1, slug: 'pentingnya-sanad-keilmuan', title: 'Pentingnya Sanad Keilmuan di Era Digital', excerpt: 'Dalam menuntut ilmu agama, sanad atau rantai keilmuan yang bersambung hingga Rasulullah SAW adalah sebuah keniscayaan untuk menjaga kemurnian ajaran.', date: '24 Oktober 2026', author: 'Ust. Ahmad', image: 'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?q=80&w=800&auto=format&fit=crop' },
  { id: 2, slug: 'tips-menjaga-hafalan', title: 'Tips Menjaga Hafalan Al-Quran di Tengah Kesibukan', excerpt: 'Menghafal Al-Quran adalah anugerah, namun menjaganya (murojaah) adalah perjuangan seumur hidup. Berikut metode yang bisa diterapkan.', date: '20 Oktober 2026', author: 'Ust. Budi', image: 'https://images.unsplash.com/photo-1609599006353-e629aaab31ce?q=80&w=800&auto=format&fit=crop' },
  { id: 3, slug: 'adab-sebelum-ilmu', title: 'Adab Sebelum Ilmu: Pondasi Utama Penuntut Ilmu', excerpt: 'Mengapa para ulama terdahulu menghabiskan waktu puluhan tahun untuk mempelajari adab sebelum mulai mempelajari bab-bab fikih dan tauhid?', date: '15 Oktober 2026', author: 'Ust. Hasan', image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?q=80&w=800&auto=format&fit=crop' }
]
</script>

<template>
  <div class="py-16 md:py-24 bg-gray-50 min-h-screen">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Artikel & Berita</h1>
        <div class="w-24 h-1 bg-green-600 mx-auto rounded-full mb-6"></div>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">Kumpulan tulisan, wawasan keislaman, dan berita terbaru seputar kegiatan pesantren.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink v-for="article in articles" :key="article.id" :to="`/artikel/${article.slug}`" class="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
          <div class="h-56 w-full overflow-hidden">
            <img :src="article.image" :alt="article.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <div class="flex items-center gap-3 text-sm text-gray-500 mb-3">
              <span class="flex items-center gap-1"><UIcon name="i-heroicons-calendar" class="w-4 h-4" /> {{ article.date }}</span>
              <span class="flex items-center gap-1"><UIcon name="i-heroicons-user" class="w-4 h-4" /> {{ article.author }}</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">{{ article.title }}</h3>
            <p class="text-gray-600 line-clamp-3 mb-4 flex-1">{{ article.excerpt }}</p>
            <div class="text-green-600 font-medium inline-flex items-center gap-1 mt-auto">
              Baca selengkapnya <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>