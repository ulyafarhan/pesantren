<script setup lang="ts">
import { FileDown, FileText, Download, CheckCircle2, Phone, Info, LayoutGrid, Sparkles, ArrowRight } from 'lucide-vue-next';

definePageMeta({ layout: 'default' });
useHead({ title: 'Download Brosur - PesantrenKu' });

const { data: brochures } = await useFetch('/api/brochures');
</script>

<template>
  <div class="min-h-screen bg-background text-foreground overflow-hidden pb-32">
    <div class="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

    <header class="py-24 lg:py-32 relative z-10 border-b border-border bg-background/80 backdrop-blur-sm">
      <div class="container mx-auto px-6 relative">
        <div class="max-w-4xl space-y-8 text-center mx-auto">
          <div class="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 text-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-[0.3em]">
            <FileDown class="w-4 h-4" /> Download Center
          </div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95]">
            Brosur & <span class="text-primary italic font-serif">Informasi</span>
          </h1>
          <p class="text-muted-foreground font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            Dapatkan detail pendaftaran, program unggulan, dan kurikulum PesantrenKu dalam format digital yang terstruktur dan praktis.
          </p>
        </div>

        <div class="mt-16 flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
           <div class="flex items-center gap-3 px-6 py-4 bg-card rounded-xl border border-border shadow-sm hover:border-primary transition-colors cursor-default">
              <FileText class="w-4 h-4 text-primary" /> Format PDF Digital
           </div>
           <div class="flex items-center gap-3 px-6 py-4 bg-card rounded-xl border border-border shadow-sm hover:border-primary transition-colors cursor-default">
              <CheckCircle2 class="w-4 h-4 text-primary" /> Dokumen Resmi 2026/2027
           </div>
        </div>
      </div>
    </header>

    <main class="py-24 container mx-auto px-6 relative z-10">
      <div v-if="!brochures || brochures.length === 0" class="text-center py-32 space-y-6 border border-border bg-card">
          <div class="w-20 h-20 border border-border flex items-center justify-center mx-auto bg-background">
             <FileDown class="w-10 h-10 text-muted-foreground/40" />
          </div>
          <h3 class="text-2xl font-black text-foreground tracking-tighter">Dalam Tahap Revisi</h3>
          <p class="text-muted-foreground font-medium max-w-md mx-auto">Dokumen brosur sedang dalam proses pembaruan data tahun ajaran baru. Silakan hubungi kami untuk informasi awal.</p>
          <UiButton as-child variant="outline" class="rounded-xl border-border hover:bg-primary hover:text-primary-foreground font-bold uppercase tracking-widest text-xs h-12 px-8">
             <NuxtLink to="/kontak" class="flex items-center gap-2">Hubungi Panitia <Phone class="w-4 h-4" /></NuxtLink>
          </UiButton>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <UiCard 
          v-for="b in brochures" 
          :key="b.id" 
          class="group p-8 md:p-10 bg-card border border-border rounded-xl transition-all duration-500 hover:border-primary hover:shadow-[0_0_30px_-15px_rgba(16,185,129,0.3)] hover:-translate-y-1 relative overflow-hidden flex flex-col h-full"
        >
          <div class="absolute top-0 right-0 w-16 h-16 border-t border-r border-primary/0 group-hover:border-primary/50 transition-colors duration-500"></div>
          
          <div class="relative z-10 flex-grow space-y-8">
            <div class="flex items-start justify-between">
              <div class="w-14 h-14 bg-background border border-border flex items-center justify-center text-foreground group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-500">
                <FileText class="w-6 h-6" />
              </div>
              <span class="bg-background border border-border text-muted-foreground font-bold text-[9px] uppercase tracking-widest px-3 py-1">{{ b.version || 'General' }}</span>
            </div>
            
            <div class="space-y-4">
               <h3 class="text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors truncate">{{ b.title }}</h3>
               <div class="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <div class="w-6 h-[1px] bg-border group-hover:bg-primary transition-colors"></div>
                  Terverifikasi
               </div>
            </div>
          </div>

          <div class="pt-8 mt-8 border-t border-border/50">
             <UiButton as-child class="w-full h-14 rounded-xl bg-foreground hover:bg-primary text-background hover:text-primary-foreground font-bold uppercase tracking-widest text-xs transition-all active:scale-95 group/btn border border-transparent">
                <a :href="b.fileUrl" target="_blank" class="flex items-center justify-between px-6">
                   <span>Unduh Dokumen (PDF)</span>
                   <Download class="w-5 h-5 group-hover/btn:translate-y-0.5 transition-transform" />
                </a>
             </UiButton>
          </div>
        </UiCard>
      </div>
    </main>

    <section class="container mx-auto px-6 relative z-10">
       <div class="p-12 md:p-24 bg-foreground text-background border border-border rounded-xl flex flex-col items-center text-center space-y-10 relative overflow-hidden group">
          <div class="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary/20 to-transparent mix-blend-overlay"></div>
          <div class="absolute bottom-0 right-0 p-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
             <Info class="w-64 h-64" />
          </div>
          <div class="absolute top-8 right-8 w-16 h-[2px] bg-primary"></div>
          
          <div class="relative z-10 space-y-6 max-w-2xl">
             <h2 class="text-4xl md:text-5xl font-black tracking-tighter leading-[1]">Butuh Bantuan <span class="italic font-serif text-primary">Lebih Lanjut?</span></h2>
             <p class="text-background/70 text-base md:text-lg font-medium leading-relaxed">
               Tim administrasi kami siap membantu memberikan detail instruksi pengisian formulir atau memandu kunjungan lokasi jika Anda memerlukan arahan.
             </p>
          </div>
          
          <div class="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10 pt-4">
             <UiButton as-child class="h-16 px-10 rounded-xl text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground active:scale-95 transition-transform">
                <NuxtLink to="/kontak" class="flex items-center gap-3">
                   <Phone class="w-5 h-5" /> Hubungi Panitia
                </NuxtLink>
             </UiButton>
             <div class="flex items-center gap-4 px-6 h-16 border border-background/20 text-[10px] font-bold uppercase tracking-widest text-background bg-background/5 backdrop-blur-sm cursor-default hover:bg-background/10 transition-colors">
                <Sparkles class="w-4 h-4 text-primary" /> Konsultasi Gratis
             </div>
          </div>
       </div>
    </section>
  </div>
</template>