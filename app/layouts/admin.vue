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
  User
} from 'lucide-vue-next';

const route = useRoute();
const isSidebarOpen = ref(true);

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { name: 'Artikel', icon: FileText, path: '/admin/articles' },
  { name: 'Program', icon: GraduationCap, path: '/admin/program' },
  { name: 'Fasilitas', icon: Building, path: '/admin/fasilitas' },
  { name: 'Galeri', icon: ImageIcon, path: '/admin/galeri' },
  { name: 'Testimoni', icon: Quote, path: '/admin/testimoni' },
  { name: 'Brosur', icon: FileDown, path: '/admin/brosur' },
  { name: 'Pengaturan', icon: Settings, path: '/admin/settings' },
];

const logout = async () => {
  if (confirm('Yakin ingin keluar?')) {
    useCookie('token').value = null;
    navigateTo('/login');
  }
};
</script>

<template>
  <div class="min-h-screen bg-[#f8fafc] flex overflow-hidden font-sans">
    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="flex flex-col h-full">
        <!-- Logo Area -->
        <div class="h-20 flex items-center px-8 border-b border-slate-100">
          <div class="size-10 bg-primary rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-primary/20">
            <GraduationCap class="size-6 text-primary-foreground" />
          </div>
          <div>
            <h1 class="text-lg font-black tracking-tighter text-slate-900 leading-tight">AdminPanel</h1>
            <p class="text-[10px] font-bold text-primary uppercase tracking-[0.2em] leading-none">PesantrenKu</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto px-4 py-8 space-y-1.5 custom-scrollbar">
          <div v-for="item in menuItems" :key="item.path">
            <NuxtLink 
              :to="item.path"
              :class="[
                'flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all group',
                route.path === item.path 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
              ]"
            >
              <component :is="item.icon" :class="['size-5 shrink-0', route.path === item.path ? 'text-white' : 'group-hover:scale-110 transition-transform']" />
              <span class="flex-1">{{ item.name }}</span>
              <ChevronRight v-if="route.path === item.path" class="size-4 opacity-50" />
            </NuxtLink>
          </div>
        </nav>

        <!-- Footer Actions -->
        <div class="p-4 border-t border-slate-100 space-y-2">
          <NuxtLink to="/" class="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-500 hover:text-primary transition-colors">
            <Globe class="size-5" />
            Lihat Situs
          </NuxtLink>
          <button @click="logout" class="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all active:scale-95">
            <LogOut class="size-5" />
            Keluar Sistem
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
      <!-- Header -->
      <header class="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-40">
        <div class="flex items-center gap-4">
          <button @click="isSidebarOpen = !isSidebarOpen" class="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <Menu class="size-6 text-slate-600" />
          </button>
          <div class="hidden md:block">
            <h2 class="text-sm font-black text-slate-500 uppercase tracking-widest leading-none">Manajemen Sitem</h2>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs font-bold text-slate-900">{{ menuItems.find(i => i.path === route.path)?.name || 'Dashboard' }}</span>
              <div class="size-1 bg-slate-300 rounded-xl"></div>
              <span class="text-[10px] font-bold text-primary uppercase tracking-widest">v2.0.4</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-6">
          <div class="flex items-center gap-3 pr-6 border-r border-slate-200 hidden sm:flex">
            <div class="size-10 rounded-xl bg-slate-50 flex items-center justify-center relative">
              <Bell class="size-5 text-slate-400" />
              <span class="absolute top-2 right-2 size-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="text-right hidden sm:block">
              <p class="text-xs font-black text-slate-900 leading-none">Admin Utama</p>
              <p class="text-[10px] font-bold text-primary uppercase mt-1">Super User</p>
            </div>
            <div class="size-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-inner">
              <User class="size-6 text-slate-400" />
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 20px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>