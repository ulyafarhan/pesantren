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
  <div class="min-h-screen bg-background">
    <!-- Hero / Header Section -->
    <header class="relative py-24 bg-muted/30 border-b border-border/10 overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-5"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-3xl mx-auto text-center space-y-6">
          <div class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] animate-in fade-in slide-in-from-top-4 duration-700">
            <Newspaper class="size-4" /> Kabar Pesantren
          </div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] italic animate-in fade-in slide-in-from-bottom-8 duration-700">
            Wawasan & <span class="text-primary not-italic tracking-tight underline decoration-muted-foreground/10 underline-offset-8">Inspirasi</span>
          </h1>
          <p class="text-muted-foreground font-medium text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed animate-in fade-in duration-1000">
            Jendela informasi seputar kegiatan santri, pemikiran ulama, dan perkembangan pendidikan di PesantrenKu.
          </p>
        </div>

        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto mt-16 relative group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <div class="absolute inset-0 bg-primary/10 blur-2xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="relative flex items-center bg-background rounded-xl border border-border/10 shadow-2xl p-2 ring-1 ring-border/5">
            <Search class="absolute left-6 size-5 text-muted-foreground" />
            <UiInput 
              v-model="searchQuery"
              placeholder="Cari artikel atau berita terbaru..." 
              class="h-14 pl-14 border-0 focus-visible:ring-0 text-base font-medium rounded-xl flex-1 bg-transparent"
            />
          </div>
        </div>
      </div>
    </header>

    <main class="py-24 container mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <!-- Main Article Feed -->
        <div class="lg:col-span-8 space-y-12">
          <div v-if="filteredArticles.length === 0" class="text-center py-32 space-y-4">
             <div class="size-20 bg-muted rounded-xl flex items-center justify-center mx-auto opacity-20">
                <Search class="size-10" />
             </div>
             <h3 class="text-2xl font-black italic">Artikel tidak ditemukan</h3>
             <p class="text-muted-foreground font-medium">Coba gunakan kata kunci lain untuk pencarian Anda.</p>
          </div>

          <div v-else class="grid grid-cols-1 gap-12">
            <NuxtLink 
              v-for="article in filteredArticles" 
              :key="article.id" 
              :to="`/artikel/${article.slug}`"
              class="group flex flex-col md:flex-row gap-8 bg-background border border-border/5 rounded-xl p-6 transition-all duration-300 hover:border-primary/50"
            >
              <div class="md:w-72 h-64 shrink-0 rounded-xl overflow-hidden relative bg-muted">
                <img v-if="article.coverImage" :src="article.coverImage" :alt="article.title" class="w-full h-full object-cover transition-transform duration-700" />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <Bookmark class="size-12 text-muted-foreground/20" />
                </div>
                <div class="absolute top-4 left-4">
                  <UiBadge class="bg-primary/90 text-primary-foreground font-black text-[9px] uppercase tracking-widest rounded-xl border-0 shadow-lg">New Update</UiBadge>
                </div>
              </div>
              <div class="flex flex-col justify-between py-2">
                <div class="space-y-4">
                  <div class="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                    <span class="flex items-center gap-1.5"><Calendar class="size-3.5 text-primary" /> {{ new Date(article.publishedAt || article.createdAt).toLocaleDateString('id-ID') }}</span>
                    <span class="w-1 h-1 bg-border rounded-xl"></span>
                    <span class="flex items-center gap-1.5"><Clock class="size-3.5" /> 5 Menit Baca</span>
                  </div>
                  <h2 class="text-2xl md:text-3xl font-black tracking-tighter leading-tight group-hover:text-primary transition-colors text-foreground">{{ article.title }}</h2>
                  <p class="text-muted-foreground text-sm font-medium line-clamp-3 leading-relaxed italic">{{ article.excerpt }}</p>
                </div>
                <div class="pt-6 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="size-8 rounded-xl bg-muted flex items-center justify-center text-[10px] font-black text-primary border border-border/10">PK</div>
                    <span class="text-[10px] font-black uppercase tracking-widest text-foreground">Redaksi PesantrenKu</span>
                  </div>
                  <UiButton variant="ghost" class="rounded-xl group-hover:text-primary transition-colors p-0 font-black text-[10px] uppercase tracking-[0.2em] gap-2">
                     Baca Selengkapnya <ArrowRight class="size-3" />
                  </UiButton>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="lg:col-span-4 space-y-12">
          <!-- Recent Posts Card -->
          <UiCard class="p-8 border-0 shadow-2xl shadow-black/5 ring-1 ring-border/5 rounded-xl bg-background space-y-8">
            <div class="flex items-center gap-3 text-primary">
              <Sparkles class="size-5" />
              <h3 class="text-lg font-black tracking-tight italic">Artikel Populer</h3>
            </div>
            <div class="space-y-8">
              <NuxtLink 
                v-for="recent in recentArticles" 
                :key="recent.id" 
                :to="`/artikel/${recent.slug}`"
                class="flex gap-4 group/item"
              >
                <div class="size-20 shrink-0 rounded-xl overflow-hidden bg-muted">
                   <img v-if="recent.coverImage" :src="recent.coverImage" class="w-full h-full object-cover transition-transform" />
                </div>
                <div class="space-y-1">
                  <h4 class="text-sm font-bold leading-tight group-hover/item:text-primary transition-colors line-clamp-2 text-foreground">{{ recent.title }}</h4>
                  <span class="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{{ new Date(recent.publishedAt).toLocaleDateString('id-ID') }}</span>
                </div>
              </NuxtLink>
            </div>
          </UiCard>

          <!-- Newsletter Card -->
          <div class="p-10 bg-foreground text-background rounded-xl overflow-hidden relative shadow-2xl">
            <div class="absolute -top-12 -right-12 size-48 bg-primary/20 rounded-xl blur-3xl"></div>
            <div class="relative z-10 space-y-6">
              <div class="size-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <Mail class="size-6 text-primary" />
              </div>
              <div class="space-y-2">
                <h3 class="text-2xl font-black tracking-tight italic">Berlangganan Wawasan</h3>
                <p class="text-primary-foreground/60 text-xs font-medium leading-relaxed">Dapatkan update langsung ke email Anda tentang kegiatan dan prestasi pesantren.</p>
              </div>
              <div class="space-y-3 pt-4">
                <UiInput placeholder="Alamat email Anda..." class="bg-white/5 border-white/10 text-white rounded-xl h-12 text-sm focus:ring-primary placeholder:text-white/20" />
                <UiButton class="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95">
                  <Send class="size-4 mr-2" /> Sign Up Sekarang
                </UiButton>
              </div>
            </div>
          </div>
          
          <!-- Category Listing Cloud (Placeholder) -->
          <div class="p-8 border border-border/10 rounded-xl space-y-6">
             <h3 class="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">Topik Populer</h3>
             <div class="flex flex-wrap gap-2">
                <UiBadge variant="secondary" class="rounded-lg px-3 py-1 font-bold text-[9px] uppercase tracking-widest bg-muted border-0">Kajian Fiqih</UiBadge>
                <UiBadge variant="secondary" class="rounded-lg px-3 py-1 font-bold text-[9px] uppercase tracking-widest bg-muted border-0">Tahfidz</UiBadge>
                <UiBadge variant="secondary" class="rounded-lg px-3 py-1 font-bold text-[9px] uppercase tracking-widest bg-muted border-0">Sains & Islam</UiBadge>
                <UiBadge variant="secondary" class="rounded-lg px-3 py-1 font-bold text-[9px] uppercase tracking-widest bg-muted border-0">Adab Santri</UiBadge>
             </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>