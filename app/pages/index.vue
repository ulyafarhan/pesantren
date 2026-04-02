<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
useHead({
  title: 'Beranda - PesantrenKu'
})
</script>

<template>
  <div>
    <section class="relative bg-green-50 py-20 lg:py-32 overflow-hidden">
      <div class="container mx-auto px-6 relative z-10 text-center">
        <h1 class="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Pusat Pendidikan Islami Modern
        </h1>
        <p class="text-lg md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Membentuk karakter generasi penerus bangsa yang berakhlak mulia, cerdas, dan berwawasan global berlandaskan Al-Quran dan As-Sunnah.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton to="/pendaftaran" color="green" size="xl" class="justify-center">Daftar Sekarang</UButton>
          <UButton to="/sejarah" color="white" variant="solid" size="xl" class="justify-center">Kenali Profil Kami</UButton>
        </div>
      </div>
    </section>

    <section class="py-24 bg-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Program Unggulan</h2>
          <div class="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
            <div class="w-14 h-14 bg-green-100 text-green-700 rounded-xl flex items-center justify-center mb-6">
              <UIcon name="i-heroicons-book-open" class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Tahfidz Al-Quran</h3>
            <p class="text-gray-600 leading-relaxed">Program intensif menghafal Al-Quran dengan metode mutakhir dan sanad bersertifikat.</p>
          </div>
          <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
            <div class="w-14 h-14 bg-green-100 text-green-700 rounded-xl flex items-center justify-center mb-6">
              <UIcon name="i-heroicons-academic-cap" class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Kajian Kitab Kuning</h3>
            <p class="text-gray-600 leading-relaxed">Kajian mendalam literatur Islam klasik oleh para asatidz yang berkompeten di bidangnya.</p>
          </div>
          <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
            <div class="w-14 h-14 bg-green-100 text-green-700 rounded-xl flex items-center justify-center mb-6">
              <UIcon name="i-heroicons-globe-alt" class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Bahasa Internasional</h3>
            <p class="text-gray-600 leading-relaxed">Pembiasaan bahasa Arab dan Inggris untuk komunikasi harian seluruh santri.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>