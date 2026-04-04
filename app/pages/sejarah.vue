<script setup lang="ts">
import { History, Sparkles, Flag, Target, ArrowRight, Quote, ShieldCheck, TrendingUp, School } from 'lucide-vue-next';
definePageMeta({ layout: 'default' });
useHead({ title: 'Sejarah & Visi Misi - PesantrenKu' });
</script>

<template>
  <section class="py-24 lg:py-32 relative z-10 border-b border-border bg-background">
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

    <div class="container mx-auto px-6 max-w-6xl relative z-10">
      <div class="text-center space-y-6 mb-24">
        <div class="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 text-primary px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] backdrop-blur-sm">
          <History class="w-4 h-4" /> Sejak Tahun 1990
        </div>
        <h1 class="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[1]">
          Jejak Langkah <br> <span class="text-primary italic font-serif">Peradaban</span>
        </h1>
        <p class="text-muted-foreground text-lg font-medium max-w-2xl mx-auto leading-relaxed">
          "Membangun masa depan dengan pondasi adab dan tradisi keilmuan yang kokoh secara terstruktur."
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div class="lg:col-span-7 space-y-12">
          <div class="relative pl-12 border-l-2 border-border space-y-16 ml-4">
            
            <div class="relative group">
              <div class="absolute -left-[70px] top-0 flex items-center">
                <div class="w-10 h-10 bg-background border-2 border-border flex items-center justify-center group-hover:border-primary transition-all duration-500 rounded-xl relative z-10 bg-white">
                  <History class="w-5 h-5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                </div>
                <div class="w-8 h-[2px] bg-border group-hover:bg-primary transition-colors"></div>
              </div>

              <div class="space-y-4">
                <div class="flex items-center gap-4">
                  <span class="text-4xl font-black text-muted-foreground/20 tracking-tighter font-serif group-hover:text-primary/30 transition-colors">1990</span>
                  <div class="h-[1px] flex-1 bg-border/50"></div>
                </div>
                <h3 class="text-2xl font-black tracking-tight text-foreground uppercase">Fondasi Awal</h3>
                <p class="text-muted-foreground text-base leading-relaxed font-medium italic font-serif">
                  Berdiri di tengah masyarakat yang haus akan ilmu agama, PesantrenKu bermula dari sebuah majelis taklim kecil yang diinisiasi oleh para ulama setempat.
                </p>
              </div>
            </div>

            <div class="relative group">
              <div class="absolute -left-[70px] top-0 flex items-center">
                <div class="w-10 h-10 bg-background border-2 border-border flex items-center justify-center group-hover:border-primary transition-all duration-500 rounded-xl relative z-10 bg-white">
                  <Sparkles class="w-5 h-5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                </div>
                <div class="w-8 h-[2px] bg-border group-hover:bg-primary transition-colors"></div>
              </div>

              <div class="space-y-4">
                <div class="flex items-center gap-4">
                  <span class="text-4xl font-black text-muted-foreground/20 tracking-tighter font-serif group-hover:text-primary/30 transition-colors">Era Modern</span>
                  <div class="h-[1px] flex-1 bg-border/50"></div>
                </div>
                <h3 class="text-2xl font-black tracking-tight text-foreground uppercase">Transformasi Digital</h3>
                <p class="text-muted-foreground text-base leading-relaxed font-medium italic font-serif">
                  Kini, PesantrenKu bertransformasi menjadi pusat pendidikan Islam rujukan yang mengintegrasikan teknologi canggih tanpa menghilangkan esensi talaqqi.
                </p>
              </div>
            </div>
          </div>

          <div class="absolute -top-6 -right-6 pointer-events-none opacity-[0.03] group-hover:opacity-[0.06] group-hover:text-primary transition-all duration-700">
            <Quote class="w-48 h-48 rotate-12" />
          </div>
          
          <div class="absolute top-0 left-0 w-[4px] h-full bg-primary/20 group-hover:bg-primary transition-colors duration-500"></div>
          
          <div class="relative z-10 space-y-8">
            <p class="text-2xl md:text-3xl font-bold italic leading-tight text-foreground font-serif tracking-tight">
              "Kami tidak hanya mencetak pembaca kitab, kami membentuk pribadi yang menjadi cahaya dan fondasi peradaban."
            </p>
            
            <div class="flex items-center gap-4">
              <div class="w-12 h-[1px] bg-primary"></div>
              <div class="flex flex-col">
                <span class="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">Dewan Pembina Pesantren</span>
                <span class="text-[8px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Lembaga Penjamin Mutu</span>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 space-y-8">
          <UiCard class="p-10 border border-border rounded-xl shadow-2xl shadow-black/10 bg-foreground text-background relative overflow-hidden">
            <div class="absolute top-0 right-0 p-8 opacity-5">
              <Target class="w-48 h-48" />
            </div>
            <div class="absolute bottom-0 right-0 w-32 h-32 border-l border-t border-background/10"></div>
            
            <div class="relative z-10 space-y-10">
              <div class="space-y-4">
                <div class="flex items-center gap-3 text-primary">
                  <Target class="w-6 h-6" />
                  <h2 class="text-2xl font-black tracking-tight text-background uppercase">Visi Utama</h2>
                </div>
                <p class="text-background/80 font-medium leading-relaxed italic font-serif">
                  "Menjadi lembaga pendidikan Islam rujukan global yang mencetak generasi rabbani, progresif, dan berakhlakul karimah."
                </p>
              </div>

              <div class="w-full h-[1px] bg-background/20"></div>

              <div class="space-y-6">
                <div class="flex items-center gap-3 text-primary text-left">
                  <Flag class="w-6 h-6" />
                  <h2 class="text-2xl font-black tracking-tight text-background uppercase">Misi Strategis</h2>
                </div>
                <ul class="space-y-6">
                  <li class="flex items-start gap-4 group">
                    <div class="w-8 h-8 border border-background/20 bg-background/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                      <ShieldCheck class="w-4 h-4 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <p class="text-sm font-medium text-background/70 group-hover:text-background transition-colors">Menanamkan aqidah shahihah dan akhlak salafush shalih dalam setiap sendi kehidupan.</p>
                  </li>
                  <li class="flex items-start gap-4 group">
                    <div class="w-8 h-8 border border-background/20 bg-background/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                      <School class="w-4 h-4 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <p class="text-sm font-medium text-background/70 group-hover:text-background transition-colors">Menyelenggarakan pendidikan klasikal yang memadukan tradisi kitab dan sains modern.</p>
                  </li>
                  <li class="flex items-start gap-4 group">
                    <div class="w-8 h-8 border border-background/20 bg-background/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                      <TrendingUp class="w-4 h-4 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <p class="text-sm font-medium text-background/70 group-hover:text-background transition-colors">Melatih kemandirian, kepemimpinan, dan kecakapan hidup di era global.</p>
                  </li>
                </ul>
              </div>
              <UiButton class="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest text-xs transition-transform active:scale-95">
                Mari Bergabung
              </UiButton>
            </div>
          </UiCard>

          <div class="bg-card p-8 rounded-xl border border-border space-y-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 border border-border bg-background flex items-center justify-center">
                <Sparkles class="w-5 h-5 text-primary" />
              </div>
              <h4 class="font-black tracking-tighter text-xl uppercase">Nilai Dasar</h4>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="val in ['Integritas', 'Adab', 'Disiplin', 'Ukhuwah']" :key="val" class="border border-border bg-background px-4 py-2 font-bold text-[10px] uppercase tracking-[0.2em] hover:border-primary hover:text-primary cursor-default transition-colors">
                {{ val }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>