<script setup lang="ts">
import { 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Globe, 
  Building, 
  Lightbulb, 
  Star, 
  Quote, 
  ArrowRight, 
  FileDown, 
  Phone, 
  PlayCircle,
  FileText,
  CheckCircle2,
  TrendingUp,
  Users,
  Award
} from 'lucide-vue-next'

definePageMeta({ layout: 'default' })
useHead({ title: 'PesantrenKu - Pusat Pendidikan Islami Modern & Beradab' })

const { data: programs } = await useFetch('/api/class-programs')
const { data: testimonials } = await useFetch('/api/testimonials', { query: { active: 'true' } })
const { data: articles } = await useFetch('/api/articles', { query: { published: 'true' } })

const programIcons = [
  BookOpen,
  GraduationCap, 
  Globe,
  Building,
  Lightbulb,
  Star,
]
</script>

<template>
  <div class="overflow-x-hidden">
    <!-- HERO SECTION -->
    <section class="relative min-h-[90vh] flex items-center bg-background py-24 lg:py-32 overflow-hidden">
      <!-- High-end decorative background -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-xl blur-[120px]"></div>
        <div class="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-xl blur-[150px]"></div>
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center space-y-8">
          <div class="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles class="size-4" />
            Penerimaan Santri Baru T.A 2026/2027
          </div>
          
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tight leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            Membangun <span class="text-primary italic">Adab</span> & <br>
            <span class="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">Intelektual Muda</span>
          </h1>

          <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Membentuk karakter generasi robbani yang cerdas, berwawasan global, dan berpegang teguh pada nilai-nilai Al-Qur'an dan As-Sunnah.
          </p>

          <div class="flex flex-col sm:flex-row gap-5 justify-center pt-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <UiButton as-child class="h-14 px-10 rounded-xl text-base font-black bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/30 active:scale-95 group transition-all">
              <NuxtLink to="/kontak" class="flex items-center gap-2">
                Daftar Sekarang <ArrowRight class="size-5" />
              </NuxtLink>
            </UiButton>
            <UiButton variant="outline" as-child class="h-14 px-10 rounded-xl text-base font-black border-2 border-border/40 hover:bg-muted/50 active:scale-95 transition-all">
              <NuxtLink to="/sejarah" class="flex items-center gap-2">
                <PlayCircle class="size-5" /> Lihat Profil
              </NuxtLink>
            </UiButton>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS AREA -->
    <section class="relative z-20 -mt-16 container mx-auto px-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-background/80 backdrop-blur-2xl p-4 md:p-10 rounded-xl border border-border/20 shadow-2xl shadow-black/5 ring-1 ring-border/5 text-center">
        <div class="space-y-2 p-4 md:p-0">
          <div class="size-12 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <TrendingUp class="size-6" />
          </div>
          <div class="text-3xl md:text-5xl font-black tracking-tighter text-foreground decoration-primary decoration-4 underline-offset-8">30+</div>
          <div class="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Tahun Berdiri</div>
        </div>
        <div class="space-y-2 p-4 md:p-0">
           <div class="size-12 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Users class="size-6" />
          </div>
          <div class="text-3xl md:text-5xl font-black tracking-tighter text-foreground decoration-primary decoration-4 underline-offset-8">1200+</div>
          <div class="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Santri Aktif</div>
        </div>
        <div class="space-y-2 p-4 md:p-0">
           <div class="size-12 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <GraduationCap class="size-6" />
          </div>
          <div class="text-3xl md:text-5xl font-black tracking-tighter text-foreground decoration-primary decoration-4 underline-offset-8">60+</div>
          <div class="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Pengajar Ahli</div>
        </div>
        <div class="space-y-2 p-4 md:p-0">
           <div class="size-12 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Award class="size-6" />
          </div>
          <div class="text-3xl md:text-5xl font-black tracking-tighter text-foreground decoration-primary decoration-4 underline-offset-8">5000+</div>
          <div class="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Alumni Hebat</div>
        </div>
      </div>
    </section>

    <!-- PROGRAMS SECTION -->
    <section class="py-32 bg-background relative overflow-hidden text-center md:text-left">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div class="space-y-4 max-w-2xl">
            <div class="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
               <div class="h-[1px] w-8 bg-primary"></div> Kurikulum Unggulan
            </div>
            <h2 class="text-4xl md:text-5xl font-black tracking-tight leading-none italic">
               Membentuk Pribadi <br> <span class="text-primary not-italic tracking-tighter underline decoration-muted-foreground/20 underline-offset-8">Berwawasan Global</span>
            </h2>
          </div>
          <div class="pb-2">
             <UiButton variant="ghost" as-child class="font-bold text-muted-foreground hover:text-primary transition-colors gap-2 rounded-xl group uppercase tracking-widest text-[11px]">
                <NuxtLink to="/kontak">Lihat Semua Program <ArrowRight class="size-4" /></NuxtLink>
             </UiButton>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <UiCard 
            v-for="(program, index) in (programs || []).slice(0, 4)" 
            :key="program.id" 
            class="group p-8 border-0 shadow-sm ring-1 ring-border/5 rounded-xl bg-secondary/5 overflow-hidden transition-all duration-300 hover:border-primary/50"
          >
            <div class="size-16 bg-background rounded-xl flex items-center justify-center mb-8 shadow-sm transition-colors group-hover:bg-primary group-hover:text-primary-foreground ring-1 ring-border/5">
              <component :is="programIcons[index] || BookOpen" class="size-8" />
            </div>
            <h3 class="text-xl font-black mb-4 group-hover:text-primary transition-colors tracking-tight">{{ program.name }}</h3>
            <p class="text-muted-foreground text-sm font-medium leading-relaxed line-clamp-3 italic">{{ program.description }}</p>
          </UiCard>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS SECTION -->
    <section class="py-32 bg-muted/30 relative text-center">
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-5"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="space-y-4 mb-20 text-center">
          <span class="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Testimoni & Kesan</span>
          <h2 class="text-4xl md:text-5xl font-black tracking-tighter italic">Kata Mereka Tentang Kami</h2>
          <div class="w-20 h-1.5 bg-primary/20 rounded-xl mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div 
            v-for="testimonial in (testimonials || []).slice(0, 3)" 
            :key="testimonial.id" 
            class="relative p-10 bg-background rounded-xl border border-border/10 shadow-sm transition-all duration-300 hover:border-primary/50 group"
          >
            <Quote class="absolute top-8 right-8 size-12 text-primary/5 group-hover:text-primary/10 transition-colors duration-500" />
            <p class="text-muted-foreground font-medium italic relative z-10 mb-10 leading-relaxed group-hover:text-foreground transition-colors duration-500">"{{ testimonial.message }}"</p>
            
            <div class="flex items-center gap-4 relative z-10 justify-center md:justify-start">
              <div class="size-14 bg-gradient-to-br from-primary to-emerald-500 rounded-xl flex items-center justify-center text-primary-foreground font-black text-xl shadow-lg shadow-primary/20">
                {{ testimonial.name?.charAt(0) }}
              </div>
              <div class="flex flex-col text-left">
                <span class="font-black text-sm tracking-tight capitalize text-foreground">{{ testimonial.name }}</span>
                <span class="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">{{ testimonial.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BLOG SECTION -->
    <section v-if="articles && articles.length > 0" class="py-32 bg-background flex flex-col items-center">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div class="space-y-4 text-left">
            <span class="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Kabar Terbaru</span>
            <h2 class="text-4xl md:text-5xl font-black tracking-tight leading-none italic">Wawasan & Inspirasi</h2>
          </div>
          <UiButton variant="ghost" as-child class="font-black text-muted-foreground hover:text-primary transition-all gap-2 rounded-xl group uppercase tracking-widest text-[11px] h-12 px-6 bg-muted/30">
            <NuxtLink to="/artikel">Baca Selengkapnya <ArrowRight class="size-4" /></NuxtLink>
           </UiButton>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <NuxtLink 
            v-for="article in (articles || []).slice(0, 3)" 
            :key="article.id" 
            :to="`/artikel/${article.slug}`"
            class="group relative overflow-hidden rounded-xl bg-background shadow-sm hover:border-primary/50 transition-all duration-300 border border-transparent"
          >
            <div class="relative h-64 overflow-hidden rounded-xl m-2">
              <img v-if="article.coverImage" :src="article.coverImage" :alt="article.title" class="w-full h-full object-cover transition-transform duration-700" />
              <div v-else class="w-full h-full bg-muted flex items-center justify-center">
                 <FileText class="size-16 text-muted-foreground/20" />
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                 Baca Artikel <ArrowRight class="size-3" />
              </div>
            </div>
            <div class="p-8 pt-4">
              <div class="flex items-center justify-between mb-4">
                <span class="text-[10px] font-black text-primary uppercase tracking-widest leading-none bg-primary/5 px-2 py-1 rounded">Update</span>
                <span class="text-[10px] text-muted-foreground font-bold tracking-widest">{{ new Date(article.publishedAt || article.createdAt).toLocaleDateString('id-ID') }}</span>
              </div>
              <h3 class="text-xl font-black tracking-tighter line-clamp-2 leading-tight group-hover:text-primary transition-colors text-foreground">{{ article.title }}</h3>
              <p class="text-muted-foreground text-sm font-medium mt-4 line-clamp-2 leading-relaxed italic">{{ article.excerpt }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CALL TO ACTION -->
    <section class="py-32 container mx-auto px-6">
      <div class="relative bg-foreground rounded-xl p-12 md:p-24 overflow-hidden shadow-2xl">
        <!-- Abstract patterns -->
        <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent"></div>
        <div class="absolute -bottom-24 -right-24 size-[500px] border border-white/5 rounded-xl"></div>

        <div class="relative z-10 max-w-3xl text-center md:text-left space-y-10">
          <h2 class="text-4xl md:text-6xl font-black text-white tracking-tight leading-[0.9]">
            Mulai Perjalanan <br> <span class="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent italic">Spiritual & Akademik</span>
          </h2>
          <p class="text-primary-foreground/70 text-lg md:text-xl font-medium leading-relaxed">
            Daftarkan putra-putri Anda sekarang untuk mendapatkan pembinaan adab dan ilmu terbaik dalam lingkungan pesantren yang asri dan modern.
          </p>
          <div class="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
            <UiButton as-child class="h-16 px-12 rounded-xl text-base font-black bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/20 transition-all active:scale-95">
              <NuxtLink to="/kontak" class="flex items-center gap-3">
                <Phone class="size-5" /> Hubungi Kami
              </NuxtLink>
            </UiButton>
            <UiButton variant="outline" as-child class="h-16 px-12 rounded-xl text-base font-black border-white/10 text-white hover:bg-white/5 transition-all active:scale-95">
              <NuxtLink to="/brosur" class="flex items-center gap-3">
                <FileDown class="size-5" /> Download Brosur
              </NuxtLink>
            </UiButton>
          </div>
        </div>

        <!-- Float elements -->
        <div class="hidden lg:block absolute right-24 top-1/2 -translate-y-1/2 opacity-50">
           <div class="size-48 bg-primary/20 rounded-xl backdrop-blur-3xl p-8 transform rotate-12 border border-white/10 flex items-center justify-center">
              <BookOpen class="size-20 text-primary" />
           </div>
        </div>
      </div>
    </section>
  </div>
</template>