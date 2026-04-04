<script setup lang="ts">
import { Search, Calendar, User, ArrowRight, Newspaper, Bookmark, Clock, MessageCircle, ChevronRight, Sparkles, Mail, Send } from 'lucide-vue-next';

definePageMeta({ layout: 'default' });
useHead({ title: 'Wawasan & Artikel - PesantrenKu' });

const { data: articles } = await useFetch('/api/articles', { query: { published: 'true' } });
const { data: recentArticles } = await useFetch('/api/articles', { query: { published: 'true', limit: 3 } });

const searchQuery = ref('');
const filteredArticles = computed(() => {
  if (!articles.value) return [];
  if (!searchQuery.value) return articles.value;
  return articles.value.filter(a => 
    a.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
    a.excerpt?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="min-h-screen bg-background text-foreground pb-32">
    <div class="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

    <header class="relative py-24 bg-background/80 backdrop-blur-sm border-b border-border z-10 text-center">
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-3xl mx-auto space-y-6">
          <div class="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 text-primary px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.3em]">
            <Newspaper class="w-4 h-4" /> Kabar Pesantren
          </div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95]">
            Wawasan & <span class="text-primary italic font-serif">Inspirasi</span>
          </h1>
          <p class="text-muted-foreground font-medium text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Jendela informasi terstruktur seputar kegiatan santri, pemikiran ulama, dan perkembangan pendidikan terpadu di PesantrenKu.
          </p>
        </div>

        <div class="max-w-2xl mx-auto mt-16 relative">
          <div class="flex items-center bg-background border border-border shadow-none ring-1 ring-border group hover:border-primary/50 transition-colors duration-300">
            <div class="w-14 h-14 bg-muted flex items-center justify-center border-r border-border shrink-0">
               <Search class="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <UiInput 
              v-model="searchQuery"
              placeholder="Cari arsip artikel atau berita terbaru..." 
              class="h-14 border-0 focus-visible:ring-0 text-base font-medium rounded-xl flex-1 bg-transparent px-4"
            />
          </div>
          <div class="absolute -bottom-6 left-0 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
             Filter Basis Data Berita
          </div>
        </div>
      </div>
    </header>

    <main class="py-24 container mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div class="lg:col-span-8 space-y-10">
          <div v-if="filteredArticles.length === 0" class="text-center py-32 space-y-6 border border-border bg-card">
             <div class="w-20 h-20 border border-border flex items-center justify-center mx-auto bg-background">
                <Search class="w-10 h-10 text-muted-foreground/40" />
             </div>
             <h3 class="text-2xl font-black tracking-tighter">Arsip Tidak Ditemukan</h3>
             <p class="text-muted-foreground font-medium max-w-md mx-auto">Sistem tidak menemukan artikel yang cocok dengan parameter pencarian Anda. Coba gunakan kata kunci lain.</p>
          </div>

          <div v-else class="space-y-10">
            <NuxtLink 
              v-for="article in filteredArticles" 
              :key="article.id" 
              :to="`/artikel/${article.slug}`"
              class="group flex flex-col md:flex-row gap-8 bg-card border border-border rounded-xl p-6 transition-all duration-500 hover:border-primary hover:shadow-[0_0_30px_-15px_rgba(16,185,129,0.3)] hover:-translate-y-1 relative overflow-hidden"
            >
              <div class="absolute top-0 right-0 w-12 h-12 border-t border-r border-primary/0 group-hover:border-primary/50 transition-colors duration-500"></div>

              <div class="md:w-64 h-56 shrink-0 overflow-hidden relative bg-muted border border-border group-hover:border-primary transition-colors duration-500">
                <img v-if="article.coverImage" :src="article.coverImage" :alt="article.title" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div v-else class="w-full h-full flex items-center justify-center bg-background">
                  <Bookmark class="w-10 h-10 text-muted-foreground/20" />
                </div>
                <div class="absolute top-0 left-0">
                  <span class="bg-primary text-primary-foreground font-bold text-[9px] uppercase tracking-widest px-3 py-1 block border border-primary">Publikasi</span>
                </div>
              </div>
              
              <div class="flex flex-col justify-between py-1 w-full relative z-10">
                <div class="space-y-4">
                  <div class="flex items-center gap-3 text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em] leading-none">
                    <span class="flex items-center gap-1.5"><Calendar class="w-3.5 h-3.5 text-primary" /> {{ new Date(article.publishedAt || article.createdAt).toLocaleDateString('id-ID') }}</span>
                    <span class="w-4 h-[1px] bg-border"></span>
                    <span class="flex items-center gap-1.5"><Clock class="w-3.5 h-3.5" /> Est. 5 Menit Baca</span>
                  </div>
                  <h2 class="text-2xl md:text-3xl font-black tracking-tight leading-tight group-hover:text-primary transition-colors text-foreground">{{ article.title }}</h2>
                  <p class="text-muted-foreground text-sm font-medium line-clamp-2 leading-relaxed italic font-serif">{{ article.excerpt }}</p>
                </div>
                
                <div class="pt-6 mt-4 border-t border-border/50 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-background flex items-center justify-center text-[10px] font-black text-primary border border-border group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">PK</div>
                    <div class="flex flex-col">
                       <span class="text-[10px] font-bold text-foreground capitalize tracking-widest leading-none">Redaksi PesantrenKu</span>
                       <span class="text-[8px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Divisi Publikasi</span>
                    </div>
                  </div>
                  <div class="font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                     Baca Detail <ArrowRight class="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <aside class="lg:col-span-4 space-y-10">
          <div class="p-8 border border-border bg-card rounded-xl space-y-8 relative overflow-hidden group">
            <div class="flex items-center gap-3 border-b border-border pb-4">
              <Sparkles class="w-5 h-5 text-primary" />
              <h3 class="text-xl font-black tracking-tight">Arsip Terpopuler</h3>
            </div>
            
            <div class="space-y-6">
              <NuxtLink 
                v-for="recent in recentArticles" 
                :key="recent.id" 
                :to="`/artikel/${recent.slug}`"
                class="flex gap-4 group/item items-start"
              >
                <div class="w-16 h-16 shrink-0 overflow-hidden bg-muted border border-border group-hover/item:border-primary transition-colors">
                   <img v-if="recent.coverImage" :src="recent.coverImage" class="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-500" />
                   <div v-else class="w-full h-full flex items-center justify-center bg-background"><Newspaper class="w-6 h-6 text-muted-foreground/30" /></div>
                </div>
                <div class="space-y-2 flex-1">
                  <h4 class="text-sm font-bold leading-tight group-hover/item:text-primary transition-colors line-clamp-2 text-foreground">{{ recent.title }}</h4>
                  <div class="flex items-center gap-2 text-[8px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                     <Calendar class="w-3 h-3" />
                     {{ new Date(recent.publishedAt || recent.createdAt).toLocaleDateString('id-ID') }}
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>

          <div class="p-10 bg-foreground text-background border border-border rounded-xl overflow-hidden relative shadow-none group">
            <div class="absolute -bottom-12 -right-12 w-48 h-48 bg-primary/20 blur-3xl opacity-30"></div>
            <div class="absolute top-6 left-6 w-12 h-[2px] bg-primary"></div>
            
            <div class="relative z-10 space-y-6 pt-6">
              <div class="space-y-2 text-left">
                <h3 class="text-2xl font-black tracking-tight">Berlangganan Wawasan</h3>
                <p class="text-background/60 text-xs font-medium leading-relaxed italic font-serif">Dapatkan update langsung ke surel Anda tentang jurnal akademik dan prestasi pesantren.</p>
              </div>
              <div class="space-y-3 pt-2">
                <UiInput placeholder="Alamat surel..." class="bg-background/5 border-background/20 text-background rounded-xl h-12 text-sm focus:ring-primary placeholder:text-background/40" />
                <UiButton class="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest text-[10px] rounded-xl shadow-none active:scale-95 transition-transform border border-transparent">
                  <Send class="w-4 h-4 mr-2" /> Pendaftaran Eksternal
                </UiButton>
              </div>
            </div>
          </div>
          
          <div class="p-8 border border-border bg-card rounded-xl space-y-6">
             <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-3">
                <div class="w-4 h-[1px] bg-border"></div> Klasifikasi Topik
             </h3>
             <div class="flex flex-wrap gap-2">
                <span class="border border-border bg-background px-3 py-1.5 font-bold text-[9px] uppercase tracking-[0.2em] hover:border-primary hover:text-primary cursor-default transition-colors">Kajian Fiqih</span>
                <span class="border border-border bg-background px-3 py-1.5 font-bold text-[9px] uppercase tracking-[0.2em] hover:border-primary hover:text-primary cursor-default transition-colors">Tahfidz</span>
                <span class="border border-border bg-background px-3 py-1.5 font-bold text-[9px] uppercase tracking-[0.2em] hover:border-primary hover:text-primary cursor-default transition-colors">Sains & Islam</span>
                <span class="border border-border bg-background px-3 py-1.5 font-bold text-[9px] uppercase tracking-[0.2em] hover:border-primary hover:text-primary cursor-default transition-colors">Adab Santri</span>
             </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>