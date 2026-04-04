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
  <div class="overflow-x-hidden bg-background text-foreground">
    <section class="relative min-h-[90vh] flex items-center py-24 lg:py-32 overflow-hidden border-b border-border/40">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[150px]"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center space-y-8">
          <div class="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 text-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-sm">
            <Sparkles class="w-4 h-4" />
            Penerimaan Santri Baru T.A 2026/2027
          </div>
          
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95]">
            Membangun <span class="text-primary italic font-serif">Adab</span> & <br>
            <span class="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">Intelektual Muda</span>
          </h1>

          <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Membentuk karakter generasi robbani yang cerdas, berwawasan global, dan berpegang teguh pada nilai-nilai Al-Qur'an dan As-Sunnah.
          </p>

          <div class="flex flex-col sm:flex-row gap-5 justify-center pt-8">
            <UiButton as-child class="h-14 px-10 rounded-xl text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] active:scale-95 transition-all">
              <NuxtLink to="/kontak" class="flex items-center gap-2">
                Daftar Sekarang <ArrowRight class="w-5 h-5" />
              </NuxtLink>
            </UiButton>
            <UiButton variant="outline" as-child class="h-14 px-10 rounded-xl text-base font-bold border-2 border-border hover:bg-muted active:scale-95 transition-all">
              <NuxtLink to="/sejarah" class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5" /> Lihat Profil
              </NuxtLink>
            </UiButton>
          </div>
        </div>
      </div>
    </section>

    <section class="relative z-20 -mt-12 container mx-auto px-6">
      <div class="grid grid-cols-2 md:grid-cols-4 bg-card p-2 rounded-xl border border-border shadow-2xl divide-x divide-y md:divide-y-0 divide-border">
        <div class="space-y-3 p-8 text-center group hover:bg-muted/30 transition-colors">
          <div class="w-12 h-12 border border-border bg-background flex items-center justify-center mx-auto group-hover:border-primary group-hover:text-primary transition-colors">
            <TrendingUp class="w-5 h-5" />
          </div>
          <div class="text-4xl md:text-5xl font-black tracking-tighter text-foreground">30+</div>
          <div class="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Tahun Berdiri</div>
        </div>
        <div class="space-y-3 p-8 text-center group hover:bg-muted/30 transition-colors">
           <div class="w-12 h-12 border border-border bg-background flex items-center justify-center mx-auto group-hover:border-primary group-hover:text-primary transition-colors">
            <Users class="w-5 h-5" />
          </div>
          <div class="text-4xl md:text-5xl font-black tracking-tighter text-foreground">1200+</div>
          <div class="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Santri Aktif</div>
        </div>
        <div class="space-y-3 p-8 text-center group hover:bg-muted/30 transition-colors">
           <div class="w-12 h-12 border border-border bg-background flex items-center justify-center mx-auto group-hover:border-primary group-hover:text-primary transition-colors">
            <GraduationCap class="w-5 h-5" />
          </div>
          <div class="text-4xl md:text-5xl font-black tracking-tighter text-foreground">60+</div>
          <div class="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Pengajar Ahli</div>
        </div>
        <div class="space-y-3 p-8 text-center group hover:bg-muted/30 transition-colors">
           <div class="w-12 h-12 border border-border bg-background flex items-center justify-center mx-auto group-hover:border-primary group-hover:text-primary transition-colors">
            <Award class="w-5 h-5" />
          </div>
          <div class="text-4xl md:text-5xl font-black tracking-tighter text-foreground">5000+</div>
          <div class="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Alumni Hebat</div>
        </div>
      </div>
    </section>

    <section class="py-32 relative overflow-hidden">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div class="space-y-4 max-w-2xl">
            <div class="inline-flex items-center gap-3 text-primary font-bold uppercase tracking-[0.3em] text-xs">
               <div class="h-[2px] w-12 bg-primary"></div> Kurikulum Unggulan
            </div>
            <h2 class="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
               Membentuk Pribadi <br> <span class="text-primary italic font-serif">Berwawasan Global</span>
            </h2>
          </div>
          <div>
             <UiButton variant="ghost" as-child class="font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors gap-2 rounded-xl group uppercase tracking-widest text-xs h-12 px-6 border border-transparent hover:border-primary/20">
                <NuxtLink to="/kontak">Lihat Semua Program <ArrowRight class="w-4 h-4" /></NuxtLink>
             </UiButton>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <UiCard 
            v-for="(program, index) in (programs || []).slice(0, 4)" 
            :key="program.id" 
            class="group p-8 border border-border rounded-xl bg-card hover:bg-muted/10 overflow-hidden transition-all duration-500 hover:border-primary hover:shadow-[0_0_30px_-15px_rgba(16,185,129,0.3)] hover:-translate-y-1"
          >
            <div class="w-14 h-14 border border-border bg-background flex items-center justify-center mb-8 transition-colors group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground">
              <component :is="programIcons[index] || BookOpen" class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-black mb-4 tracking-tight text-foreground">{{ program.name }}</h3>
            <p class="text-muted-foreground text-sm font-medium leading-relaxed line-clamp-3">{{ program.description }}</p>
            
            <div class="mt-8 pt-6 border-t border-border/50 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
              Pelajari <ArrowRight class="w-4 h-4" />
            </div>
          </UiCard>
        </div>
      </div>
    </section>

    <section class="py-32 bg-muted/20 border-y border-border">
      <div class="container mx-auto px-6">
        <div class="space-y-4 mb-20 text-center">
          <span class="text-primary font-bold uppercase tracking-[0.3em] text-xs">Testimoni & Kesan</span>
          <h2 class="text-4xl md:text-5xl font-black tracking-tighter">Kata Mereka Tentang Kami</h2>
          <div class="w-16 h-[2px] bg-primary mx-auto mt-6"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="testimonial in (testimonials || []).slice(0, 3)" 
            :key="testimonial.id" 
            class="relative p-10 bg-card rounded-xl border border-border transition-all duration-300 hover:border-primary group hover:shadow-xl"
          >
            <Quote class="absolute top-8 right-8 w-10 h-10 text-border group-hover:text-primary/20 transition-colors duration-500" />
            <p class="text-muted-foreground font-medium italic relative z-10 mb-10 leading-relaxed text-lg">"{{ testimonial.message }}"</p>
            
            <div class="flex items-center gap-4 relative z-10 pt-6 border-t border-border">
              <div class="w-12 h-12 bg-primary flex items-center justify-center text-primary-foreground font-black text-lg">
                {{ testimonial.name?.charAt(0) }}
              </div>
              <div class="flex flex-col">
                <span class="font-bold text-sm tracking-tight capitalize text-foreground">{{ testimonial.name }}</span>
                <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{{ testimonial.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="articles && articles.length > 0" class="py-32">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div class="space-y-4 text-left">
            <span class="text-primary font-bold uppercase tracking-[0.3em] text-xs">Kabar Terbaru</span>
            <h2 class="text-4xl md:text-5xl font-black tracking-tighter leading-none">Wawasan & Inspirasi</h2>
          </div>
          <UiButton variant="outline" as-child class="font-bold text-foreground hover:text-primary hover:border-primary transition-all gap-2 rounded-xl group uppercase tracking-widest text-xs h-12 px-6">
            <NuxtLink to="/artikel">Baca Semua <ArrowRight class="w-4 h-4" /></NuxtLink>
           </UiButton>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NuxtLink 
            v-for="article in (articles || []).slice(0, 3)" 
            :key="article.id" 
            :to="`/artikel/${article.slug}`"
            class="group flex flex-col bg-card border border-border hover:border-primary transition-all duration-500"
          >
            <div class="relative h-64 overflow-hidden border-b border-border">
              <img v-if="article.coverImage" :src="article.coverImage" :alt="article.title" class="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              <div v-else class="w-full h-full bg-muted flex items-center justify-center">
                 <FileText class="w-12 h-12 text-muted-foreground/30" />
              </div>
            </div>
            <div class="p-8 flex flex-col flex-grow">
              <div class="flex items-center justify-between mb-6">
                <span class="text-[10px] font-bold text-primary uppercase tracking-widest border border-primary/20 bg-primary/5 px-2 py-1">Update</span>
                <span class="text-[10px] text-muted-foreground font-bold tracking-widest">{{ new Date(article.publishedAt || article.createdAt).toLocaleDateString('id-ID') }}</span>
              </div>
              <h3 class="text-xl font-black tracking-tight line-clamp-2 leading-snug group-hover:text-primary transition-colors mb-4">{{ article.title }}</h3>
              <p class="text-muted-foreground text-sm font-medium line-clamp-2 leading-relaxed flex-grow">{{ article.excerpt }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-24 container mx-auto px-6 mb-24">
      <div class="relative bg-foreground p-12 md:p-24 overflow-hidden border border-border">
        <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent mix-blend-overlay"></div>
        <div class="absolute -bottom-24 -right-24 w-[500px] h-[500px] border-[40px] border-background/5 rounded-full"></div>
        <div class="absolute top-8 left-8 w-16 h-[2px] bg-primary"></div>

        <div class="relative z-10 max-w-3xl text-left space-y-10">
          <h2 class="text-4xl md:text-6xl font-black text-background tracking-tighter leading-[1]">
            Mulai Perjalanan <br> <span class="text-primary italic font-serif">Spiritual & Akademik</span>
          </h2>
          <p class="text-background/70 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
            Daftarkan putra-putri Anda sekarang untuk mendapatkan pembinaan adab dan ilmu terbaik dalam lingkungan pesantren yang terstruktur.
          </p>
          <div class="flex flex-col sm:flex-row gap-6 pt-4">
            <UiButton as-child class="h-16 px-10 rounded-xl text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground active:scale-95 transition-transform">
              <NuxtLink to="/kontak" class="flex items-center gap-3">
                <Phone class="w-5 h-5" /> Hubungi Kami
              </NuxtLink>
            </UiButton>
            <UiButton variant="outline" as-child class="h-16 px-10 rounded-xl text-base font-bold border-background/20 text-background hover:bg-background hover:text-foreground active:scale-95 transition-all">
              <NuxtLink to="/brosur" class="flex items-center gap-3">
                <FileDown class="w-5 h-5" /> Download Brosur
              </NuxtLink>
            </UiButton>
          </div>
        </div>

        <div class="hidden lg:block absolute right-24 top-1/2 -translate-y-1/2">
           <div class="w-48 h-48 border border-primary/30 flex items-center justify-center relative">
              <div class="absolute inset-2 border border-primary/10"></div>
              <BookOpen class="w-20 h-20 text-primary" />
           </div>
        </div>
      </div>
    </section>
  </div>
</template>