<script setup lang="ts">
import { FileText, Image as ImageIcon, Users, Activity, ArrowRight, ShieldAlert } from 'lucide-vue-next';

definePageMeta({
  layout: 'admin'
})
</script>

<template>
  <div class="space-y-8 animate-in fade-in duration-500">
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
      <div class="space-y-1">
        <h1 class="text-3xl font-black tracking-tighter text-foreground uppercase">Ringkasan Sistem</h1>
        <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Tinjauan Metrik & Aktivitas Operasional</p>
      </div>
      <div class="flex items-center gap-2 bg-muted/50 border border-border px-4 py-2">
         <div class="w-2 h-2 bg-emerald-500 animate-pulse"></div>
         <span class="text-[9px] font-black uppercase tracking-widest text-foreground">Sistem Online</span>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-card p-6 border border-border relative overflow-hidden group hover:border-primary transition-colors">
        <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
           <FileText class="w-16 h-16 text-foreground" />
        </div>
        <div class="space-y-4 relative z-10">
           <div class="w-8 h-8 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <FileText class="w-4 h-4" />
           </div>
           <div>
              <div class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Publikasi</div>
              <div class="text-4xl font-black text-foreground tracking-tighter">124</div>
           </div>
        </div>
      </div>
      
      <div class="bg-card p-6 border border-border relative overflow-hidden group hover:border-primary transition-colors">
        <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
           <ImageIcon class="w-16 h-16 text-foreground" />
        </div>
        <div class="space-y-4 relative z-10">
           <div class="w-8 h-8 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <ImageIcon class="w-4 h-4" />
           </div>
           <div>
              <div class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Arsip Galeri</div>
              <div class="text-4xl font-black text-foreground tracking-tighter">48</div>
           </div>
        </div>
      </div>

      <div class="bg-foreground text-background p-6 border border-border relative overflow-hidden group">
        <div class="absolute top-0 right-0 p-4 opacity-5">
           <Users class="w-16 h-16 text-background" />
        </div>
        <div class="space-y-4 relative z-10">
           <div class="w-8 h-8 bg-background/10 border border-background/20 flex items-center justify-center text-background">
              <Users class="w-4 h-4" />
           </div>
           <div>
              <div class="text-[10px] font-bold text-background/60 uppercase tracking-widest mb-1">Pendaftar Baru</div>
              <div class="text-4xl font-black text-primary tracking-tighter">12</div>
           </div>
        </div>
      </div>
    </div>

    <div class="bg-card border border-border">
      <div class="p-6 border-b border-border flex items-center gap-3">
         <Activity class="w-5 h-5 text-primary" />
         <h2 class="text-lg font-black uppercase tracking-tight">Log Aktivitas Terakhir</h2>
      </div>
      
      <div class="divide-y divide-border">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center p-6 hover:bg-muted/20 transition-colors gap-4">
          <div class="flex items-start gap-4">
             <div class="w-2 h-2 bg-primary mt-1.5 shrink-0"></div>
             <div>
               <div class="font-bold text-foreground text-sm uppercase tracking-tight">Artikel Baru Ditambahkan</div>
               <div class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Oleh: Admin Utama</div>
             </div>
          </div>
          <div class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest border border-border px-3 py-1 bg-background">
             2 Jam Yang Lalu
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center p-6 hover:bg-muted/20 transition-colors gap-4">
          <div class="flex items-start gap-4">
             <div class="w-2 h-2 bg-amber-500 mt-1.5 shrink-0"></div>
             <div>
               <div class="font-bold text-foreground text-sm uppercase tracking-tight">Pembaruan Konfigurasi Web</div>
               <div class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Oleh: Admin Sistem</div>
             </div>
          </div>
          <div class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest border border-border px-3 py-1 bg-background">
             5 Jam Yang Lalu
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center p-6 hover:bg-muted/20 transition-colors gap-4">
          <div class="flex items-start gap-4">
             <div class="w-2 h-2 bg-destructive mt-1.5 shrink-0"></div>
             <div>
               <div class="font-bold text-foreground text-sm uppercase tracking-tight">Data Galeri Dihapus</div>
               <div class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Oleh: Admin Utama</div>
             </div>
          </div>
          <div class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest border border-border px-3 py-1 bg-background">
             1 Hari Yang Lalu
          </div>
        </div>
      </div>
      
      <div class="p-4 bg-muted/10 border-t border-border text-center">
         <button class="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors flex items-center justify-center gap-2 w-full">
            Lihat Semua Log <ArrowRight class="w-3 h-3" />
         </button>
      </div>
    </div>
    
  </div>
</template>