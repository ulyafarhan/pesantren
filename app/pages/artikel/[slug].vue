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
  <div class="min-h-screen bg-background text-foreground pb-32">
    <div class="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

    <header class="relative h-[60vh] md:h-[70vh] flex items-end pb-16 overflow-hidden border-b border-border z-10">
      <div v-if="article.coverImage" class="absolute inset-0 bg-muted">
        <img :src="article.coverImage" :alt="article.title" class="w-full h-full object-cover grayscale opacity-60" />
        <div class="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>
      <div v-else class="absolute inset-0 bg-background"></div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl space-y-8">
          <NuxtLink to="/artikel" class="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px] bg-background border border-border px-4 py-2">
            <ArrowLeft class="w-4 h-4" /> Indeks Artikel
          </NuxtLink>
          <div class="space-y-4">
             <div class="flex items-center gap-4 text-primary text-[10px] uppercase font-black tracking-[0.2em]">
                <span class="bg-primary/10 border border-primary/20 px-3 py-1 text-primary rounded-xl">Dokumen Publikasi</span>
                <span>{{ new Date(article.publishedAt || article.createdAt).toLocaleDateString('id-ID') }}</span>
             </div>
             <h1 class="text-4xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tighter leading-[0.95]">{{ article.title }}</h1>
          </div>
          
          <div class="flex items-center gap-6 pt-4 border-t border-border/50 max-w-lg">
             <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-foreground text-xs font-black">PK</div>
                <div class="flex flex-col">
                   <span class="text-[10px] font-black text-foreground uppercase tracking-widest">Divisi Publikasi Resmi</span>
                   <span class="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Est. 5 Menit Pembacaan</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-6 mt-16 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        <article class="lg:col-span-8 flex flex-col space-y-12">
          <div class="p-10 md:p-16 bg-card border border-border rounded-xl shadow-none">
            <div 
              class="prose prose-lg md:prose-xl prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-foreground/80 prose-p:leading-loose prose-p:font-medium prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-a:text-primary hover:prose-a:underline prose-img:rounded-xl prose-img:border prose-img:border-border prose-img:grayscale hover:prose-img:grayscale-0 prose-img:transition-all prose-img:duration-700 prose-blockquote:border-l-[4px] prose-blockquote:border-primary prose-blockquote:bg-muted/30 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-xl prose-blockquote:not-italic prose-blockquote:text-foreground prose-blockquote:font-serif"
              v-html="article.content"
            ></div>

            <div class="mt-24 pt-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
               <div class="flex items-center gap-4">
                  <span class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Bagikan Tautan</span>
                  <div class="flex gap-2">
                     <UiButton variant="outline" size="icon" class="rounded-xl border-border hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors w-10 h-10"><Facebook class="w-4 h-4" /></UiButton>
                     <UiButton variant="outline" size="icon" class="rounded-xl border-border hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors w-10 h-10"><Twitter class="w-4 h-4" /></UiButton>
                     <UiButton variant="outline" size="icon" class="rounded-xl border-border hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors w-10 h-10"><Share2 class="w-4 h-4" /></UiButton>
                  </div>
               </div>
               <div class="flex gap-2">
                  <span class="border border-border bg-background px-3 py-1.5 font-bold text-[9px] uppercase tracking-[0.2em] cursor-default">Kajian Ilmu</span>
                  <span class="border border-border bg-background px-3 py-1.5 font-bold text-[9px] uppercase tracking-[0.2em] cursor-default">Info Santri</span>
               </div>
            </div>
          </div>

          <div class="p-10 bg-foreground text-background border border-border rounded-xl flex flex-col md:flex-row items-start gap-8 relative overflow-hidden">
             <div class="absolute -right-12 -top-12 w-48 h-48 bg-primary/20 blur-3xl opacity-30"></div>
             
             <div class="w-20 h-20 bg-background border border-background/20 flex items-center justify-center text-foreground font-black text-3xl shrink-0">PK</div>
             <div class="flex-1 space-y-4 relative z-10">
                <h3 class="text-xl font-black tracking-tight text-background">Pusat Redaksi PesantrenKu</h3>
                <p class="text-background/60 text-sm font-medium leading-relaxed font-serif italic max-w-lg">Tim publikasi resmi pesantren yang menyajikan informasi struktural, inspiratif, dan edukatif dengan standar literasi yang tinggi.</p>
                <div class="flex gap-6 pt-2">
                   <NuxtLink class="text-[9px] font-bold uppercase tracking-widest text-primary hover:text-primary-foreground transition-colors">Jaringan Eksternal</NuxtLink>
                   <NuxtLink class="text-[9px] font-bold uppercase tracking-widest text-primary hover:text-primary-foreground transition-colors">Surat Elektronik Redaksi</NuxtLink>
                </div>
             </div>
          </div>
        </article>

        <aside class="lg:col-span-4 space-y-12">
          <div class="p-8 border border-border bg-card rounded-xl space-y-8">
            <div class="flex items-center gap-3 border-b border-border pb-4">
              <Sparkles class="w-5 h-5 text-primary" />
              <h3 class="text-xl font-black tracking-tight">Kajian Terkait</h3>
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
                   <div v-else class="w-full h-full flex items-center justify-center bg-background"><Bookmark class="w-5 h-5 text-muted-foreground/30" /></div>
                </div>
                <div class="space-y-2 flex-1">
                  <h4 class="text-sm font-bold leading-tight group-hover/item:text-primary transition-colors line-clamp-2 text-foreground">{{ recent.title }}</h4>
                  <span class="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{{ new Date(recent.publishedAt || recent.createdAt).toLocaleDateString('id-ID') }}</span>
                </div>
              </NuxtLink>
            </div>
          </div>

          <div class="sticky top-24 p-10 bg-card border border-border rounded-xl overflow-hidden relative shadow-none group">
            <div class="absolute top-6 left-6 w-12 h-[2px] bg-primary"></div>
            
            <div class="relative z-10 space-y-6 pt-6">
              <div class="w-12 h-12 bg-background border border-border flex items-center justify-center">
                <Mail class="w-5 h-5 text-primary" />
              </div>
              <div class="space-y-2 text-left">
                <h3 class="text-2xl font-black tracking-tight text-foreground">Sirkulasi Buletin</h3>
                <p class="text-muted-foreground text-xs font-medium leading-relaxed italic font-serif">Penerimaan publikasi berkala langsung ke kotak masuk surel Anda.</p>
              </div>
              <div class="space-y-3 pt-2">
                <UiInput placeholder="Alamat surel Anda..." class="bg-background border-border text-foreground rounded-xl h-12 text-sm focus:border-primary focus:ring-0 placeholder:text-muted-foreground/50" />
                <UiButton class="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest text-[10px] rounded-xl shadow-none active:scale-95 transition-transform border border-transparent">
                  <Send class="w-4 h-4 mr-2" /> Pendaftaran Distribusi
                </UiButton>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>