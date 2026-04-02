<script setup lang="ts">
import { Image as ImageIcon, Maximize2, Camera, Calendar, ArrowUpRight, Sparkles, Instagram, Youtube, Facebook, ChevronRight, Search } from 'lucide-vue-next';

definePageMeta({ layout: 'default' });
useHead({ title: 'Galeri & Dokumentasi - PesantrenKu' });

const { data: galleries } = await useFetch('/api/galleries');
const showLightbox = ref(false);
const activeImage = ref<any>(null);

const openLightbox = (img: any) => {
  activeImage.value = img;
  showLightbox.value = true;
};
</script>

<template>
  <div class="min-h-screen bg-background pb-32">
    <!-- Header Section -->
    <header class="py-24 relative overflow-hidden bg-muted/20 border-b border-border/10">
      <div class="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-xl blur-3xl"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-3xl space-y-6 text-center mx-auto">
          <div class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
            <Camera class="size-4" /> Dokumentasi Kegiatan
          </div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-tight italic animate-in fade-in slide-in-from-bottom-8 duration-700">
            Momen & <span class="text-primary not-italic tracking-tight underline decoration-muted-foreground/10 underline-offset-8">Kenangan</span>
          </h1>
          <p class="text-muted-foreground font-medium text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed italic animate-in fade-in duration-1000 delay-200">
            Mengabadikan setiap jejak perjuangan santri dalam menuntut ilmu dan berkhidmat untuk agama.
          </p>
        </div>

        <!-- Filter Placeholder / Stats -->
        <div class="mt-16 flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
           <div class="flex items-center gap-2 px-6 py-3 bg-background rounded-xl border border-border/10 shadow-sm transition-colors hover:border-primary/50">
              <ImageIcon class="size-3.5 text-primary" /> {{ galleries?.length || 0 }} Karya Dokumentasi
           </div>
           <div class="flex items-center gap-2 px-6 py-3 bg-background rounded-xl border border-border/10 shadow-sm transition-colors hover:border-primary/50">
              <Calendar class="size-3.5 text-primary" /> Update Terbaru 2026
           </div>
        </div>
      </div>
    </header>

    <!-- Gallery Grid -->
    <main class="py-24 container mx-auto px-6">
      <div v-if="!galleries || galleries.length === 0" class="text-center py-40 space-y-4">
          <div class="size-20 bg-muted rounded-xl flex items-center justify-center mx-auto mb-6 opacity-40">
             <ImageIcon class="size-10" />
          </div>
          <h3 class="text-2xl font-black italic">Dokumentasi belum tersedia</h3>
          <p class="text-muted-foreground font-medium italic">Kami sedang mengkurasi momen terbaik untuk Anda lihat.</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div 
          v-for="(img, idx) in galleries" 
          :key="img.id" 
          class="group relative overflow-hidden rounded-xl bg-muted aspect-[4/5] md:aspect-square shadow-sm transition-all duration-300 hover:border-primary/50 ring-1 ring-border/5"
          @click="openLightbox(img)"
        >
          <img :src="img.imageUrl" :alt="img.title" class="w-full h-full object-cover transition-transform duration-1000" />
          
          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
            <div class="space-y-4">
              <div class="flex items-center gap-2">
                 <UiBadge variant="secondary" class="bg-primary/90 text-primary-foreground font-black text-[8px] uppercase tracking-widest rounded-lg border-0 shadow-lg">Highlight</UiBadge>
              </div>
              <h3 class="text-white text-xl font-black tracking-tight italic">{{ img.title }}</h3>
              <p class="text-white/60 text-[10px] font-bold uppercase tracking-widest leading-relaxed line-clamp-2">{{ img.description || 'Dokumentasi resmi pesantren.' }}</p>
              
              <div class="pt-4 flex items-center justify-between">
                 <div class="flex gap-2">
                    <div class="size-8 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 text-white">
                       <Maximize2 class="size-4" />
                    </div>
                 </div>
                 <ArrowUpRight class="size-5 text-white/40" />
              </div>
            </div>
          </div>

          <!-- Subtle bottom info for mobile -->
          <div class="absolute bottom-4 left-4 right-4 md:hidden">
             <div class="p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-between">
                <span class="text-[9px] font-black text-foreground uppercase tracking-widest">{{ img.title }}</span>
                <Maximize2 class="size-3 text-primary" />
             </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Social Call to Action -->
    <section class="container mx-auto px-6">
       <div class="max-w-4xl mx-auto p-12 md:p-20 bg-foreground text-background rounded-xl overflow-hidden relative shadow-2xl">
          <div class="absolute -top-12 -right-12 size-64 bg-primary/20 rounded-xl blur-3xl"></div>
          <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
             <div class="space-y-6 text-center lg:text-left">
                <div class="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                   <div class="h-[1px] w-8 bg-primary"></div> Eksplorasi Media
                </div>
                <h2 class="text-3xl md:text-5xl font-black tracking-tighter leading-tight italic">Lihat Lebih Banyak <br> di Media Sosial Kami</h2>
                <p class="text-primary-foreground/60 font-medium text-sm leading-relaxed max-w-md italic">Dapatkan update video kegiatan mingguan, cuplikan kajian, dan dokumentasi real-time setiap harinya.</p>
             </div>
             <div class="flex gap-4">
                <div class="flex flex-col items-center gap-4">
                   <a href="#" class="size-16 bg-white/5 hover:bg-primary border border-white/5 flex items-center justify-center rounded-xl transition-all shadow-lg active:scale-95 group">
                      <Instagram class="size-6 text-white" />
                   </a>
                   <span class="text-[8px] font-black uppercase tracking-widest text-white/40">Instagram</span>
                </div>
                <div class="flex flex-col items-center gap-4">
                   <a href="#" class="size-16 bg-white/5 hover:bg-primary border border-white/5 flex items-center justify-center rounded-xl transition-all shadow-lg active:scale-95 group">
                      <Youtube class="size-6 text-white" />
                   </a>
                   <span class="text-[8px] font-black uppercase tracking-widest text-white/40">YouTube</span>
                </div>
                <div class="flex flex-col items-center gap-4">
                   <a href="#" class="size-16 bg-white/5 hover:bg-primary border border-white/5 flex items-center justify-center rounded-xl transition-all shadow-lg active:scale-95 group">
                      <Facebook class="size-6 text-white" />
                   </a>
                   <span class="text-[8px] font-black uppercase tracking-widest text-white/40">Facebook</span>
                </div>
             </div>
          </div>
       </div>
    </section>

    <!-- Lightbox Implementation Placeholder -->
    <UiDialog v-model:open="showLightbox">
       <UiDialogContent class="max-w-[90vw] max-h-[90vh] p-0 border-0 bg-transparent shadow-none overflow-hidden rounded-xl">
          <div v-if="activeImage" class="relative group">
             <img :src="activeImage.imageUrl" class="w-full h-full object-contain rounded-xl" />
             <div class="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <h3 class="text-white text-2xl font-black italic">{{ activeImage.title }}</h3>
                <p class="text-white/60 text-sm italic mt-2">{{ activeImage.description }}</p>
             </div>
          </div>
       </UiDialogContent>
    </UiDialog>
  </div>
</template>