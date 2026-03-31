<template>
  <div class="min-h-screen bg-background flex w-full">
    <aside class="w-64 border-r bg-muted/40 flex flex-col">
      <div class="h-16 flex items-center border-b px-6">
        <h1 class="text-lg font-semibold">Admin Pesantren</h1>
      </div>
      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        <NuxtLink to="/admin" class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary" active-class="bg-muted text-primary">Dashboard</NuxtLink>
        <NuxtLink to="/admin/articles" class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary" active-class="bg-muted text-primary">Artikel</NuxtLink>
      </nav>
      <div class="p-4 border-t">
        <Button variant="destructive" class="w-full" @click="handleLogout">Logout</Button>
      </div>
    </aside>

    <main class="flex-1 flex flex-col h-screen overflow-hidden">
      <header class="h-16 flex items-center gap-4 border-b bg-muted/40 px-6 lg:px-8">
        <div class="ml-auto flex items-center space-x-4">
          <span class="text-sm font-medium">{{ user?.email }}</span>
        </div>
      </header>
      <div class="p-6 flex-1 overflow-auto">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo('/admin/login')
}
</script>