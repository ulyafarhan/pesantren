<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex bg-gray-50">
    <aside class="w-64 bg-gray-900 text-white flex flex-col hidden md:flex">
      <div class="h-16 flex items-center justify-center border-b border-gray-800">
        <span class="font-bold text-xl">Panel Admin</span>
      </div>
      <nav class="flex-1 p-4 flex flex-col gap-2">
        <NuxtLink to="/admin" class="px-4 py-2 rounded hover:bg-gray-800 transition-colors">Dashboard</NuxtLink>
        <NuxtLink to="/admin/articles" class="px-4 py-2 rounded hover:bg-gray-800 transition-colors">Kelola Artikel</NuxtLink>
        <NuxtLink to="/" class="px-4 py-2 rounded hover:bg-gray-800 transition-colors text-gray-400 mt-auto">Kembali ke Web</NuxtLink>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col min-w-0">
      <header class="h-16 bg-white shadow-sm flex items-center px-6 justify-between">
        <div class="font-medium text-gray-800">Sistem Manajemen Konten</div>
      </header>
      
      <main class="flex-1 p-6 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>