<script setup lang="ts">
import { Image as ImageIcon, Maximize2, Camera, Calendar, ArrowUpRight, Sparkles, Instagram, Youtube, Facebook, ChevronRight, Search } from 'lucide-vue-next';

definePageMeta({ layout: 'default' });
useHead({ title: 'Galeri & Dokumentasi - PesantrenKu' });

const { data: settingsData } = await useFetch('/api/settings');
const settings = computed(() => {
  const map: Record<string, string> = {};
  for (const s of (settingsData.value || []) as any[]) {
    map[s.key] = s.value;
  }
  return map;
});

const { data: galleries } = await useFetch('/api/galleries');
const showLightbox = ref(false);
const activeImage = ref<any>(null);

const openLightbox = (img: any) => {
  activeImage.value = img;
  showLightbox.value = true;
};
</script>

<template>
  <div class="min-h-screen bg-background text-foreground pb-32">
    <div class="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

    <header class="py-24 relative overflow-hidden bg-background/80 backdrop-blur-sm border-b border-border z-10">
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-3xl space-y-6 text-center mx-auto">
          <div class="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 text-primary px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.3em]">
            <Camera class="w-4 h-4" /> Portofolio Visual
          </div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95]">
            Momen & <span class="text-primary italic font-serif">Kenangan</span>
          </h1>
          <p class="text-muted-foreground font-medium text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Mengabadikan rekam jejak perjuangan santri dalam kegiatan akademik dan spiritual secara presisi.
          </p>
        </div>

        <div class="mt-16 flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
           <div class="flex items-center gap-3 px-6 py-4 bg-card rounded-xl border border-border shadow-sm hover:border-primary transition-colors cursor-default">
              <ImageIcon class="w-4 h-4 text-primary" /> {{ galleries?.length || 0 }} Karya Arsip
           </div>
           <div class="flex items-center gap-3 px-6 py-4 bg-card rounded-xl border border-border shadow-sm hover:border-primary transition-colors cursor-default">
              <Calendar class="w-4 h-4 text-primary" /> Tahun Ajaran 2026
           </div>
        </div>
      </div>
    </header>

    <main class="py-24 container mx-auto px-6 relative z-10">
      <div v-if="!galleries || galleries.length === 0" class="text-center py-32 space-y-6 border border-border bg-card">
          <div class="w-20 h-20 border border-border flex items-center justify-center mx-auto bg-background">
             <ImageIcon class="w-10 h-10 text-muted-foreground/40" />
          </div>
          <h3 class="text-2xl font-black text-foreground tracking-tighter">Arsip Kosong</h3>
          <p class="text-muted-foreground font-medium max-w-md mx-auto">Kami sedang menyusun dan mengkurasi materi dokumentasi terbaik untuk ditampilkan.</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="(img, idx) in galleries" 
          :key="img.id" 
          class="group relative overflow-hidden bg-muted aspect-square border border-border cursor-pointer hover:border-primary transition-colors duration-500"
          @click="openLightbox(img)"
        >
          <img :src="img.imageUrl" :alt="img.title" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
          
          <div class="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
            <div class="flex items-center justify-between">
               <span class="text-[9px] font-bold text-foreground border border-border bg-card px-2 py-1 uppercase tracking-widest">Detail Gambar</span>
               <Maximize2 class="w-4 h-4 text-primary" />
            </div>
            
            <div class="space-y-2">
              <div class="w-8 h-[2px] bg-primary mb-4"></div>
              <h3 class="text-foreground text-xl font-black tracking-tight">{{ img.title }}</h3>
              <p class="text-muted-foreground text-xs font-medium leading-relaxed line-clamp-2 italic font-serif">{{ img.description || 'Arsip dokumentasi kegiatan internal.' }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <section class="container mx-auto px-6 relative z-10 pb-32">
       <div class="p-12 md:p-20 bg-foreground text-background border border-border rounded-xl overflow-hidden relative shadow-none">
          <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] pointer-events-none"></div>
          <div class="absolute top-8 right-8 w-16 h-[2px] bg-primary"></div>
          
          <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
             <div class="space-y-6 text-center lg:text-left max-w-xl">
                <div class="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-[0.3em] text-[10px]">
                   Eksplorasi Jaringan
                </div>
                <h2 class="text-3xl md:text-5xl font-black tracking-tighter leading-tight">Pantau Aktivitas <br><span class="italic font-serif text-primary">Di Sosial Media</span></h2>
                <p class="text-background/70 font-medium text-sm leading-relaxed">Liputan harian, buletin visual, dan tayangan publikasi resmi tersedia secara terbuka pada saluran eksternal kami.</p>
             </div>
             <div class="flex flex-wrap justify-center gap-4">
                <div class="flex flex-col items-center gap-3">
                   <a :href="settings.social_instagram" target="_blank" class="w-16 h-16 bg-background/5 border border-background/20 hover:border-primary hover:bg-primary flex items-center justify-center transition-all duration-300 active:scale-95 text-white">
                      <Instagram class="w-6 h-6" />
                   </a>
                   <span class="text-[9px] font-bold uppercase tracking-widest text-background/60">Instagram</span>
                </div>
                <div class="flex flex-col items-center gap-3">
                   <a :href="settings.social_youtube" target="_blank" class="w-16 h-16 bg-background/5 border border-background/20 hover:border-primary hover:bg-primary flex items-center justify-center transition-all duration-300 active:scale-95 text-white">
                      <Youtube class="w-6 h-6" />
                   </a>
                   <span class="text-[9px] font-bold uppercase tracking-widest text-background/60">YouTube</span>
                </div>
                <div class="flex flex-col items-center gap-3">
                   <a :href="settings.social_facebook" target="_blank" class="w-16 h-16 bg-background/5 border border-background/20 hover:border-primary hover:bg-primary flex items-center justify-center transition-all duration-300 active:scale-95 text-white">
                      <Facebook class="w-6 h-6" />
                   </a>
                   <span class="text-[9px] font-bold uppercase tracking-widest text-background/60">Facebook</span>
                </div>
             </div>
          </div>
       </div>
    </section>

    <UiDialog v-model:open="showLightbox">
       <UiDialogContent class="max-w-[95vw] lg:max-w-5xl p-0 border border-border bg-background rounded-xl shadow-2xl overflow-hidden">
          <div v-if="activeImage" class="flex flex-col lg:flex-row">
             <div class="flex-grow bg-muted relative flex items-center justify-center p-4">
                <img :src="activeImage.imageUrl" class="max-h-[70vh] object-contain ring-1 ring-border shadow-md" />
             </div>
             <div class="w-full lg:w-96 bg-card p-10 border-l border-border flex flex-col justify-center space-y-6">
                <div class="w-12 h-[2px] bg-primary"></div>
                <h3 class="text-foreground text-3xl font-black tracking-tighter">{{ activeImage.title }}</h3>
                <p class="text-muted-foreground font-medium leading-relaxed">{{ activeImage.description }}</p>
                
                <div class="pt-8 mt-8 border-t border-border flex items-center justify-between">
                   <span class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">ID Arsip Visual</span>
                   <span class="text-[10px] font-black uppercase tracking-widest text-primary">{{ activeImage.id?.split('-')[0] || 'IMG' }}</span>
                </div>
             </div>
          </div>
       </UiDialogContent>
    </UiDialog>
  </div>
</template>