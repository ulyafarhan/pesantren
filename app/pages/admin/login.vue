<script setup lang="ts">
definePageMeta({
  layout: false
})
useHead({
  title: 'Login Admin - PesantrenKu'
})

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    navigateTo('/admin')
  }, 1000)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-green-700 mb-2">PesantrenKu</h1>
        <h2 class="text-2xl font-extrabold text-gray-900">
          Masuk ke Sistem
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Gunakan kredensial pengelola untuk mengakses panel kontrol.
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-5">
          <UFormGroup label="Alamat Email">
            <UInput v-model="email" type="email" placeholder="admin@pesantrenku.com" size="xl" icon="i-heroicons-envelope" required />
          </UFormGroup>
          
          <UFormGroup label="Kata Sandi">
            <UInput v-model="password" type="password" placeholder="••••••••" size="xl" icon="i-heroicons-lock-closed" required />
          </UFormGroup>
        </div>

        <div class="pt-2">
          <UButton type="submit" color="green" variant="solid" size="xl" block :loading="loading" class="justify-center">
            Masuk ke Dasbor
          </UButton>
        </div>

        <div class="text-center mt-6">
          <NuxtLink to="/" class="text-sm font-medium text-foreground/70 hover:text-green-600 transition-colors inline-flex items-center gap-1">
            <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" /> Kembali ke Web Utama
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>