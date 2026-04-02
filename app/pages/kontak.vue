<script setup lang="ts">
import { Phone, Mail, MapPin, Clock, Instagram, Youtube, Facebook, Map, ExternalLink, ChevronRight, Sparkles, MessageCircle, Users, Navigation } from 'lucide-vue-next';

definePageMeta({ layout: 'default' });
useHead({ title: 'Hubungi Kami - PesantrenKu' });

const { data: settingsData } = await useFetch('/api/settings');
const settings = computed(() => {
  const map: Record<string, string> = {};
  for (const s of (settingsData.value || []) as any[]) {
    map[s.key] = s.value;
  }
  return map;
});
</script>

<template>
  <div class="min-h-screen bg-background relative overflow-hidden pb-32">
    <!-- Decorative background elements -->
    <div class="absolute top-0 right-0 w-1/3 h-1/4 bg-primary/5 rounded-xl blur-[120px] -z-10"></div>
    <div class="absolute bottom-0 left-0 w-1/4 h-1/3 bg-emerald-500/5 rounded-xl blur-[100px] -z-10"></div>

    <!-- Page Header -->
    <header class="py-24 relative z-10 border-b border-border/10 bg-muted/20 text-center">
      <div class="container mx-auto px-6">
        <div class="max-w-3xl mx-auto space-y-6">
          <div class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] animate-in fade-in slide-in-from-top-2 duration-500">
            <MessageCircle class="size-4" /> Layanan Informasi
          </div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-tight italic animate-in fade-in slide-in-from-bottom-4 duration-500">
            Kontak & <span class="text-primary not-italic tracking-tight underline decoration-muted-foreground/10 underline-offset-8">Lokasi</span>
          </h1>
          <p class="text-muted-foreground font-medium text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed italic animate-in fade-in duration-1000">
            Pintu kami selalu terbuka untuk silaturahmi. Hubungi kami untuk pertanyaan seputar pendaftaran, kurikulum, atau kunjungan langsung.
          </p>
        </div>
        <!-- Breadcrumb -->
        <div class="mt-12 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          <NuxtLink to="/" class="hover:text-primary transition-colors">Beranda</NuxtLink>
          <ChevronRight class="size-3" />
          <span class="text-primary">Hubungi Kami</span>
        </div>
      </div>
    </header>

    <!-- Main Contact Section -->
    <section class="py-24 relative z-10">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <!-- Left Column: Contact Cards -->
          <div class="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <UiCard class="p-10 border-0 shadow-2xl shadow-black/5 ring-1 ring-border/5 rounded-xl bg-background space-y-10 group overflow-hidden">
               <div class="absolute -top-12 -right-12 size-48 bg-primary/5 rounded-xl blur-3xl transition-colors duration-700"></div>
               <div class="space-y-4">
                  <h3 class="text-2xl font-black tracking-tight italic">Informasi Resmi</h3>
                  <div class="w-12 h-1 bg-primary/20 rounded-xl"></div>
               </div>
               
               <div class="space-y-8 relative z-10">
                  <div class="flex items-start gap-5 group/item">
                     <div class="size-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10 group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-500 shadow-inner">
                        <MapPin class="size-5" />
                     </div>
                     <div class="space-y-1 text-left">
                        <span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none">Alamat Fisik</span>
                        <p class="text-sm font-bold leading-relaxed text-foreground">{{ settings.contact_address || 'Jl. Raya Pendidikan Utama No. 1, Bogor, Jawa Barat' }}</p>
                     </div>
                  </div>

                  <div class="flex items-start gap-5 group/item">
                     <div class="size-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10 group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-500 shadow-inner">
                        <Phone class="size-5" />
                     </div>
                     <div class="space-y-1 text-left">
                        <span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none">Telepon / WhatsApp</span>
                        <p class="text-sm font-bold leading-relaxed text-foreground">{{ settings.contact_phone || '+62 800-0000-0000' }}</p>
                     </div>
                  </div>

                  <div class="flex items-start gap-5 group/item">
                     <div class="size-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10 group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-500 shadow-inner">
                        <Mail class="size-5" />
                     </div>
                     <div class="space-y-1 text-left">
                        <span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none">Surat Elektronik</span>
                        <p class="text-sm font-bold leading-relaxed text-foreground">{{ settings.contact_email || 'hubungi@pesantrenku.com' }}</p>
                     </div>
                  </div>

                  <div class="flex items-start gap-5 group/item">
                     <div class="size-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 border border-primary/10 group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-500 shadow-inner">
                        <Clock class="size-5" />
                     </div>
                     <div class="space-y-1 text-left">
                        <span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none">Jam Operasional Kantor</span>
                        <p class="text-sm font-bold leading-relaxed text-foreground italic">Senin - Sabtu: 08.00 - 16.00 WIB</p>
                     </div>
                  </div>
               </div>
            </UiCard>

            <!-- Social Media Box -->
            <div class="bg-foreground text-background p-10 rounded-xl shadow-2xl relative overflow-hidden group border-0">
               <div class="absolute -bottom-12 -left-12 size-48 bg-primary/20 rounded-xl blur-3xl opacity-30"></div>
               <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div class="space-y-1 text-center md:text-left">
                     <h4 class="text-lg font-black tracking-tight italic text-background">Ikuti Publikasi Kami</h4>
                     <p class="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Sosial Media Resmi</p>
                  </div>
                  <div class="flex gap-3">
                     <a :href="settings.social_instagram" target="_blank" class="size-12 bg-white/5 hover:bg-primary rounded-xl flex items-center justify-center transition-all duration-300 border border-white/5 active:scale-95 shadow-sm">
                        <Instagram class="size-5 text-white" />
                     </a>
                     <a :href="settings.social_youtube" target="_blank" class="size-12 bg-white/5 hover:bg-primary rounded-xl flex items-center justify-center transition-all duration-300 border border-white/5 active:scale-95 shadow-sm">
                        <Youtube class="size-5 text-white" />
                     </a>
                     <a :href="settings.social_facebook" target="_blank" class="size-12 bg-white/5 hover:bg-primary rounded-xl flex items-center justify-center transition-all duration-300 border border-white/5 active:scale-95 shadow-sm">
                        <Facebook class="size-5 text-white" />
                     </a>
                  </div>
               </div>
            </div>
          </div>

          <!-- Right Column: Map & CTA -->
          <div class="lg:col-span-7 space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
            <div class="bg-muted/40 rounded-xl border border-border/10 p-4 md:p-6 shadow-inner relative overflow-hidden group">
               <!-- Decorative background patterns -->
               <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
               <div class="bg-background rounded-xl overflow-hidden min-h-[450px] flex flex-col items-center justify-center relative shadow-2xl ring-1 ring-border/5">
                  <!-- Map Placeholder -->
                  <div class="absolute inset-0 bg-muted/20 flex flex-col items-center justify-center text-center p-12 space-y-6">
                     <div class="size-24 rounded-xl bg-background shadow-2xl flex items-center justify-center">
                        <Navigation class="size-10 text-primary" />
                     </div>
                     <div class="space-y-2">
                        <h3 class="text-2xl font-black tracking-tighter italic text-foreground text-center">Peta Navigasi Pesantren</h3>
                        <p class="text-muted-foreground text-sm font-medium leading-relaxed max-w-sm italic text-center mx-auto">Lokasi kami berada di lingkungan asri yang mendukung konsentrasi belajar dan ketenangan ibadah.</p>
                     </div>
                     <UiButton as-child class="h-14 px-10 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-black shadow-xl transition-all active:scale-95 group/btn">
                        <a href="https://maps.google.com" target="_blank" class="flex items-center gap-2">
                           Buka di Google Maps <ExternalLink class="size-4" />
                        </a>
                     </UiButton>
                  </div>
                  <!-- Overlay bottom meta -->
                  <div class="absolute bottom-10 left-10 flex items-center gap-3 bg-background/80 backdrop-blur-md px-6 py-3 rounded-xl border border-border/10 shadow-sm">
                     <div class="size-3 bg-emerald-500 rounded-xl"></div>
                     <span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Real-time Location</span>
                  </div>
               </div>
            </div>

            <!-- CTA Form Hint -->
            <div class="p-10 bg-primary/5 rounded-xl border border-primary/10 flex flex-col md:flex-row items-center gap-8 group">
               <div class="size-16 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                  <Users class="size-8" />
               </div>
               <div class="flex-1 text-center md:text-left space-y-2">
                  <h4 class="text-xl font-black italic tracking-tight text-foreground">Kunjungan Terbuka</h4>
                  <p class="text-muted-foreground text-xs font-medium leading-relaxed opacity-70 italic">Kami sangat menyambut kehadiran wali santri untuk melihat langsung proses KBM & sarana kami. Silakan buat janji temu terlebih dahulu.</p>
               </div>
               <UiButton variant="outline" class="h-12 px-6 rounded-xl border-primary/20 text-primary font-black uppercase tracking-widest text-[10px] hover:bg-primary hover:text-primary-foreground transition-all active:scale-95">Jadwalkan</UiButton>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>
