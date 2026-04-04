<script setup lang="ts">
import { Building, Book, Laptop, Coffee, Music, Home, Users, Shield, Sparkles, LayoutGrid, List, CheckCircle2, MoreVertical, Search, GraduationCap, ArrowRight } from 'lucide-vue-next';

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
  <div class="min-h-screen bg-background text-foreground overflow-hidden">
    <div class="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

    <header class="py-24 lg:py-32 relative z-10 border-b border-border bg-background/80 backdrop-blur-sm">
      <div class="container mx-auto px-6 relative">
        <div class="max-w-4xl space-y-8 text-center mx-auto">
          <div class="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 text-primary px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-[0.3em]">
            <Building class="w-4 h-4" /> Sarana & Prasarana
          </div>
          <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95]">
            Fasilitas <span class="text-primary italic font-serif">Terpadu</span>
          </h1>
          <p class="text-muted-foreground font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            Menciptakan lingkungan belajar yang nyaman, aman, dan modern untuk mendukung akselerasi akademik maupun spiritual santri secara terstruktur.
          </p>
        </div>

        <div class="mt-16 flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
           <div class="flex items-center gap-3 px-6 py-4 bg-card rounded-xl border border-border shadow-sm hover:border-primary transition-colors cursor-default">
              <CheckCircle2 class="w-4 h-4 text-primary" /> Standar Nasional
           </div>
           <div class="flex items-center gap-3 px-6 py-4 bg-card rounded-xl border border-border shadow-sm hover:border-primary transition-colors cursor-default">
              <Shield class="w-4 h-4 text-primary" /> Lingkungan Aman 24/7
           </div>
        </div>
      </div>
    </header>

    <main class="py-24 lg:py-32 container mx-auto px-6 relative z-10">
      <div v-if="!facilities || facilities.length === 0" class="text-center py-32 space-y-6 border border-border bg-card">
          <div class="w-20 h-20 border border-border flex items-center justify-center mx-auto bg-background">
             <Building class="w-10 h-10 text-muted-foreground/40" />
          </div>
          <h3 class="text-2xl font-black text-foreground tracking-tighter">Dalam Tahap Perencanaan</h3>
          <p class="text-muted-foreground font-medium max-w-md mx-auto">Data sarana prasarana sedang dalam proses integrasi ke dalam sistem. Silakan kembali beberapa saat lagi.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <UiCard 
          v-for="f in facilities" 
          :key="f.id" 
          class="group p-8 md:p-10 bg-card border border-border rounded-xl transition-all duration-500 hover:border-primary hover:shadow-[0_0_30px_-15px_rgba(16,185,129,0.3)] hover:-translate-y-1 relative overflow-hidden flex flex-col h-full"
        >
          <div class="absolute top-0 right-0 w-16 h-16 border-t border-r border-primary/0 group-hover:border-primary/50 transition-colors duration-500"></div>

          <div class="relative z-10 flex-grow space-y-8">
            <div class="flex items-start justify-between">
              <div class="w-16 h-16 bg-background border border-border flex items-center justify-center text-foreground group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-500">
                <component :is="getIcon(f.name)" class="w-7 h-7" />
              </div>
              <span class="bg-background border border-border text-muted-foreground font-bold text-[9px] uppercase tracking-widest px-3 py-1">Operasional</span>
            </div>
            
            <div class="space-y-4">
               <h3 class="text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">{{ f.name }}</h3>
               <p class="text-muted-foreground text-sm font-medium leading-relaxed line-clamp-4">{{ f.description }}</p>
            </div>
          </div>

          <div class="pt-8 mt-8 border-t border-border/50 flex items-center gap-3">
             <div class="h-[1px] w-8 bg-border group-hover:w-12 group-hover:bg-primary transition-all duration-500"></div>
             <span class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">Telusuri Detail</span>
          </div>
        </UiCard>
      </div>
    </main>

    <section class="container mx-auto px-6 relative z-10 pb-32">
       <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          <div class="p-10 md:p-14 bg-foreground text-background border border-border rounded-xl flex flex-col justify-between space-y-10 relative overflow-hidden group">
             <div class="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
                <Shield class="w-48 h-48" />
             </div>
             <div class="w-16 h-[2px] bg-primary"></div>
             
             <div class="space-y-6 relative z-10">
                <h3 class="text-3xl font-black tracking-tighter">Keamanan & <br><span class="italic font-serif text-primary">Kenyamanan</span></h3>
                <p class="text-background/70 text-sm md:text-base font-medium leading-relaxed max-w-sm">Sistem pengawasan terintegrasi 24 jam dan manajemen tata ruang yang menjamin ketenangan santri selama berada di area pesantren.</p>
             </div>
             
             <NuxtLink to="/kontak" class="text-xs font-bold uppercase tracking-[0.2em] text-primary hover:text-primary-foreground transition-colors flex items-center gap-3 w-fit">
                Hubungi Pengelola <ArrowRight class="w-4 h-4" />
             </NuxtLink>
          </div>
          
          <div class="p-10 md:p-14 bg-card border border-border rounded-xl flex flex-col justify-between space-y-10 relative overflow-hidden group">
             <div class="absolute bottom-0 right-0 p-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
                <LayoutGrid class="w-48 h-48" />
             </div>
             
             <div class="space-y-6 relative z-10">
                <h3 class="text-3xl font-black tracking-tighter text-foreground">Pemeliharaan <span class="italic font-serif text-primary">Rutin</span></h3>
                <p class="text-muted-foreground text-sm md:text-base font-medium leading-relaxed max-w-sm">Setiap unit fasilitas mendapatkan perawatan berkala berstandar ISO untuk menjamin fungsionalitas dan durabilitas jangka panjang.</p>
             </div>
             
             <div class="flex items-center gap-4 relative z-10 pt-4 border-t border-border">
                <div class="flex -space-x-3">
                   <div class="w-10 h-10 bg-background border-2 border-border flex items-center justify-center">
                     <CheckCircle2 class="w-5 h-5 text-muted-foreground/30" />
                   </div>
                   <div class="w-10 h-10 bg-background border-2 border-border flex items-center justify-center">
                     <Building class="w-5 h-5 text-muted-foreground/30" />
                   </div>
                   <div class="w-10 h-10 bg-primary border-2 border-border flex items-center justify-center text-[10px] font-black text-primary-foreground">ISO</div>
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] font-bold text-foreground uppercase tracking-widest">Divisi Sarpras</span>
                  <span class="text-[9px] text-muted-foreground uppercase tracking-widest">Tim Monitoring</span>
                </div>
             </div>
          </div>

       </div>
    </section>
  </div>
</template>