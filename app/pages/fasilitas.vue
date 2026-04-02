<script setup lang="ts">
import { Building, Book, Laptop, Coffee, Music, Home, Users, Shield, Sparkles, LayoutGrid, List, CheckCircle2, MoreVertical, Search, GraduationCap } from 'lucide-vue-next';

definePageMeta({ layout: 'default' });
useHead({ title: 'Fasilitas & Infrastruktur - PesantrenKu' });

const { data: facilities } = await useFetch('/api/facilities');

const iconMap: Record<string, any> = {
  'Masjid': GraduationCap,
  'Asrama': Home,
  'Laboratorium': Laptop,
  'Perpustakaan': Book,
  'Kantin': Coffee,
  'Olahraga': Users,
  'Keamanan': Shield,
};

const getIcon = (name: string) => {
  for (const key in iconMap) {
    if (name.toLowerCase().includes(key.toLowerCase())) return iconMap[key];
  }
  return Building;
};
</script>

<template>
  <div class="min-h-screen bg-background pb-32">
    <!-- Header Section -->
    <header class="py-24 relative overflow-hidden bg-muted/20 border-b border-border/10">
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-[0.03]"></div>
      <div class="absolute bottom-0 right-0 w-1/3 h-full bg-primary/5 rounded-xl blur-[120px]"></div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-3xl space-y-6 text-center mx-auto">
          <div class="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
            <Building class="size-4" /> Sarana & Prasarana
          </div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-tight italic animate-in fade-in slide-in-from-bottom-8 duration-700">
            Fasilitas <span class="text-primary not-italic tracking-tight underline decoration-muted-foreground/10 underline-offset-8">Terpadu</span>
          </h1>
          <p class="text-muted-foreground font-medium text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed italic animate-in fade-in duration-1000 delay-200">
            Menciptakan lingkungan belajar yang nyaman, aman, dan modern untuk mendukung akselerasi akademik maupun spiritual santri.
          </p>
        </div>

        <!-- Filter Placeholder / Information -->
        <div class="mt-16 flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
           <div class="flex items-center gap-2 px-6 py-3 bg-background rounded-xl border border-border/10 shadow-sm">
              <CheckCircle2 class="size-3.5 text-primary" /> Standar Nasional
           </div>
           <div class="flex items-center gap-2 px-6 py-3 bg-background rounded-xl border border-border/10 shadow-sm">
              <Shield class="size-3.5 text-primary" /> Lingkungan Aman 24/7
           </div>
        </div>
      </div>
    </header>

    <!-- Facilities Grid -->
    <main class="py-24 container mx-auto px-6">
      <div v-if="!facilities || facilities.length === 0" class="text-center py-40 space-y-4">
          <div class="size-20 bg-muted rounded-xl flex items-center justify-center mx-auto mb-6 opacity-40">
             <Building class="size-10" />
          </div>
          <h3 class="text-2xl font-black italic text-foreground tracking-tighter">Informasi Fasilitas Sedang Diperbarui</h3>
          <p class="text-muted-foreground font-medium italic">Kami segera menghadirkan detail sarana terbaru untuk Anda.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <UiCard 
          v-for="f in facilities" 
          :key="f.id" 
          class="group p-10 bg-background border border-border/5 rounded-xl shadow-sm transition-all duration-300 hover:border-primary/50 relative overflow-hidden"
        >
          <!-- Abstract Background Pattern -->
          <div class="absolute -top-12 -right-12 size-48 bg-primary/5 rounded-xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div class="relative z-10 space-y-8">
            <div class="flex items-start justify-between">
              <div class="size-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-sm ring-1 ring-primary/10">
                <component :is="getIcon(f.name)" class="size-6" />
              </div>
              <UiBadge variant="secondary" class="bg-muted text-muted-foreground font-bold text-[8px] uppercase tracking-widest rounded-lg border-0 py-0.5 px-2">AKTIF</UiBadge>
            </div>
            
            <div class="space-y-4">
               <h3 class="text-2xl font-black tracking-tight text-foreground italic group-hover:text-primary transition-colors leading-none">{{ f.name }}</h3>
               <p class="text-muted-foreground text-sm font-medium leading-relaxed italic line-clamp-3">{{ f.description }}</p>
            </div>

            <div class="pt-6 flex items-center gap-2 group-cursor-pointer">
               <div class="h-[1px] w-6 bg-border group-hover:w-10 group-hover:bg-primary transition-all duration-500"></div>
               <span class="text-[9px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">Detail Sarana</span>
            </div>
          </div>
        </UiCard>
      </div>
    </main>

    <!-- Support Information -->
    <section class="container mx-auto px-6">
       <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div class="p-12 bg-foreground text-background rounded-xl flex flex-col justify-between space-y-8 shadow-2xl relative overflow-hidden">
             <div class="absolute top-0 right-0 p-10 opacity-10">
                <Shield class="size-32" />
             </div>
             <div class="space-y-4 relative z-10">
                <h3 class="text-2xl font-black italic tracking-tighter">Keamanan & Kenyamanan</h3>
                <p class="text-primary-foreground/60 text-xs font-medium leading-relaxed">Sistem pengawasan CCTV 24 jam dan petugas keamanan yang ramah memastikan ketenangan santri selama menetap di asrama.</p>
             </div>
             <NuxtLink to="/kontak" class="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2 group relative z-10">
                Hubungi Petugas Jaga <CheckCircle2 class="size-3" />
             </NuxtLink>
          </div>
          
          <div class="p-12 bg-muted/30 rounded-xl flex flex-col justify-between space-y-8 border border-border/10 shadow-sm relative overflow-hidden">
             <div class="absolute bottom-0 right-0 p-10 opacity-5">
                <Building class="size-32" />
             </div>
             <div class="space-y-4 relative z-10">
                <h3 class="text-2xl font-black italic tracking-tighter text-foreground">Pemeliharaan Rutin</h3>
                <p class="text-muted-foreground text-xs font-medium leading-relaxed italic">Setiap sarana mendapatkan perawatan berkala untuk menjamin standar higienitas dan fungsionalitas bagi para santri.</p>
             </div>
             <div class="flex items-center gap-3 relative z-10">
                <div class="flex -space-x-3">
                   <div class="size-8 rounded-xl bg-primary/20 border-2 border-background"></div>
                   <div class="size-8 rounded-xl bg-emerald-500/20 border-2 border-background"></div>
                   <div class="size-8 rounded-xl bg-primary/40 border-2 border-background flex items-center justify-center text-[10px] font-black italic text-primary">PK</div>
                </div>
                <span class="text-[9px] font-bold text-muted-foreground uppercase tracking-widest italic">Monitoring Tim Sarana</span>
             </div>
          </div>
       </div>
    </section>
  </div>
</template>