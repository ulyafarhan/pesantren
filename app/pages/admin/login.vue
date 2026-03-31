<template>
  <div class="min-h-screen flex items-center justify-center bg-muted/40 p-4">
    <Card class="w-full max-w-md">
      <CardHeader class="space-y-1 text-center">
        <CardTitle class="text-2xl font-bold">CMS Pesantren</CardTitle>
        <CardDescription>Login untuk mengakses panel admin</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" v-model="email" required placeholder="admin@pesantren.com" />
          </div>
          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input id="password" type="password" v-model="password" required />
          </div>
          
          <div v-if="errorMsg" class="text-sm font-medium text-destructive">
            {{ errorMsg }}
          </div>

          <Button type="submit" class="w-full" :disabled="loading">
            <span v-if="loading">Memverifikasi...</span>
            <span v-else>Masuk ke Sistem</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

watchEffect(() => {
  if (user.value) {
    navigateTo('/admin')
  }
})

const handleLogin = async () => {
  loading.value = true
  errorMsg.value = ''
  
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  
  if (error) {
    errorMsg.value = error.message
  }
  
  loading.value = false
}

definePageMeta({
  layout: false
})
</script>