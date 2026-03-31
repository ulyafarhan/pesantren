<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div>
    <section class="h-[70vh] flex flex-col items-center justify-center bg-green-50 px-4 text-center">
      <h1 class="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Pusat Pendidikan Islami Modern</h1>
      <p class="text-xl text-gray-600 mb-10 max-w-2xl">Membentuk karakter generasi penerus bangsa yang berakhlak mulia, cerdas, dan berwawasan global.</p>
      <div class="flex gap-4">
        <UButton to="/pendaftaran" color="green" size="xl">Daftar Sekarang</UButton>
        <UButton to="/profil" color="white" variant="solid" size="xl">Profil Pesantren</UButton>
      </div>
    </section>

    <section class="py-24 bg-white">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-16">Fasilitas Unggulan</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Masjid Jami'</h3>
            <p class="text-gray-600 leading-relaxed">Pusat kegiatan ibadah dan kajian kitab kuning yang mampu menampung seluruh santri.</p>
          </div>
          <div class="p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Perpustakaan Digital</h3>
            <p class="text-gray-600 leading-relaxed">Akses ribuan literatur Islam dan keilmuan umum berbasis sistem informasi modern.</p>
          </div>
          <div class="p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Laboratorium Komputer</h3>
            <p class="text-gray-600 leading-relaxed">Fasilitas pembelajaran teknologi informasi untuk membekali santri di era digital.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>