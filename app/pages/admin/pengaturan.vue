<script setup lang="ts">
import { Save, Loader2, Globe, Phone, Mail, MapPin, Instagram, Youtube, Facebook, CheckCircle2, ShieldCheck, Layout } from 'lucide-vue-next';

definePageMeta({ layout: 'admin', middleware: 'admin-only' });
useHead({ title: 'Konfigurasi Sistem - Admin PesantrenKu' });

const { data: settingsData, refresh } = await useFetch('/api/settings');
const loading = ref(false);
const successMsg = ref('');

const settingsMap = computed(() => { 
  const map: Record<string, string> = {}; 
  for (const s of (settingsData.value || []) as any[]) { 
    map[s.key] = s.value; 
  } 
  return map;
});

const form = reactive({ 
  site_name: '', 
  site_tagline: '', 
  contact_phone: '', 
  contact_email: '', 
  contact_address: '', 
  social_instagram: '', 
  social_youtube: '', 
  social_facebook: '' 
});

// Initialize form once data is loaded
watchEffect(() => {
  if (settingsData.value) {
    form.site_name = settingsMap.value.site_name || '';
    form.site_tagline = settingsMap.value.site_tagline || '';
    form.contact_phone = settingsMap.value.contact_phone || '';
    form.contact_email = settingsMap.value.contact_email || '';
    form.contact_address = settingsMap.value.contact_address || '';
    form.social_instagram = settingsMap.value.social_instagram || '';
    form.social_youtube = settingsMap.value.social_youtube || '';
    form.social_facebook = settingsMap.value.social_facebook || '';
  }
});

