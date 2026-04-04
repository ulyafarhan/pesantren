<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import type { Mail } from '~/types'

const tabItems = [{
  label: 'Semua Pesan',
  value: 'all'
}, {
  label: 'Belum Dibaca',
  value: 'unread'
}]
const selectedTab = ref('all')

const { data: mails } = await useFetch<Mail[]>('/api/mails', { default: () => [] })

const filteredMails = computed(() => {
  if (selectedTab.value === 'unread') {
    return mails.value.filter(mail => !!mail.unread)
  }
  return mails.value
})

const selectedMail = ref<Mail | null>()

const isMailPanelOpen = computed({
  get() {
    return !!selectedMail.value
  },
  set(value: boolean) {
    if (!value) {
      selectedMail.value = null
    }
  }
})

watch(filteredMails, () => {
  if (!filteredMails.value.find(mail => mail.id === selectedMail.value?.id)) {
    selectedMail.value = null
  }
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('lg')
</script>

<template>
  <UDashboardPanel
    id="inbox-1"
    :default-size="25"
    :min-size="20"
    :max-size="30"
    resizable
    class="border-r border-border bg-background relative z-10 rounded-xl"
  >
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

    <UDashboardNavbar title="Kotak Masuk" class="border-b border-border bg-background/80 backdrop-blur-sm relative z-10 font-black uppercase tracking-widest text-foreground">
      <template #leading>
        <UDashboardSidebarCollapse class="rounded-xl border border-border hover:bg-primary hover:text-primary-foreground transition-colors" />
      </template>
      <template #trailing>
        <UBadge :label="filteredMails.length" variant="subtle" class="rounded-xl border border-primary/20 bg-primary/10 text-primary font-bold text-[10px]" />
      </template>

      <template #right>
        <UTabs
          v-model="selectedTab"
          :items="tabItems"
          :content="false"
          size="xs"
          class="font-bold uppercase tracking-widest text-[9px]"
          :ui="{ list: { rounded: 'rounded-xl', tab: { rounded: 'rounded-xl' } } }"
        />
      </template>
    </UDashboardNavbar>
    
    <div class="relative z-10 h-full overflow-hidden border-t border-border/10">
      <InboxList v-model="selectedMail" :mails="filteredMails" />
    </div>
  </UDashboardPanel>

  <InboxMail v-if="selectedMail" :mail="selectedMail" @close="selectedMail = null" class="relative z-20 border-l border-border bg-background" />
  <div v-else class="hidden lg:flex flex-1 items-center justify-center bg-muted/10 relative z-0 border-l border-border">
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
    <div class="flex flex-col items-center gap-4 opacity-40">
       <UIcon name="i-lucide-inbox" class="w-24 h-24 text-muted-foreground" />
       <span class="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Pilih Pesan</span>
    </div>
  </div>

  <ClientOnly>
    <USlideover v-if="isMobile" v-model:open="isMailPanelOpen">
      <template #content>
        <InboxMail v-if="selectedMail" :mail="selectedMail" @close="selectedMail = null" class="rounded-xl border-l border-border" />
      </template>
    </USlideover>
  </ClientOnly>
</template>