<script setup lang="ts">
import { Calendar, User, ArrowLeft, Bookmark, Clock, MessageSquare, Share2, Facebook, Twitter, Instagram, Mail, Sparkles, Send } from 'lucide-vue-next';

const route = useRoute();
const slug = route.params.slug as string;

definePageMeta({ layout: 'default' });

const { data: article } = await useFetch(`/api/articles/${slug}`);
const { data: recentArticles } = await useFetch('/api/articles', { query: { limit: 3, published: 'true' } });

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artikel tidak ditemukan' });
}

useHead({ 
  title: `${article.value.title} - Wawasan PesantrenKu`,
  meta: [
    { name: 'description', content: article.value.excerpt }
  ]
});
</script>

<template>
  <div class="min-h-screen bg-background pb-32">
    <!-- Article Hero Section -->
    <header class="relative h-[60vh] md:h-[70vh] flex items-end pb-16 overflow-hidden">
      <div v-if="article.coverImage" class="absolute inset-0 bg-muted">
        <img :src="article.coverImage" :alt="article.title" class="w-full h-full object-cover transition-transform duration-1000 scale-105" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>
      <div v-else class="absolute inset-0 bg-primary/10"></div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <NuxtLink to="/artikel" class="inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]">
            <ArrowLeft class="size-4" /> Kembali ke Artikel
          </NuxtLink>
          <div class="space-y-4">
             <div class="flex items-center gap-4 text-white/50 text-[10px] uppercase font-black tracking-[0.2em]">
                <span class="bg-primary px-3 py-1 text-primary-foreground rounded-xl border-0">Update Terbaru</span>
                <span>{{ new Date(article.publishedAt || article.createdAt).toLocaleDateString('id-ID') }}</span>
             </div>
             <h1 class="text-4xl md:text-6xl font-black text-white tracking-tighter italic leading-tight">{{ article.title }}</h1>
          </div>
          <div class="flex items-center gap-6">
             <div class="flex items-center gap-3">
                <div class="size-10 rounded-xl bg-white/10 flex items-center justify-center text-white text-xs font-black border border-white/10">PK</div>
                <div class="flex flex-col">
                   <span class="text-xs font-black text-white uppercase tracking-widest">Redaksi PesantrenKu</span>
                   <span class="text-[9px] font-bold text-white/40 uppercase">5 Menit Baca</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="container mx-auto px-6 mt-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <!-- Article Body -->
        <article class="lg:col-span-8 space-y-12">
          <div class="p-10 md:p-16 bg-background rounded-xl border border-border/5 shadow-2xl shadow-black/5 ring-1 ring-border/5">
            <div 
              class="prose prose-xl prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-headings:italic prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:font-medium prose-p:italic prose-h2:text-3xl prose-h2:mb-8 prose-h2:mt-12 prose-a:text-primary hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-2xl prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-xl prose-blockquote:italic"
              v-html="article.content"
            ></div>

            <!-- Interaction Bar -->
            <div class="mt-20 pt-10 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-8">
               <div class="flex items-center gap-4">
                  <span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Bagikan Artikel</span>
                  <div class="flex gap-2">
                     <UiButton variant="ghost" size="icon" class="rounded-xl hover:bg-primary hover:text-white transition-all size-9 border border-border/10"><Facebook class="size-4" /></UiButton>
                     <UiButton variant="ghost" size="icon" class="rounded-xl hover:bg-primary hover:text-white transition-all size-9 border border-border/10"><Twitter class="size-4" /></UiButton>
                     <UiButton variant="ghost" size="icon" class="rounded-xl hover:bg-primary hover:text-white transition-all size-9 border border-border/10"><Share2 class="size-4" /></UiButton>
                  </div>
               </div>
               <div class="flex gap-2">
                  <UiBadge variant="secondary" class="rounded-lg px-4 py-1.5 font-bold text-[9px] uppercase tracking-widest bg-muted border-0">Kajian Ilmu</UiBadge>
                  <UiBadge variant="secondary" class="rounded-lg px-4 py-1.5 font-bold text-[9px] uppercase tracking-widest bg-muted border-0">Info Santri</UiBadge>
               </div>
            </div>
          </div>

          <!-- Author Box -->
          <div class="p-10 bg-muted/30 rounded-xl border border-border/10 flex flex-col md:flex-row items-center gap-8 group">
             <div class="size-24 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-black text-3xl shadow-lg shadow-primary/20 shrink-0">PK</div>
             <div class="flex-1 text-center md:text-left space-y-3">
                <h3 class="text-xl font-black italic tracking-tight">Redaksi Media PesantrenKu</h3>
                <p class="text-muted-foreground text-sm font-medium leading-relaxed italic">Tim publikasi resmi PesantrenKu yang menyajikan informasi aktual, inspiratif, dan edukatif seputar dunia pendidikan Islam.</p>
                <div class="flex justify-center md:justify-start gap-4 pt-2">
                   <NuxtLink class="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Ikuti Kami</NuxtLink>
                   <NuxtLink class="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Kontak Redaksi</NuxtLink>
                </div>
             </div>
          </div>
        </article>

        <!-- Sidebar -->
        <aside class="lg:col-span-4 space-y-12">
          <UiCard class="p-8 border-0 shadow-2xl shadow-black/5 ring-1 ring-border/5 rounded-xl bg-background space-y-8">
            <div class="flex items-center gap-3 text-primary">
              <Sparkles class="size-5" />
              <h3 class="text-lg font-black tracking-tight italic">Baca Juga</h3>
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

          <!-- Newsletter Stick -->
          <div class="sticky top-12 p-10 bg-foreground text-background rounded-xl overflow-hidden relative shadow-2xl">
            <div class="absolute -top-12 -right-12 size-48 bg-primary/20 rounded-xl blur-3xl"></div>
            <div class="relative z-10 space-y-6">
              <div class="size-14 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <Mail class="size-6 text-primary" />
              </div>
              <div class="space-y-2">
                <h3 class="text-2xl font-black tracking-tight italic">E-Buletin Mingguan</h3>
                <p class="text-primary-foreground/60 text-xs font-medium leading-relaxed">Jangan lewatkan update kajian dan kegiatan pesantren setiap jumat pagi.</p>
              </div>
              <div class="space-y-3 pt-4">
                <UiInput placeholder="Alamat email..." class="bg-white/5 border-white/10 text-white rounded-xl h-12 text-sm focus:ring-primary placeholder:text-white/20" />
                <UiButton class="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95">
                  <Send class="size-4 mr-2" /> Langganan
                </UiButton>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>