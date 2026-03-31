<script setup lang="ts">
definePageMeta({
  middleware: 'admin-only'
})

const supabase = useSupabaseClient()

// Mengambil ringkasan data dari Supabase
const { data: stats } = await useAsyncData('admin-stats', async () => {
  const [articles, galleries] = await Promise.all([
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('galleries').select('*', { count: 'exact', head: true })
  ])
  return {
    articles: articles.count || 0,
    galleries: galleries.count || 0
  }
})
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-slate-800 mb-8">Dashboard Overview</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <p class="text-sm font-medium text-slate-500 uppercase">Total Artikel</p>
        <p class="text-4xl font-bold text-emerald-600 mt-2">{{ stats?.articles }}</p>
        <NuxtLink to="/admin/articles" class="text-sm text-emerald-600 hover:underline mt-4 block">Kelola Artikel →</NuxtLink>
      </div>
      
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <p class="text-sm font-medium text-slate-500 uppercase">Foto Galeri</p>
        <p class="text-4xl font-bold text-blue-600 mt-2">{{ stats?.galleries }}</p>
        <NuxtLink to="/admin/galleries" class="text-sm text-blue-600 hover:underline mt-4 block">Lihat Galeri →</NuxtLink>
      </div>
    </div>
  </div>
</template>