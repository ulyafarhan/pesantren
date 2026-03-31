<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
</script>

<template>
  <div class="max-w-5xl mx-auto">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Ringkasan Sistem</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="text-gray-500 text-sm font-medium mb-1">Total Artikel</div>
        <div class="text-3xl font-bold text-gray-900">124</div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="text-gray-500 text-sm font-medium mb-1">Galeri Foto</div>
        <div class="text-3xl font-bold text-gray-900">48</div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="text-gray-500 text-sm font-medium mb-1">Pendaftar Baru</div>
        <div class="text-3xl font-bold text-green-600">12</div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 class="text-lg font-bold text-gray-900 mb-4">Aktivitas Terakhir</h2>
      <div class="space-y-4">
        <div class="flex justify-between items-center py-3 border-b border-gray-50">
          <div>
            <div class="font-medium text-gray-900">Artikel baru ditambahkan</div>
            <div class="text-sm text-gray-500">Oleh Admin Utama</div>
          </div>
          <div class="text-sm text-gray-400">2 jam yang lalu</div>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-gray-50">
          <div>
            <div class="font-medium text-gray-900">Pembaruan konfigurasi web</div>
            <div class="text-sm text-gray-500">Oleh Admin Sistem</div>
          </div>
          <div class="text-sm text-gray-400">5 jam yang lalu</div>
        </div>
      </div>
    </div>
  </div>
</template>