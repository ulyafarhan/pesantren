<script setup lang="ts">
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Youtube, 
  Facebook, 
  ChevronRight, 
  ArrowRight, 
  Menu, 
  X, 
  GraduationCap,
  Sparkles,
  BookOpen,
  Building,
  Users,
  Search,
  MessageCircle
} from 'lucide-vue-next';

const isMenuOpen = ref(false);
const isScrolled = ref(false);
const { data: settingsData } = await useFetch('/api/settings');

const settings = computed(() => {
  const map: Record<string, string> = {};
  for (const s of (settingsData.value || []) as any[]) {
    map[s.key] = s.value;
  }
  return map;
});

const navLinks = [
  { name: 'Beranda', path: '/' },
  { name: 'Sejarah', path: '/sejarah' },
  { name: 'Artikel', path: '/artikel' },
  { name: 'Galeri', path: '/galeri' },
  { name: 'Fasilitas', path: '/fasilitas' },
  { name: 'Brosur', path: '/brosur' },
  { name: 'Kontak', path: '/kontak' },
];

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50;
  });
});

// Tutup menu mobile jika rute berubah
const route = useRoute();
watch(() => route.path, () => {
  isMenuOpen.value = false;
});
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white bg-background text-foreground">
    
    <div 
      :class="[
        'bg-foreground text-background py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] hidden md:block border-b border-border/20 transition-all duration-500 origin-top',
        isScrolled ? 'h-0 py-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'
      ]"
    >
      <div class="container mx-auto px-6 flex justify-between items-center">
        <div class="flex gap-8">
           <span class="flex items-center gap-2 group cursor-pointer transition-colors hover:text-primary">
              <Phone class="w-3 h-3 text-primary group-hover:scale-110 transition-transform" /> 
              {{ settings.contact_phone || '+62 800-0000-0000' }}
           </span>
           <span class="flex items-center gap-2 group cursor-pointer transition-colors hover:text-primary">
              <Mail class="w-3 h-3 text-primary group-hover:scale-110 transition-transform" /> 
              {{ settings.contact_email || 'hubungi@pesantrenku.com' }}
           </span>
        </div>
        <div class="flex gap-4">
           <a :href="settings.social_instagram" target="_blank" class="hover:text-primary transition-colors"><Instagram class="w-3.5 h-3.5" /></a>
           <a :href="settings.social_youtube" target="_blank" class="hover:text-primary transition-colors"><Youtube class="w-3.5 h-3.5" /></a>
        </div>
      </div>
    </div>

    <nav 
      :class="[
        'sticky top-0 z-50 transition-all duration-500 ease-in-out border-b',
        isScrolled ? 'bg-background/95 backdrop-blur-md border-border shadow-sm py-3' : 'bg-background border-border/10 py-5'
      ]"
    >
      <div class="container mx-auto px-6 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center gap-3 group relative z-50">
          <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center border border-border group-hover:bg-foreground transition-all duration-500">
            <GraduationCap class="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
             <span class="text-xl font-black tracking-tighter text-foreground block leading-none uppercase">Pesantren<span class="text-primary italic font-serif lowercase">Ku</span></span>
             <span class="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.3em] leading-none mt-1 block">Modern & Beradab</span>
          </div>
        </NuxtLink>

        <div class="hidden lg:flex items-center gap-8">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path" 
            :to="link.path"
            class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all duration-300 relative group py-2"
            active-class="!text-foreground font-black"
          >
            {{ link.name }}
            <span :class="[
              'absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300',
              route.path === link.path ? 'w-full' : 'w-0 group-hover:w-full'
            ]"></span>
          </NuxtLink>
        </div>

        <div class="flex items-center gap-4 relative z-50">
          <UiButton as-child class="hidden lg:flex px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-[10px] uppercase tracking-widest h-10 transition-transform active:scale-95 border border-transparent">
            <NuxtLink to="/kontak">Pendaftaran Santri Baru</NuxtLink>
          </UiButton>
          
          <button @click="isMenuOpen = !isMenuOpen" class="lg:hidden w-10 h-10 flex items-center justify-center bg-card text-foreground border border-border rounded-xl hover:bg-muted transition-colors">
            <Menu v-if="!isMenuOpen" class="w-5 h-5" />
            <X v-else class="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMenuOpen" class="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden pt-24 border-b border-border shadow-2xl flex flex-col h-[100dvh]">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>
        
        <div class="flex flex-col gap-4 flex-1 px-8 py-4 overflow-y-auto relative z-10 custom-scrollbar">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path" 
            :to="link.path"
            class="text-3xl font-black tracking-tighter uppercase text-muted-foreground hover:text-foreground transition-all flex items-center justify-between group border-b border-border/50 pb-4"
            active-class="!text-foreground !border-primary"
          >
            {{ link.name }}
            <ArrowRight :class="['w-6 h-6 transition-all', route.path === link.path ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-100 text-muted-foreground']" />
          </NuxtLink>
        </div>
        
        <div class="p-8 mt-auto relative z-10 bg-background border-t border-border">
           <UiButton as-child class="w-full h-14 rounded-xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
              <NuxtLink to="/kontak">Daftar Sekarang <ChevronRight class="w-4 h-4" /></NuxtLink>
           </UiButton>
        </div>
      </div>
    </Transition>

    <main class="flex-1 relative z-10">
      <slot />
    </main>

    <footer class="bg-foreground text-background pt-24 pb-12 relative overflow-hidden border-t border-border">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>
      
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-primary/30 hidden lg:block"></div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          <div class="space-y-10">
            <NuxtLink to="/" class="flex items-center gap-4 group">
              <div class="w-14 h-14 bg-primary rounded-xl flex items-center justify-center border border-primary/20 group-hover:bg-background transition-all duration-500">
                <GraduationCap class="w-8 h-8 text-primary-foreground group-hover:text-foreground transition-all" />
              </div>
              <div class="space-y-1">
                <span class="text-2xl font-black tracking-tighter uppercase leading-none block">Pesantren<span class="italic font-serif lowercase text-primary">Ku</span></span>
                <span class="text-[9px] font-bold text-background/40 uppercase tracking-[0.3em] leading-none block">Lembaga Terakreditasi</span>
              </div>
            </NuxtLink>
            <p class="text-background/50 text-sm font-medium leading-loose font-serif italic max-w-xs border-l border-primary/20 pl-6">
              {{ settings.site_description || 'Membentuk karakter generasi robbani yang cerdas, berwawasan global, dan berpegang teguh pada nilai-nilai Al-Qur\'an dan As-Sunnah secara terstruktur.' }}
            </p>
            <div class="flex gap-3 pt-2">
              <a v-for="(soc, i) in [
                { icon: Instagram, link: settings.social_instagram },
                { icon: Facebook, link: settings.social_facebook },
                { icon: Youtube, link: settings.social_youtube }
              ]" :key="i" :href="soc.link" class="w-10 h-10 border border-background/10 bg-background/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <component :is="soc.icon" class="w-4 h-4" />
              </a>
            </div>
          </div>

          <div class="space-y-10">
            <div class="flex items-center gap-3">
              <div class="w-6 h-[2px] bg-primary"></div>
              <h3 class="text-[10px] font-black uppercase tracking-[0.4em] text-background/80">Navigasi Utama</h3>
            </div>
            <ul class="space-y-5">
              <li v-for="link in navLinks.slice(1)" :key="link.path">
                <NuxtLink :to="link.path" class="text-[11px] font-bold uppercase tracking-widest text-background/40 hover:text-primary transition-all flex items-center gap-4 group">
                  <div class="w-0 h-px bg-primary group-hover:w-4 transition-all duration-500"></div>
                  {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="space-y-10">
            <div class="flex items-center gap-3">
              <div class="w-6 h-[2px] bg-primary"></div>
              <h3 class="text-[10px] font-black uppercase tracking-[0.4em] text-background/80">Sistem Akademik</h3>
            </div>
            <ul class="space-y-5">
              <li v-for="item in [
                { n: 'Kurikulum Terpadu', p: '/fasilitas' },
                { n: 'Penerimaan Santri', p: '/kontak' },
                { n: 'Visi & Peradaban', p: '/sejarah' },
                { n: 'Arsip Dokumentasi', p: '/galeri' }
              ]" :key="item.n">
                <NuxtLink :to="item.p" class="text-[11px] font-bold uppercase tracking-widest text-background/40 hover:text-primary transition-all flex items-center gap-4 group">
                  <div class="w-0 h-px bg-primary group-hover:w-4 transition-all duration-500"></div>
                  {{ item.n }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="space-y-10">
            <div class="flex items-center gap-3">
              <div class="w-6 h-[2px] bg-primary"></div>
              <h3 class="text-[10px] font-black uppercase tracking-[0.4em] text-background/80">Hubungi Pusat</h3>
            </div>
            <div class="space-y-8">
              <div class="group cursor-default">
                  <span class="text-[8px] font-black uppercase tracking-[0.2em] text-primary block mb-2">Lokasi Kampus</span>
                  <p class="text-[11px] font-bold text-background/50 leading-relaxed uppercase tracking-widest group-hover:text-background transition-colors">{{ settings.contact_address || 'Jl. Raya Pendidikan Utama No. 1, Bogor' }}</p>
              </div>
              <div class="group cursor-default">
                  <span class="text-[8px] font-black uppercase tracking-[0.2em] text-primary block mb-2">Layanan WhatsApp</span>
                  <p class="text-xl font-black tracking-tighter group-hover:text-background transition-colors">{{ settings.contact_phone || '+62 800-0000-0000' }}</p>
              </div>
              <div class="group cursor-default">
                  <span class="text-[8px] font-black uppercase tracking-[0.2em] text-primary block mb-2">Surel Resmi</span>
                  <p class="text-[11px] font-bold text-background/50 group-hover:text-background transition-colors uppercase tracking-widest">{{ settings.contact_email || 'hubungi@pesantrenku.com' }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-12 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p class="text-[9px] font-bold text-background/20 uppercase tracking-[0.4em]">
              © 2026 PESANTRENKU MODERN SYSTEM.
            </p>
            <div class="h-px w-8 bg-background/10 hidden md:block"></div>
            <NuxtLink to="/admin/login" class="text-[9px] font-black uppercase tracking-[0.3em] text-background/30 hover:text-white transition-colors flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-primary"></div> Akses Enkripsi Admin
            </NuxtLink>
          </div>
          <div class="flex gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-background/40">
            <NuxtLink class="hover:text-primary transition-colors cursor-pointer">Security</NuxtLink>
            <NuxtLink class="hover:text-primary transition-colors cursor-pointer">Privacy</NuxtLink>
            <NuxtLink class="hover:text-primary transition-colors cursor-pointer">Terms</NuxtLink>
          </div>
        </div>
      </div>
    </footer>

    <a href="https://wa.me/6280000000000" target="_blank" class="fixed bottom-10 right-10 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-xl flex items-center justify-center shadow-none hover:bg-foreground transition-all active:scale-95 group border border-border">
       <MessageCircle class="w-6 h-6" />
       <span class="absolute right-full mr-4 bg-foreground text-background px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border pointer-events-none">Hubungi via WhatsApp</span>
    </a>
  </div>
</template>

<style>
/* Nuxt Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Custom Scrollbar for Mobile Menu */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--border-color);
}
</style>