const handleSave = async () => {
    loading.value = true;
    successMsg.value = '';
    try {
        const promises = Object.entries(form).map(([key, value]) => 
            $fetch('/api/settings', { method: 'POST', body: { key, value }})
        );
        await Promise.all(promises);
        successMsg.value = 'Konfigurasi sistem berhasil diperbarui.';
        refresh();
        setTimeout(() => successMsg.value = '', 3000);
    } catch(e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
}
</script>

<template> 
  <div class="max-w-4xl space-y-8 animate-in fade-in duration-500 relative z-10"> 
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border pb-6"> 
      <div class="space-y-1 text-left"> 
        <h1 class="text-3xl font-black tracking-tighter text-foreground uppercase">Konfigurasi Global</h1> 
        <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Manajemen Identitas & Parameter Tautan</p> 
      </div> 
      <UiButton @click="handleSave" :disabled="loading" class="bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-[9px] h-12 px-8 rounded-xl border border-primary transition-all active:scale-95"> 
        <Loader2 v-if="loading" class="mr-2 size-4 animate-spin" /> 
        <Save v-else class="mr-2 size-4" /> EKSEKUSI PEMBARUAN 
      </UiButton> 
    </div> 

    <div v-if="successMsg" class="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] uppercase tracking-widest font-bold flex items-center gap-3"> 
      <CheckCircle2 class="size-4 shrink-0" /> {{ successMsg }} 
    </div> 

    <div class="grid grid-cols-1 gap-8"> 
      <UiCard class="border border-border bg-card rounded-xl overflow-hidden shadow-none"> 
        <UiCardHeader class="p-6 border-b border-border bg-muted/10"> 
          <UiCardTitle class="text-sm font-black uppercase tracking-widest flex items-center gap-3"> 
            <Layout class="size-4 text-primary" /> Identitas Utama 
          </UiCardTitle> 
        </UiCardHeader> 
        <UiCardContent class="p-8 space-y-6 bg-background"> 
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> 
            <div class="space-y-2"> 
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Label Institusi</label> 
              <div class="relative flex"> 
                <div class="w-12 h-11 bg-muted border border-border border-r-0 flex items-center justify-center shrink-0"><Globe class="w-4 h-4 text-muted-foreground" /></div>
                <UiInput v-model="form.site_name" placeholder="PESANTRENKU" class="h-11 border-border bg-background focus-visible:ring-primary rounded-xl font-bold uppercase tracking-widest flex-1" /> 
              </div> 
            </div> 
            <div class="space-y-2"> 
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Moto / Tagline</label> 
              <UiInput v-model="form.site_tagline" placeholder="Membangun Generasi..." class="h-11 border-border bg-background focus-visible:ring-primary rounded-xl font-serif italic text-sm" /> 
            </div> 
          </div> 
        </UiCardContent> 
      </UiCard> 

      <UiCard class="border border-border bg-card rounded-xl overflow-hidden shadow-none"> 
        <UiCardHeader class="p-6 border-b border-border bg-muted/10"> 
          <UiCardTitle class="text-sm font-black uppercase tracking-widest flex items-center gap-3"> 
            <Phone class="size-4 text-primary" /> Pusat Komunikasi 
          </UiCardTitle> 
        </UiCardHeader> 
        <UiCardContent class="p-8 space-y-6 bg-background"> 
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> 
            <div class="space-y-2"> 
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Telepon Operasional</label> 
              <div class="relative flex"> 
                <div class="w-12 h-11 bg-muted border border-border border-r-0 flex items-center justify-center shrink-0"><Phone class="w-4 h-4 text-muted-foreground" /></div>
                <UiInput v-model="form.contact_phone" placeholder="+62..." class="h-11 border-border bg-background focus-visible:ring-primary rounded-xl font-mono text-xs flex-1" /> 
              </div> 
            </div> 
            <div class="space-y-2"> 
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Surel Elektronik</label> 
              <div class="relative flex"> 
                <div class="w-12 h-11 bg-muted border border-border border-r-0 flex items-center justify-center shrink-0"><Mail class="w-4 h-4 text-muted-foreground" /></div>
                <UiInput v-model="form.contact_email" placeholder="admin@..." class="h-11 border-border bg-background focus-visible:ring-primary rounded-xl font-mono text-xs flex-1" /> 
              </div> 
            </div> 
          </div> 
          <div class="space-y-2 text-left"> 
            <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Alamat Fasilitas</label> 
            <div class="relative flex"> 
              <div class="w-12 h-[100px] bg-muted border border-border border-r-0 flex items-center justify-center shrink-0"><MapPin class="w-4 h-4 text-muted-foreground" /></div>
              <UiTextarea v-model="form.contact_address" placeholder="Jl. Raya..." class="min-h-[100px] border-border bg-background focus-visible:ring-primary rounded-xl resize-none font-serif italic text-sm flex-1" /> 
            </div> 
          </div> 
        </UiCardContent> 
      </UiCard> 

      <UiCard class="border border-border bg-card rounded-xl overflow-hidden shadow-none"> 
        <UiCardHeader class="p-6 border-b border-border bg-muted/10"> 
          <UiCardTitle class="text-sm font-black uppercase tracking-widest flex items-center gap-3"> 
            <ShieldCheck class="size-4 text-primary" /> Integrasi Jaringan 
          </UiCardTitle> 
        </UiCardHeader> 
        <UiCardContent class="p-8 space-y-6 bg-background"> 
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> 
            <div class="space-y-2"> 
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2"> <Instagram class="size-3" /> Instagram </label> 
              <UiInput v-model="form.social_instagram" placeholder="URL..." class="h-11 border-border bg-background focus-visible:ring-primary rounded-xl font-mono text-[10px]" /> 
            </div> 
            <div class="space-y-2"> 
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2"> <Youtube class="size-3" /> YouTube </label> 
              <UiInput v-model="form.social_youtube" placeholder="URL..." class="h-11 border-border bg-background focus-visible:ring-primary rounded-xl font-mono text-[10px]" /> 
            </div> 
            <div class="space-y-2"> 
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2"> <Facebook class="size-3" /> Facebook </label> 
              <UiInput v-model="form.social_facebook" placeholder="URL..." class="h-11 border-border bg-background focus-visible:ring-primary rounded-xl font-mono text-[10px]" /> 
            </div> 
          </div> 
        </UiCardContent> 
      </UiCard> 
    </div> 
  </div>
</template>