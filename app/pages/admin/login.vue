<script setup lang="ts">
import { GraduationCap, ArrowLeft, Lock, Mail, Loader2, ShieldCheck } from 'lucide-vue-next';

definePageMeta({
  layout: false
})
useHead({
  title: 'Akses Sistem - PesantrenKu'
})

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    
    const token = useCookie('token')
    token.value = 'token-enkripsi-rahasia-123'
    
    navigateTo('/admin')
  }, 1000)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>
    
    <div class="w-full max-w-md bg-card border border-border p-10 relative z-10 shadow-2xl">
      <div class="absolute top-0 left-0 w-full h-[3px] bg-primary"></div>

      <div class="text-center mb-10">
        <div class="w-16 h-16 bg-primary mx-auto mb-6 flex items-center justify-center border border-border">
          <GraduationCap class="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 class="text-2xl font-black tracking-tighter text-foreground uppercase">Pesantren<span class="text-primary italic font-serif lowercase">Ku</span></h1>
        <h2 class="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mt-2">
          Otorisasi Pengelola Sistem
        </h2>
      </div>
      
      <form class="space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div class="space-y-2">
            <label class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">ID Identitas (Surel)</label>
            <div class="relative">
              <Mail class="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
              <input 
                v-model="email" 
                type="email" 
                placeholder="admin@pesantrenku.com" 
                class="w-full h-11 pl-10 pr-4 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all rounded-xl text-sm font-bold" 
                required 
              />
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sandi Enkripsi</label>
            <div class="relative">
              <Lock class="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
              <input 
                v-model="password" 
                type="password" 
                placeholder="••••••••" 
                class="w-full h-11 pl-10 pr-4 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all rounded-xl text-sm font-bold tracking-widest font-mono" 
                required 
              />
            </div>
          </div>
        </div>

        <div class="pt-4">
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
            <ShieldCheck v-else class="w-4 h-4" />
            Verifikasi Akses
          </button>
        </div>

        <div class="text-center mt-8 pt-6 border-t border-border/50">
          <NuxtLink to="/" class="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 uppercase tracking-widest">
            <ArrowLeft class="w-3 h-3" /> Kembali ke Protokol Publik
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>