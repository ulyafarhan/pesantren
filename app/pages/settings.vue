<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const links = [[{
  label: 'Sistem Utama',
  icon: 'i-lucide-settings-2',
  to: '/settings',
  exact: true
}, {
  label: 'Keanggotaan',
  icon: 'i-lucide-users',
  to: '/settings/members'
}, {
  label: 'Notifikasi',
  icon: 'i-lucide-bell',
  to: '/settings/notifications'
}, {
  label: 'Keamanan',
  icon: 'i-lucide-shield',
  to: '/settings/security'
}], [{
  label: 'Dokumentasi API',
  icon: 'i-lucide-book-open',
  to: 'https://ui.nuxt.com/docs/getting-started/installation/nuxt',
  target: '_blank'
}]] satisfies NavigationMenuItem[][]
</script>

<template>
  <UDashboardPanel id="settings" class="relative z-10 bg-background border-border rounded-xl" :ui="{ body: 'lg:py-12' }">
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>
    
    <template #header>
      <UDashboardNavbar title="Konfigurasi" class="border-b border-border bg-background/90 backdrop-blur-sm relative z-10 font-black uppercase tracking-widest">
        <template #leading>
          <UDashboardSidebarCollapse class="rounded-xl border border-border" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar class="border-b border-border bg-muted/20 relative z-10 py-0">
        <UNavigationMenu 
          :items="links" 
          highlight 
          class="-mx-1 flex-1 font-bold uppercase tracking-widest text-[9px]" 
          :ui="{ link: { base: 'rounded-xl border-b-2 border-transparent data-[state=active]:border-primary' } }"
        />
      </UDashboardToolbar>
    </template>

    <template #body>
      <div class="flex flex-col gap-4 sm:gap-6 lg:gap-12 w-full lg:max-w-4xl mx-auto relative z-10 bg-card p-10 border border-border shadow-2xl">
        <div class="w-12 h-[2px] bg-primary mb-4"></div>
        <NuxtPage />
      </div>
    </template>
  </UDashboardPanel>
</template>