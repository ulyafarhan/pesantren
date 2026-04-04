<script setup lang="ts">
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  Globe, 
  Bell, 
  ChevronRight, 
  Menu,
  GraduationCap,
  Building,
  Quote,
  MessageSquare,
  FileDown,
  User,
  X
} from 'lucide-vue-next';

const route = useRoute();
const isSidebarOpen = ref(false); // Default tertutup di mobile, terbuka di desktop via CSS

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { name: 'Artikel', icon: FileText, path: '/admin/artikel' },      
  { name: 'Program', icon: GraduationCap, path: '/admin/program' },
  { name: 'Fasilitas', icon: Building, path: '/admin/fasilitas' },
  { name: 'Galeri', icon: ImageIcon, path: '/admin/galeri' },
  { name: 'Testimoni', icon: Quote, path: '/admin/testimoni' },
  { name: 'Brosur', icon: FileDown, path: '/admin/brosur' },
  { name: 'Pengaturan', icon: Settings, path: '/admin/pengaturan' }, 
];

const logout = async () => {
  if (confirm('Yakin ingin keluar dari sistem?')) {
    useCookie('token').value = null;
    navigateTo('/login');
  }
};

// Tutup sidebar otomatis saat rute berubah di mobile
watch(() => route.path, () => {
  isSidebarOpen.value = false;
});
</script>

<template>
  <div class="min-h-screen bg-background flex overflow-hidden font-sans text-foreground">
    
    <div 
      v-if="isSidebarOpen" 
      @click="isSidebarOpen = false"
      class="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
    ></div>

    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0"></div>

      <div class="h-20 flex items-center px-8 border-b border-border bg-background relative z-10 justify-between">
        <div class="flex items-center gap-4">
           <div class="w-10 h-10 bg-primary flex items-center justify-center border border-border shrink-0">
             <GraduationCap class="w-6 h-6 text-primary-foreground" />
           </div>
           <div>
             <h1 class="text-lg font-black tracking-tighter text-foreground leading-none uppercase">Admin<span class="text-primary italic font-serif lowercase">Panel</span></h1>
             <p class="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em] leading-none mt-1">Sistem Terpadu</p>
           </div>
        </div>
        <button @click="isSidebarOpen = false" class="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors border border-transparent hover:border-border">
           <X class="w-5 h-5" />
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto py-6 space-y-1 relative z-10 custom-scrollbar">
        <div class="px-8 pb-4">
           <span class="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground">Menu Utama</span>
        </div>
        <div v-for="item in menuItems" :key="item.path">
          <NuxtLink 
            :to="item.path"
            :class="[
              'flex items-center gap-4 px-8 py-3.5 text-xs font-bold transition-all group border-l-[3px]',
              route.path === item.path || route.path.startsWith(item.path + '/') && item.path !== '/admin'
                ? 'bg-primary/5 text-primary border-primary' 
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground border-transparent'
            ]"
          >
            <component :is="item.icon" :class="['w-5 h-5 shrink-0', route.path === item.path ? 'text-primary' : 'group-hover:scale-110 transition-transform']" />
            <span class="flex-1 uppercase tracking-widest">{{ item.name }}</span>
            <ChevronRight v-if="route.path === item.path" class="w-4 h-4 opacity-100" />
          </NuxtLink>
        </div>
      </nav>

      <div class="p-6 border-t border-border space-y-3 bg-background relative z-10">
        <NuxtLink to="/" class="flex items-center gap-4 px-4 py-3 text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-primary transition-colors border border-transparent hover:border-border bg-card">
          <Globe class="w-4 h-4" />
          Lihat Situs Publik
        </NuxtLink>
        <button @click="logout" class="w-full flex items-center gap-4 px-4 py-3 text-[10px] uppercase tracking-widest font-bold text-error hover:bg-error hover:text-error-foreground transition-all active:scale-95 border border-error/20 bg-error/5">
          <LogOut class="w-4 h-4" />
          Keluar Sistem
        </button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-muted/10 relative">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

      <header class="h-20 bg-background/90 backdrop-blur-md border-b border-border flex items-center justify-between px-6 md:px-8 shrink-0 z-30">
        <div class="flex items-center gap-4">
          <button @click="isSidebarOpen = true" class="lg:hidden p-2 border border-border bg-card hover:bg-muted transition-colors">
            <Menu class="w-5 h-5 text-foreground" />
          </button>
          
          <div class="hidden md:block">
            <h2 class="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] leading-none">Status Operasional</h2>
            <div class="flex items-center gap-3 mt-2">
              <span class="text-sm font-black text-foreground uppercase tracking-widest">{{ menuItems.find(i => route.path.startsWith(i.path) && i.path !== '/admin')?.name || 'Dashboard' }}</span>
              <div class="w-1 h-1 bg-border"></div>
              <span class="text-[9px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-2 py-0.5 border border-primary/20">v2.0.4 - Stabil</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-6">
          <div class="flex items-center gap-4 pr-6 border-r border-border hidden sm:flex">
            <div class="w-10 h-10 bg-background border border-border flex items-center justify-center relative hover:border-primary transition-colors cursor-pointer group">
              <Bell class="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span class="absolute top-2 right-2 w-2 h-2 bg-primary"></span>
            </div>
          </div>
          
          <div class="flex items-center gap-4">
            <div class="text-right hidden sm:block">
              <p class="text-xs font-black text-foreground uppercase tracking-widest leading-none">Administrator</p>
              <p class="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Akses Penuh</p>
            </div>
            <div class="w-10 h-10 bg-primary border border-primary flex items-center justify-center shadow-none text-primary-foreground font-black text-xs">
              AD
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-6 md:p-8 relative z-10 custom-scrollbar">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Architectural Blocky Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: var(--bg-muted);
  border-left: 1px solid var(--border-color);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border: 1px solid var(--bg-muted);
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--color-primary);
}
</style>