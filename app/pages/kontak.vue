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
  <div class="min-h-screen bg-background text-foreground relative overflow-hidden pb-32 border-b border-border">
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

    <header class="py-24 relative z-10 border-b border-border bg-background/80 backdrop-blur-sm text-center">
      <div class="container mx-auto px-6">
        <div class="max-w-3xl mx-auto space-y-6">
          <div class="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 text-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-[0.3em]">
            <MessageCircle class="w-4 h-4" /> Layanan Informasi
          </div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95]">
            Kontak & <span class="text-primary italic font-serif">Lokasi</span>
          </h1>
          <p class="text-muted-foreground font-medium text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Pintu kami selalu terbuka untuk silaturahmi. Hubungi kami untuk pertanyaan seputar pendaftaran, kurikulum, atau kunjungan langsung secara terstruktur.
          </p>
        </div>
      </div>
    </header>

    <section class="py-24 relative z-10">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div class="lg:col-span-5 space-y-8 flex flex-col">
            <UiCard class="p-10 border border-border rounded-xl shadow-none bg-card space-y-10 group overflow-hidden flex-grow relative hover:border-primary transition-colors duration-500">
               <div class="absolute top-0 right-0 w-16 h-16 border-t border-r border-primary/0 group-hover:border-primary/50 transition-colors duration-500"></div>
               
               <div class="space-y-4">
                  <h3 class="text-2xl font-black tracking-tight">Informasi Resmi</h3>
                  <div class="w-12 h-[2px] bg-primary"></div>
               </div>
               
               <div class="space-y-8 relative z-10">
                  <div class="flex items-start gap-5 group/item">
                     <div class="w-12 h-12 rounded-xl bg-background flex items-center justify-center shrink-0 border border-border group-hover/item:border-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300">
                        <MapPin class="w-5 h-5" />
                     </div>
                     <div class="space-y-1 text-left">
                        <span class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-none">Alamat Fisik</span>
                        <p class="text-sm font-bold leading-relaxed text-foreground">{{ settings.contact_address || 'Jl. Raya Pendidikan Utama No. 1, Bogor, Jawa Barat' }}</p>
                     </div>
                  </div>

                  <div class="flex items-start gap-5 group/item">
                     <div class="w-12 h-12 rounded-xl bg-background flex items-center justify-center shrink-0 border border-border group-hover/item:border-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300">
                        <Phone class="w-5 h-5" />
                     </div>
                     <div class="space-y-1 text-left">
                        <span class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-none">Telepon / WhatsApp</span>
                        <p class="text-sm font-bold leading-relaxed text-foreground">{{ settings.contact_phone || '+62 800-0000-0000' }}</p>
                     </div>
                  </div>

                  <div class="flex items-start gap-5 group/item">
                     <div class="w-12 h-12 rounded-xl bg-background flex items-center justify-center shrink-0 border border-border group-hover/item:border-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300">
                        <Mail class="w-5 h-5" />
                     </div>
                     <div class="space-y-1 text-left">
                        <span class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-none">Surat Elektronik</span>
                        <p class="text-sm font-bold leading-relaxed text-foreground">{{ settings.contact_email || 'hubungi@pesantrenku.com' }}</p>
                     </div>
                  </div>

                  <div class="flex items-start gap-5 group/item">
                     <div class="w-12 h-12 rounded-xl bg-background flex items-center justify-center shrink-0 border border-border group-hover/item:border-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-all duration-300">
                        <Clock class="w-5 h-5" />
                     </div>
                     <div class="space-y-1 text-left">
                        <span class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-none">Operasional Kantor</span>
                        <p class="text-sm font-medium leading-relaxed text-foreground italic font-serif">Senin - Sabtu: 08.00 - 16.00 WIB</p>
                     </div>
                  </div>
               </div>
            </UiCard>

            <div class="bg-foreground text-background p-10 rounded-xl relative overflow-hidden group border border-border shrink-0">
               <div class="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/20 blur-3xl opacity-30"></div>
               <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div class="space-y-1 text-center md:text-left">
                     <h4 class="text-lg font-black tracking-tight text-background">Saluran Resmi</h4>
                     <p class="text-[10px] uppercase tracking-widest font-bold text-background/60">Sosial Media</p>
                  </div>
                  <div class="flex gap-3">
                     <a :href="settings.social_instagram" target="_blank" class="w-12 h-12 bg-background/5 hover:bg-primary flex items-center justify-center transition-all duration-300 border border-background/10 active:scale-95 text-white">
                        <Instagram class="w-5 h-5" />
                     </a>
                     <a :href="settings.social_youtube" target="_blank" class="w-12 h-12 bg-background/5 hover:bg-primary flex items-center justify-center transition-all duration-300 border border-background/10 active:scale-95 text-white">
                        <Youtube class="w-5 h-5" />
                     </a>
                     <a :href="settings.social_facebook" target="_blank" class="w-12 h-12 bg-background/5 hover:bg-primary flex items-center justify-center transition-all duration-300 border border-background/10 active:scale-95 text-white">
                        <Facebook class="w-5 h-5" />
                     </a>
                  </div>
               </div>
            </div>
          </div>

          <div class="lg:col-span-7 space-y-8 flex flex-col">
            <div class="bg-card rounded-xl border border-border p-2 shadow-sm relative overflow-hidden flex-grow group">
               <div class="bg-muted h-full min-h-[400px] flex flex-col items-center justify-center relative ring-1 ring-border border border-border overflow-hidden group-hover:border-primary/50 transition-colors duration-500">
                  <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0"></div>
                  
                  <div class="relative z-10 flex flex-col items-center justify-center text-center p-12 space-y-6">
                     <div class="w-20 h-20 rounded-xl bg-background border border-border shadow-md flex items-center justify-center">
                        <Navigation class="w-8 h-8 text-primary" />
                     </div>
                     <div class="space-y-2">
                        <h3 class="text-2xl font-black tracking-tighter text-foreground text-center">Peta Navigasi Pesantren</h3>
                        <p class="text-muted-foreground text-sm font-medium leading-relaxed max-w-sm text-center mx-auto">Lokasi strategis yang mendukung konsentrasi belajar dan ketenangan ibadah.</p>
                     </div>
                     <UiButton as-child class="h-14 px-10 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-widest text-xs transition-transform active:scale-95">
                        <a href="https://maps.google.com" target="_blank" class="flex items-center gap-3">
                           Buka Google Maps <ExternalLink class="w-4 h-4" />
                        </a>
                     </UiButton>
                  </div>
                  
                  <div class="absolute bottom-6 left-6 flex items-center gap-3 bg-background border border-border px-4 py-2">
                     <div class="w-2 h-2 bg-primary rounded-xl"></div>
                     <span class="text-[10px] font-bold uppercase tracking-widest text-foreground">Koordinat Terverifikasi</span>
                  </div>
               </div>
            </div>

            <div class="p-8 md:p-10 bg-background border border-border flex flex-col md:flex-row items-center gap-8 shrink-0 relative overflow-hidden group hover:border-primary transition-colors duration-500">
               <div class="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/0 group-hover:border-primary/50 transition-colors duration-500"></div>
               
               <div class="w-16 h-16 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 border border-primary/20">
                  <Users class="w-8 h-8" />
               </div>
               <div class="flex-1 text-center md:text-left space-y-2">
                  <h4 class="text-xl font-black tracking-tight text-foreground">Kunjungan Terbuka</h4>
                  <p class="text-muted-foreground text-xs font-medium leading-relaxed italic font-serif">Kami mengundang wali santri untuk melihat langsung proses KBM & sarana kami secara struktural.</p>
               </div>
               <UiButton variant="outline" class="h-12 px-6 rounded-xl border-border hover:border-primary text-foreground font-bold uppercase tracking-widest text-[10px] hover:bg-primary hover:text-primary-foreground transition-all active:scale-95">
                  Jadwalkan Kunjungan
               </UiButton>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>