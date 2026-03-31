<script setup lang="ts">
definePageMeta({ layout: false })

const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    alert("Error: " + error.message)
  } else {
    navigateTo('/admin/articles')
  }
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-100 p-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <h2 class="text-2xl font-bold text-center text-emerald-800 mb-6">Login Pengelola</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700">Email</label>
          <input v-model="email" type="email" class="w-full mt-1 p-2 border border-slate-300 rounded-lg outline-emerald-500" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700">Password</label>
          <input v-model="password" type="password" class="w-full mt-1 p-2 border border-slate-300 rounded-lg outline-emerald-500" required />
        </div>
        <button type="submit" :disabled="loading" class="w-full bg-emerald-600 text-white py-2 rounded-lg font-bold hover:bg-emerald-700 transition disabled:opacity-50">
          {{ loading ? 'Mengecek...' : 'Masuk ke CMS' }}
        </button>
      </form>
    </div>
  </div>
</template>