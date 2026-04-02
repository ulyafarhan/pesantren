<script setup lang="ts">
import { FileDown, FileText, Download, CheckCircle2, MoreVertical, Search, ExternalLink, ChevronRight, Sparkles, MessageCircle, Phone, Info } from 'lucide-vue-next';

definePageMeta({ layout: 'default' });
useHead({ title: 'Download Brosur - PesantrenKu' });

const { data: brochures } = await useFetch('/api/brochures');
</script>

<template>
  <div class="min-h-screen bg-background pb-32">
    <!-- Header Section -->
    <header class="py-24 relative overflow-hidden bg-muted/20 border-b border-border/10">
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-[0.03]"></div>
      <div class="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-xl blur-[120px]"></div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-3xl space-y-6 text-center mx-auto">
          <div class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
            <FileDown class="size-4" /> Download Center
          </div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-tight italic animate-in fade-in slide-in-from-bottom-8 duration-700">
            Brosur & <span class="text-primary not-italic tracking-tight underline decoration-muted-foreground/10 underline-offset-8">Informasi</span>
          </h1>
          <p class="text-muted-foreground font-medium text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed italic animate-in fade-in duration-1000 delay-200">
            Dapatkan detail pendaftaran, program unggulan, dan kurikulum PesantrenKu dalam format digital yang praktis.
          </p>
        </div>

        <!-- Meta Grid -->
        <div class="mt-16 flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
           <div class="flex items-center gap-2 px-6 py-3 bg-background rounded-xl border border-border/10 shadow-sm">
              <FileText class="size-3.5 text-primary" /> Format PDF Digital
           </div>
           <div class="flex items-center gap-2 px-6 py-3 bg-background rounded-xl border border-border/10 shadow-sm">
              <CheckCircle2 class="size-3.5 text-primary" /> Informasi Terkini 2026/2027
           </div>
        </div>
      </div>
    </header>

    <!-- Brochures List Grid -->
    <main class="py-24 container mx-auto px-6">
      <div v-if="!brochures || brochures.length === 0" class="text-center py-40 space-y-4">
          <div class="size-20 bg-muted rounded-xl flex items-center justify-center mx-auto mb-6 opacity-40">
             <FileDown class="size-10" />
          </div>
          <h3 class="text-2xl font-black italic text-foreground tracking-tighter">Brosur sedang dalam proses revisi</h3>
          <p class="text-muted-foreground font-medium italic">Silakan hubungi kami langsung via WhatsApp untuk draf informasi awal.</p>
          <UiButton as-child variant="link" class="text-primary font-black uppercase tracking-widest text-xs h-10 px-0">
             <NuxtLink to="/kontak" class="flex items-center gap-2">Hubungi Panitia <Phone class="size-3" /></NuxtLink>
          </UiButton>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <UiCard 
          v-for="b in brochures" 
          :key="b.id" 
          class="group p-10 bg-background border border-border/5 rounded-xl shadow-sm transition-all duration-300 hover:border-primary/50 relative overflow-hidden"
        >
          <!-- Abstract Background Pattern -->
          <div class="absolute -top-12 -right-12 size-48 bg-primary/5 rounded-xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="relative z-10 space-y-8 flex flex-col justify-between h-full"> 
            <div class="space-y-6">
              <div class="flex items-start justify-between">
                <div class="size-14 rounded-xl bg-red-500/5 flex items-center justify-center text-red-500 border border-red-500/10 group-hover:bg-red-500 group-hover:text-white transition-all duration-500">
                  <FileText class="size-6" />
                </div>
                <UiBadge variant="secondary" class="bg-muted text-muted-foreground font-black text-[8px] uppercase tracking-widest rounded-lg border-0 py-0.5 px-2">{{ b.version || 'General' }}</UiBadge>
              </div>
              
              <div class="space-y-4">
                 <h3 class="text-2xl font-black tracking-tight text-foreground italic group-hover:text-primary transition-colors leading-none truncate">{{ b.title }}</h3>
                 <p class="text-muted-foreground text-sm font-medium leading-relaxed italic flex items-center gap-2">
                    <CheckCircle2 class="size-3.5 text-emerald-500" /> Dokumen Resmi Terverifikasi
                 </p>
              </div>
            </div>

            <div class="pt-10">
               <UiButton as-child class="w-full h-14 rounded-xl bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-black shadow-lg shadow-black/5 transition-all active:scale-95 group/btn">
                  <a :href="b.fileUrl" target="_blank" class="flex items-center justify-between px-6">
                     <span>Unduh Sekarang (PDF)</span>
                     <Download class="size-5 group-hover/btn:translate-y-0.5 transition-transform" />
                  </a>
               </UiButton>
            </div>
          </div>
        </UiCard>
      </div>
    </main>

    <!-- Support Information Card -->
    <section class="container mx-auto px-6">
       <div class="max-w-4xl mx-auto p-12 md:p-20 bg-muted/40 rounded-xl flex flex-col items-center text-center space-y-8 border border-border/10 shadow-sm relative overflow-hidden">
          <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
          <div class="size-20 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-2xl shadow-primary/20 animate-pulse relative z-10">
             <Info class="size-10" />
          </div>
          <div class="space-y-4 relative z-10">
             <h2 class="text-3xl md:text-5xl font-black italic tracking-tighter text-foreground leading-[0.9]">Butuh Bantuan Lebih Lanjut?</h2>
             <p class="text-muted-foreground max-w-xl mx-auto font-medium italic text-sm leading-relaxed">Tim administrasi kami siap membantu memberikan detail instruksi pengisian formulir atau kunjungan lokasi jika Anda mengalami kesulitan.</p>
          </div>
          <div class="flex flex-col sm:flex-row gap-6 relative z-10">
             <UiButton variant="outline" as-child class="h-12 px-8 rounded-xl border-primary/20 text-primary font-black uppercase tracking-widest text-[10px] hover:bg-primary hover:text-primary-foreground transition-all">
                <NuxtLink to="/kontak" class="flex items-center gap-2">Hubungi Panitia <Phone class="size-3.5" /></NuxtLink>
             </UiButton>
             <div class="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground px-6 border-l border-border/10 hidden sm:flex">
                <Sparkles class="size-4 text-primary" /> Layanan Konsultasi Gratis
             </div>
          </div>
       </div>
    </section>
  </div>
</template>
