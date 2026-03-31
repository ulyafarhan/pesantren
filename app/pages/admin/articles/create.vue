<script setup lang="ts">
definePageMeta({ middleware: 'admin-only' })

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const loading = ref(false)

const form = reactive({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  is_published: false
})

// Otomatis buat slug dari judul
watch(() => form.title, (newTitle) => {
  form.slug = newTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
})

async function handleSubmit() {
  loading.value = true
  try {
    const { error } = await supabase.from('articles').insert({
      ...form,
      author_id: user.value?.id,
      published_at: form.is_published ? new Date().toISOString() : null
    })

    if (error) throw error
    
    alert('Artikel berhasil disimpan!')
    navigateTo('/admin/articles')
  } catch (e: any) {
    alert(e.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="p-8 max-w-4xl mx-auto">
    <div class="mb-6">
      <NuxtLink to="/admin/articles" class="text-emerald-600 hover:underline">← Kembali ke Daftar</NuxtLink>
      <h1 class="text-2xl font-bold mt-2">Buat Artikel Baru</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div>
        <label class="block text-sm font-bold mb-2">Judul Artikel</label>
        <input v-model="form.title" type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Masukkan judul..." required />
      </div>

      <div>
        <label class="block text-sm font-bold mb-2">Slug (URL)</label>
        <input v-model="form.slug" type="text" class="w-full px-4 py-2 border bg-slate-50 rounded-lg outline-none text-slate-500" readonly />
      </div>

      <div>
        <label class="block text-sm font-bold mb-2">Ringkasan Singkat (Excerpt)</label>
        <textarea v-model="form.excerpt" rows="2" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" required></textarea>
      </div>

      <div>
        <label class="block text-sm font-bold mb-2">Konten Lengkap</label>
        <textarea v-model="form.content" rows="10" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" required></textarea>
      </div>

      <div class="flex items-center gap-2">
        <input v-model="form.is_published" type="checkbox" id="publish" class="w-4 h-4 accent-emerald-600" />
        <label for="publish" class="text-sm font-medium">Terbitkan Langsung?</label>
      </div>

      <button type="submit" :disabled="loading" class="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50">
        {{ loading ? 'Menyimpan...' : 'Simpan Artikel' }}
      </button>
    </form>
  </div>
</template>