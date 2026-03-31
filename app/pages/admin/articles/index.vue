<script setup lang="ts">
definePageMeta({ middleware: 'admin-only' })

const supabase = useSupabaseClient()
const { data: articles, refresh } = await useAsyncData('admin-articles', async () => {
  const { data } = await supabase
    .from('articles')
    .select('id, title, is_published, created_at')
    .order('created_at', { ascending: false })
  return data
})

const deleteArticle = async (id: string) => {
  if (confirm('Yakin ingin menghapus artikel ini?')) {
    await supabase.from('articles').delete().eq('id', id)
    refresh()
  }
}
</script>

<template>
  <div class="p-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">Manajemen Artikel</h1>
      <NuxtLink to="/admin/articles/create" class="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium">+ Buat Artikel Baru</NuxtLink>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <table class="w-full text-left">
        <thead class="bg-slate-50 border-b border-slate-200">
          <tr>
            <th class="px-6 py-4 text-sm font-semibold">Judul Artikel</th>
            <th class="px-6 py-4 text-sm font-semibold">Status</th>
            <th class="px-6 py-4 text-sm font-semibold">Tanggal</th>
            <th class="px-6 py-4 text-sm font-semibold text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr v-for="item in articles" :key="item.id" class="hover:bg-slate-50">
            <td class="px-6 py-4 font-medium">{{ item.title }}</td>
            <td class="px-6 py-4">
              <span :class="item.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'" class="px-2 py-1 rounded text-xs font-bold uppercase">
                {{ item.is_published ? 'Published' : 'Draft' }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-slate-500">{{ new Date(item.created_at).toLocaleDateString('id-ID') }}</td>
            <td class="px-6 py-4 text-right space-x-2">
              <button @click="deleteArticle(item.id)" class="text-red-600 hover:underline text-sm font-medium">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>