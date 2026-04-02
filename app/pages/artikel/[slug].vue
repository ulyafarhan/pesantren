<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
useHead({
  title: 'Membaca Artikel - PesantrenKu'
})
</script>

<template>
  <div class="py-12 md:py-20 bg-white">
    <article class="container mx-auto px-6 max-w-4xl">
      <NuxtLink to="/artikel" class="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium mb-8 transition-colors">
        <UIcon name="i-heroicons-arrow-left" class="w-5 h-5" /> Kembali ke Indeks
      </NuxtLink>

      <div class="mb-10 text-center">
        <h1 class="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">Pentingnya Sanad Keilmuan di Era Digital</h1>
        <div class="flex items-center justify-center gap-6 text-gray-500 font-medium">
          <span class="flex items-center gap-2"><UIcon name="i-heroicons-user-circle" class="w-5 h-5" /> Ust. Ahmad</span>
          <span class="flex items-center gap-2"><UIcon name="i-heroicons-calendar-days" class="w-5 h-5" /> 24 Oktober 2026</span>
        </div>
      </div>

      <div class="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-md">
        <img src="https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?q=80&w=1200&auto=format&fit=crop" alt="Sampul Artikel" class="w-full h-full object-cover" />
      </div>

      <div class="prose prose-lg prose-green mx-auto text-gray-700">
        <p class="lead text-xl text-gray-600 font-medium mb-6">
          Dalam menuntut ilmu agama, sanad atau rantai keilmuan yang bersambung hingga Rasulullah SAW adalah sebuah keniscayaan untuk menjaga kemurnian ajaran.
        </p>
        <p class="mb-6">
          Di era di mana informasi dapat diakses hanya dengan sentuhan jari, tantangan terbesar bagi para penuntut ilmu bukanlah kurangnya sumber belajar, melainkan validitas dan kedalaman pemahaman dari sumber tersebut. Membaca teks terjemahan tanpa bimbingan seorang guru yang memiliki otoritas (sanad) berpotensi memunculkan pemahaman yang parsial dan salah kaprah.
        </p>
        <h3 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Menjaga Kemurnian Tradisi Keilmuan</h3>
        <p class="mb-6">
          Pesantren hadir sebagai benteng terakhir pelestarian sanad ini. Melalui metode talaqqi (bertemu langsung dan membacakan kitab di hadapan guru), setiap santri diawasi agar tidak salah dalam memahami matan (teks inti), syarah (penjelasan), hingga hasyiyah (catatan pinggir) dari literatur-literatur ulama salaf.
        </p>
      </div>
    </article>
  </div>
</template>