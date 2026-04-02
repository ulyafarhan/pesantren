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
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white">
    <!-- TOP BAR -->
    <div class="bg-foreground text-background py-2 text-[10px] font-black uppercase tracking-[0.2em] hidden md:block">
      <div class="container mx-auto px-6 flex justify-between items-center">
        <div class="flex gap-8">
           <span class="flex items-center gap-2 group cursor-pointer transition-colors hover:text-primary">
              <Phone class="size-3 text-primary group-hover:scale-110 transition-transform" /> 
              {{ settings.contact_phone || '+62 800-0000-0000' }}
           </span>
           <span class="flex items-center gap-2 group cursor-pointer transition-colors hover:text-primary">
              <Mail class="size-3 text-primary group-hover:scale-110 transition-transform" /> 
              {{ settings.contact_email || 'hubungi@pesantrenku.com' }}
           </span>
        </div>
        <div class="flex gap-4">
           <a :href="settings.social_instagram" target="_blank" class="hover:text-primary transition-colors"><Instagram class="size-3.5" /></a>
           <a :href="settings.social_youtube" target="_blank" class="hover:text-primary transition-colors"><Youtube class="size-3.5" /></a>
        </div>
      </div>
    </div>

    <!-- NAVBAR -->
    <nav 
      :class="[
        'sticky top-0 z-50 transition-all duration-500 ease-in-out',
        isScrolled ? 'bg-white/80 backdrop-blur-2xl border-b border-border/10 py-3 shadow-2xl shadow-black/5' : 'bg-transparent py-6'
      ]"
    >
      <div class="container mx-auto px-6 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="size-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-all duration-500">
            <GraduationCap class="size-6 text-white" />
          </div>
          <div>
             <span class="text-xl font-black tracking-tighter text-foreground decoration-primary decoration-2 block leading-none">Pesantren<span class="text-primary italic">Ku</span></span>
             <span class="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-none mt-1 block">Modern & Beradab</span>
          </div>
        </NuxtLink>

        <!-- DESKTOP NAV -->
        <div class="hidden lg:flex items-center gap-8">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path" 
            :to="link.path"
            class="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/60 hover:text-primary transition-all duration-300 relative group py-2"
            active-class="text-primary !opacity-100"
          >
            {{ link.name }}
            <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full rounded-xl"></span>
          </NuxtLink>
        </div>

        <div class="flex items-center gap-4">
          <UiButton as-child class="hidden lg:flex px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-[11px] uppercase tracking-widest h-12 shadow-xl shadow-primary/20 transition-all active:scale-95">
            <NuxtLink to="/kontak">Daftar Sekarang</NuxtLink>
          </UiButton>
          
          <button @click="isMenuOpen = !isMenuOpen" class="lg:hidden p-2 text-foreground hover:bg-muted rounded-xl transition-colors">
            <Menu v-if="!isMenuOpen" class="size-7" />
            <X v-else class="size-7" />
          </button>
        </div>
      </div>
    </nav>

    <!-- MOBILE MENU -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div v-if="isMenuOpen" class="fixed inset-0 z-[60] bg-white flex flex-col p-10 lg:hidden">
        <div class="flex justify-between items-center mb-16">
           <NuxtLink to="/" class="flex items-center gap-3">
              <div class="size-10 bg-primary rounded-xl flex items-center justify-center">
                 <GraduationCap class="size-6 text-white" />
              </div>
              <span class="text-xl font-black tracking-tighter italic">PesantrenKu</span>
           </NuxtLink>
           <button @click="isMenuOpen = false" class="p-2 bg-muted rounded-xl"><X class="size-6" /></button>
        </div>
        <div class="flex flex-col gap-8 flex-1">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path" 
            :to="link.path"
            @click="isMenuOpen = false"
            class="text-4xl font-black tracking-tighter italic text-slate-400 hover:text-primary transition-colors flex items-center justify-between group"
          >
            {{ link.name }}
            <ArrowRight class="size-8 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
          </NuxtLink>
        </div>
        <div class="pt-8 border-t border-border/10 space-y-6">
           <div class="flex gap-4">
              <div class="size-12 rounded-xl bg-muted flex items-center justify-center text-primary"><Phone class="size-5" /></div>
              <div class="flex flex-col">
                 <span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Hubungi Kami</span>
                 <span class="font-bold text-lg leading-none">{{ settings.contact_phone || '+62 800-0000-0000' }}</span>
              </div>
           </div>
           <UiButton as-child class="w-full h-14 rounded-xl bg-primary font-black uppercase tracking-widest text-xs">
              <NuxtLink to="/kontak" @click="isMenuOpen = false">Daftar Sekarang</NuxtLink>
           </UiButton>
        </div>
      </div>
    </Transition>

    <!-- CONTENT -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- FOOTER -->
    <footer class="bg-foreground text-background pt-24 pb-12 relative overflow-hidden">
      <!-- Decorative background -->
      <div class="absolute -top-32 -right-32 size-[600px] border border-white/[0.03] rounded-xl"></div>
      
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div class="space-y-8">
            <NuxtLink to="/" class="flex items-center gap-3">
              <div class="size-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <GraduationCap class="size-7 text-white" />
              </div>
              <span class="text-2xl font-black tracking-tighter italic">PesantrenKu</span>
            </NuxtLink>
            <p class="text-primary-foreground/50 text-sm font-medium leading-relaxed italic">
              {{ settings.site_description || 'Membentuk karakter generasi robbani yang cerdas, berwawasan global, dan berpegang teguh pada nilai-nilai Al-Qur\'an dan As-Sunnah.' }}
            </p>
            <div class="flex gap-4 pt-4">
               <a :href="settings.social_instagram" class="size-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-primary transition-all"><Instagram class="size-4" /></a>
               <a :href="settings.social_facebook" class="size-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-primary transition-all"><Facebook class="size-4" /></a>
               <a :href="settings.social_youtube" class="size-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-primary transition-all"><Youtube class="size-4" /></a>
            </div>
          </div>

          <div class="space-y-8">
            <h3 class="text-lg font-black tracking-tight italic flex items-center gap-2">
               <div class="w-2 h-2 bg-primary rounded-xl"></div> Tautan Cepat
            </h3>
            <ul class="space-y-4">
              <li v-for="link in navLinks.slice(1)" :key="link.path">
                <NuxtLink :to="link.path" class="text-sm font-bold text-primary-foreground/60 hover:text-primary transition-colors flex items-center gap-2 group">
                   <ChevronRight class="size-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                   {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="space-y-8">
             <h3 class="text-lg font-black tracking-tight italic flex items-center gap-2 text-left">
               <div class="w-2 h-2 bg-primary rounded-xl"></div> Menu Akademik
            </h3>
             <ul class="space-y-4">
              <li><NuxtLink to="/fasilitas" class="text-sm font-bold text-primary-foreground/60 hover:text-primary transition-colors flex items-center gap-2 group text-left">Kurikulum Terpadu</NuxtLink></li>
              <li><NuxtLink to="/index" class="text-sm font-bold text-primary-foreground/60 hover:text-primary transition-colors flex items-center gap-2 group text-left">Penerimaan Santri</NuxtLink></li>
              <li><NuxtLink to="/sejarah" class="text-sm font-bold text-primary-foreground/60 hover:text-primary transition-colors flex items-center gap-2 group text-left">Visi & Misi</NuxtLink></li>
              <li><NuxtLink to="/brosur" class="text-sm font-bold text-primary-foreground/60 hover:text-primary transition-colors flex items-center gap-2 group text-left">Unduh Brosur</NuxtLink></li>
            </ul>
          </div>

          <div class="space-y-8">
            <h3 class="text-lg font-black tracking-tight italic flex items-center gap-2">
               <div class="w-2 h-2 bg-primary rounded-xl"></div> Hubungi Kami
            </h3>
            <div class="space-y-6">
               <div class="flex items-start gap-4 text-left">
                  <MapPin class="size-5 text-primary shrink-0 mt-1" />
                  <p class="text-[11px] font-bold text-primary-foreground/50 leading-relaxed uppercase tracking-widest">{{ settings.contact_address || 'Jl. Raya Pendidikan Utama No. 1, Bogor' }}</p>
               </div>
               <div class="flex items-center gap-4 text-left">
                  <Phone class="size-5 text-primary shrink-0" />
                  <p class="text-lg font-black tracking-tighter">{{ settings.contact_phone || '+62 800-0000-0000' }}</p>
               </div>
               <div class="flex items-center gap-4 text-left">
                  <Mail class="size-5 text-primary shrink-0" />
                  <p class="text-sm font-bold text-primary-foreground/60">{{ settings.contact_email || 'hubungi@pesantrenku.com' }}</p>
               </div>
            </div>
          </div>
        </div>

        <div class="pt-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-8">
          <p class="text-[10px] font-bold text-primary-foreground/30 uppercase tracking-[0.3em]">
            © 2026 PESANTRENKU MODERN. ALL RIGHTS RESERVED.
          </p>
          <div class="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-primary-foreground/40">
             <NuxtLink class="hover:text-primary">Kebijakan Privasi</NuxtLink>
             <NuxtLink class="hover:text-primary">Syarat & Ketentuan</NuxtLink>
             <NuxtLink to="/login" class="text-primary hover:underline">Admin Login</NuxtLink>
          </div>
        </div>
      </div>
    </footer>

    <!-- FLOAT BUTTON -->
    <a href="https://wa.me/6280000000000" target="_blank" class="fixed bottom-10 right-10 z-50 size-16 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:bg-emerald-600 transition-all active:scale-95 group">
       <MessageCircle class="size-8" />
       <span class="absolute right-full mr-4 bg-white text-emerald-600 px-4 py-2 rounded-xl text-xs font-black shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-emerald-100">Tanya Admin via WhatsApp</span>
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
  transform: translateY(20px);
}
</style>