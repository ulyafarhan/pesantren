<script setup lang="ts">
import { History, Sparkles, Flag, Target, ArrowRight, Quote, ShieldCheck, TrendingUp, School } from 'lucide-vue-next';
definePageMeta({ layout: 'default' });
useHead({ title: 'Sejarah & Visi Misi - PesantrenKu' });
</script>

<template>
  <div class="relative overflow-hidden bg-background">
    <!-- Decorative background elements -->
    <div class="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-xl blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-1/4 h-1/4 bg-emerald-500/5 rounded-xl blur-[100px] pointer-events-none"></div>

    <section class="py-24 lg:py-32 relative z-10">
      <div class="container mx-auto px-6 max-w-5xl">
        <!-- Header -->
        <div class="text-center space-y-4 mb-24 animate-in fade-in slide-in-from-top-8 duration-700">
          <div class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.3em]">
            <History class="size-3.5" /> Sejak Tahun 1990
          </div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter text-foreground italic">
            Jejak Langkah <span class="text-primary not-italic tracking-tight underline decoration-muted-foreground/10 underline-offset-8">Peradaban</span>
          </h1>
          <p class="text-muted-foreground text-lg font-medium max-w-2xl mx-auto italic">
            "Membangun masa depan dengan pondasi adab dan tradisi keilmuan yang kokoh."
          </p>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <!-- Left Column (Timeline/Prose) -->
          <div class="lg:col-span-7 space-y-12 animate-in fade-in slide-in-from-left-8 duration-700 delay-200">
            <div class="relative pl-8 border-l-2 border-primary/20 space-y-16">
              <!-- Item 1 -->
              <div class="relative">
                <div class="absolute -left-[35px] top-0 size-4 rounded-full bg-primary ring-8 ring-background"></div>
                <div class="space-y-4">
                  <span class="text-3xl font-black text-primary/40 tracking-tighter italic">1990</span>
                  <h3 class="text-2xl font-black tracking-tight text-foreground">Awal Perjuangan</h3>
                  <p class="text-muted-foreground text-base leading-relaxed font-medium">
                    Berdiri di tengah masyarakat yang haus akan ilmu agama, PesantrenKu bermula dari sebuah majelis taklim kecil yang diinisiasi oleh para ulama setempat dengan visi membangun peradaban Islam yang moderat dan inklusif.
                  </p>
                </div>
              </div>
              <!-- Item 2 -->
              <div class="relative">
                <div class="absolute -left-[35px] top-0 size-4 rounded-full bg-primary ring-8 ring-background"></div>
                <div class="space-y-4">
                  <span class="text-3xl font-black text-primary/40 tracking-tighter italic">1995</span>
                  <h3 class="text-2xl font-black tracking-tight text-foreground">Ekspansi Fasilitas</h3>
                  <p class="text-muted-foreground text-base leading-relaxed font-medium">
                    Seiring meningkatnya kepercayaan masyarakat, asrama pertama dibangun untuk menampung santri dari luar daerah. Kurikulum mulai diformalkan dengan memadukan kitab kuning klasik dan literasi dasar pengetahuan umum.
                  </p>
                </div>
              </div>
              <!-- Item 3 -->
              <div class="relative">
                <div class="absolute -left-[35px] top-0 size-4 rounded-full bg-primary ring-8 ring-background"></div>
                <div class="space-y-4">
                  <span class="text-3xl font-black text-primary/40 tracking-tighter italic">Era Modern</span>
                  <h3 class="text-2xl font-black tracking-tight text-foreground">Transformasi Digital</h3>
                  <p class="text-muted-foreground text-base leading-relaxed font-medium">
                    Kini, PesantrenKu bertransformasi menjadi pusat pendidikan Islam rujukan yang mengintegrasikan teknologi canggih tanpa menghilangkan esensi talaqqi (belajar tatap muka) yang menjadi ruh pendidikan pesantren.
                  </p>
                </div>
              </div>
            </div>

            <div class="p-10 bg-muted/30 rounded-xl border border-border/10 relative overflow-hidden group">
              <Quote class="absolute -top-4 -right-4 size-32 text-primary/5 group-hover:text-primary/10 transition-colors" />
              <p class="relative z-10 text-xl font-bold italic leading-relaxed text-foreground">
                "Kami tidak hanya mencetak pembaca kitab, kami membentuk pribadi yang menjadi cahaya di tengah umat."
              </p>
              <div class="mt-6 flex items-center gap-3">
                <div class="w-10 h-[1px] bg-primary"></div>
                <span class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Dewan Pembina PesantrenKu</span>
              </div>
            </div>
          </div>

          <!-- Right Column (Visi Misi) -->
          <div class="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-400">
            <UiCard class="p-10 border-0 shadow-2xl shadow-primary/5 ring-1 ring-border/10 bg-foreground text-background rounded-xl overflow-hidden relative">
              <div class="absolute top-0 right-0 p-8 opacity-10">
                <Target class="size-32" />
              </div>
              <div class="relative z-10 space-y-8">
                <div class="space-y-4">
                  <div class="flex items-center gap-3 text-primary">
                    <Target class="size-6" />
                    <h2 class="text-2xl font-black tracking-tight">Visi Utama</h2>
                  </div>
                  <p class="text-primary-foreground/70 font-medium leading-relaxed italic">
                    "Menjadi lembaga pendidikan Islam rujukan global yang mencetak generasi rabbani, progresif, dan berakhlakul karimah."
                  </p>
                </div>

                <UiSeparator class="bg-white/10" />

                <div class="space-y-6">
                  <div class="flex items-center gap-3 text-primary text-left">
                    <Flag class="size-6" />
                    <h2 class="text-2xl font-black tracking-tight">Misi Strategis</h2>
                  </div>
                  <ul class="space-y-6">
                    <li class="flex items-start gap-4 group">
                      <div class="size-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-500">
                        <ShieldCheck class="size-4 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <p class="text-sm font-medium text-primary-foreground/60 group-hover:text-white transition-colors">Menanamkan aqidah shahihah dan akhlak salafush shalih dalam setiap sendi kehidupan.</p>
                    </li>
                    <li class="flex items-start gap-4 group">
                      <div class="size-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-500">
                        <School class="size-4 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <p class="text-sm font-medium text-primary-foreground/60 group-hover:text-white transition-colors">Menyelenggarakan pendidikan klasikal yang memadukan tradisi kitab dan sains modern.</p>
                    </li>
                    <li class="flex items-start gap-4 group">
                      <div class="size-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-500">
                        <TrendingUp class="size-4 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <p class="text-sm font-medium text-primary-foreground/60 group-hover:text-white transition-colors">Melatih kemandirian, kepemimpinan, dan kecakapan hidup di era global.</p>
                    </li>
                  </ul>
                </div>
                <UiButton class="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black shadow-xl shadow-primary/20 transition-all active:scale-95">
                  Mari Bergabung Bersama Kami
                </UiButton>
              </div>
            </UiCard>

            <div class="bg-muted p-8 rounded-xl border border-border/10 space-y-4">
              <div class="flex items-center gap-3">
                <div class="size-10 bg-background rounded-xl flex items-center justify-center shadow-sm">
                  <Sparkles class="size-5 text-primary" />
                </div>
                <h4 class="font-bold tracking-tight">Nilai Dasar Kami</h4>
              </div>
              <div class="flex flex-wrap gap-2">
                <UiBadge variant="secondary" class="rounded-lg px-3 py-1 font-bold text-[10px] uppercase tracking-widest bg-background border-border/10">Integritas</UiBadge>
                <UiBadge variant="secondary" class="rounded-lg px-3 py-1 font-bold text-[10px] uppercase tracking-widest bg-background border-border/10">Adab</UiBadge>
                <UiBadge variant="secondary" class="rounded-lg px-3 py-1 font-bold text-[10px] uppercase tracking-widest bg-background border-border/10">Disiplin</UiBadge>
                <UiBadge variant="secondary" class="rounded-lg px-3 py-1 font-bold text-[10px] uppercase tracking-widest bg-background border-border/10">Ukhuwah</UiBadge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>