<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
useHead({
  title: 'Fasilitas - PesantrenKu'
})

const facilities = [
  { title: "Masjid Jami'", desc: "Pusat kegiatan ibadah dan kajian kitab kuning yang mampu menampung seluruh santri.", icon: "i-heroicons-building-library" },
  { title: "Gedung Asrama", desc: "Asrama putra dan putri yang terpisah, nyaman, dan dilengkapi standar keamanan 24 jam.", icon: "i-heroicons-home-modern" },
  { title: "Perpustakaan Digital", desc: "Akses ribuan literatur Islam dan keilmuan umum berbasis sistem informasi modern.", icon: "i-heroicons-computer-desktop" },
  { title: "Laboratorium Komputer", desc: "Fasilitas pembelajaran teknologi informasi untuk membekali santri di era digital.", icon: "i-heroicons-cpu-chip" },
  { title: "Klinik Kesehatan", desc: "Pelayanan medis pertama bagi santri yang ditangani langsung oleh tenaga kesehatan profesional.", icon: "i-heroicons-heart" },
  { title: "Koperasi & Kantin", desc: "Pusat pemenuhan kebutuhan harian santri yang higienis dan terjangkau.", icon: "i-heroicons-shopping-bag" }
]
</script>

<template>
  <div class="py-16 md:py-24 bg-gray-50">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Fasilitas Pesantren</h1>
        <div class="w-24 h-1 bg-green-600 mx-auto rounded-full mb-6"></div>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">Kami menyediakan infrastruktur terbaik untuk mendukung proses belajar mengajar dan kenyamanan hidup para santri.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="item in facilities" :key="item.title" class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
          <div class="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
            <UIcon :name="item.icon" class="w-8 h-8" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">{{ item.title }}</h3>
          <p class="text-gray-600">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>