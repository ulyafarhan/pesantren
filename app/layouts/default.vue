<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans bg-white text-gray-900">
    <header class="w-full bg-white shadow-md z-50 sticky top-0">
      <div class="container mx-auto px-6 h-16 flex items-center justify-between">
        <div class="font-bold text-2xl text-green-700">PesantrenKu</div>
        <nav class="hidden md:flex gap-8 font-medium">
          <NuxtLink to="/" class="hover:text-green-600 transition-colors">Beranda</NuxtLink>
          <NuxtLink to="/sejarah" class="hover:text-green-600 transition-colors">Sejarah</NuxtLink>
          <NuxtLink to="/artikel" class="hover:text-green-600 transition-colors">Artikel</NuxtLink>
          <NuxtLink to="/galeri" class="hover:text-green-600 transition-colors">Galeri</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="bg-gray-900 text-white py-8 mt-auto">
      <div class="container mx-auto px-6 text-center">
        <p>&copy; 2026 PesantrenKu. Hak Cipta Dilindungi.</p>
      </div>
    </footer>
  </div>
</template>