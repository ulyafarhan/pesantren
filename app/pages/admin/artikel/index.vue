<script setup lang="ts">
import { Plus, FileText, Search, User as UserIcon, Calendar, Pencil, Trash2 } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'admin-only' })
useHead({ title: 'Kelola Artikel - Admin PesantrenKu' })

const { data: articles, refresh } = await useFetch('/api/articles')

const deleteArticle = async (slug: string) => { 
  if (!confirm('Peringatan: Yakin ingin menghapus dokumen artikel ini secara permanen?')) return 
  await $fetch(`/api/articles/${slug}`, { method: 'DELETE' }) 
  refresh()
}
</script>

<template>
  <div class="space-y-8 animate-in fade-in duration-500 relative z-10"> 
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border pb-6"> 
      <div class="space-y-1"> 
        <h1 class="text-3xl font-black tracking-tighter text-foreground uppercase">Kelola Publikasi</h1> 
        <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Manajemen konten artikel, berita, dan blog pesantren.</p> 
      </div> 
      <UiButton as-child class="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 px-6 rounded-xl shadow-none border border-primary transition-all active:scale-95"> 
        <NuxtLink to="/admin/artikel/buat" class="flex items-center gap-2 uppercase tracking-widest text-[10px]"> 
          <Plus class="w-4 h-4" /> Tulis Artikel Baru 
        </NuxtLink> 
      </UiButton> 
    </div> 

    <UiCard class="border border-border bg-card rounded-xl overflow-hidden relative shadow-none"> 
      <div class="p-6 border-b border-border bg-muted/10 flex flex-col md:flex-row gap-4 items-center justify-between"> 
        <div class="relative w-full md:w-96 flex"> 
          <div class="w-12 h-10 bg-muted border border-border border-r-0 flex items-center justify-center shrink-0">
             <Search class="w-4 h-4 text-muted-foreground" /> 
          </div>
          <UiInput placeholder="Cari arsip judul artikel..." class="h-10 bg-background border border-border focus-visible:ring-primary rounded-xl flex-1 font-mono text-xs" /> 
        </div> 
        <div class="flex items-center gap-2 text-[9px] font-bold text-foreground uppercase tracking-[0.3em] leading-none bg-background border border-border px-4 py-2.5"> 
          <span class="w-2 h-2 bg-primary"></span> Total: {{ articles?.length || 0 }} Dokumen 
        </div> 
      </div> 

      <div class="overflow-x-auto relative z-10"> 
        <div v-if="!articles || articles.length === 0" class="text-center py-32 bg-background border-b border-border"> 
          <div class="w-20 h-20 bg-muted border border-border flex items-center justify-center mx-auto mb-6"> 
            <FileText class="w-10 h-10 text-muted-foreground/40" /> 
          </div> 
          <h3 class="text-xl font-black tracking-tight uppercase">Basis Data Kosong</h3> 
          <p class="text-muted-foreground text-sm max-w-xs mx-auto mt-2 italic font-serif">Mulailah menulis draf artikel pertama untuk didistribusikan ke halaman web publik.</p> 
        </div> 

        <UiTable v-else> 
          <UiTableHeader class="bg-foreground text-background"> 
            <UiTableRow class="hover:bg-foreground border-border"> 
              <UiTableHead class="w-[450px] font-black text-background h-12 uppercase tracking-[0.2em] text-[9px]">Informasi Artikel</UiTableHead> 
              <UiTableHead class="hidden md:table-cell font-black text-background uppercase tracking-[0.2em] text-[9px]">Otoritas Penulis</UiTableHead> 
              <UiTableHead class="font-black text-background uppercase tracking-[0.2em] text-[9px]">Status Publikasi</UiTableHead> 
              <UiTableHead class="hidden lg:table-cell font-black text-background uppercase tracking-[0.2em] text-[9px]">Modifikasi Terakhir</UiTableHead> 
              <UiTableHead class="text-right font-black text-background uppercase tracking-[0.2em] text-[9px]">Tindakan</UiTableHead> 
            </UiTableRow> 
          </UiTableHeader> 
          <UiTableBody class="bg-background"> 
            <UiTableRow v-for="article in articles" :key="article.id" class="group hover:bg-muted/30 border-border transition-colors"> 
              <UiTableCell class="py-5 border-b border-border"> 
                <div class="flex flex-col gap-1.5"> 
                  <div class="font-bold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-1 leading-tight">{{ article.title }}</div> 
                  <div class="flex items-center gap-2 text-[9px] text-muted-foreground font-black uppercase tracking-widest"> 
                    <span class="text-primary">/artikel/{{ article.slug }}</span> 
                  </div> 
                </div> 
              </UiTableCell> 
              <UiTableCell class="py-5 hidden md:table-cell border-b border-border"> 
                <div class="flex items-center gap-3"> 
                  <div class="w-8 h-8 bg-muted border border-border flex items-center justify-center"> 
                    <UserIcon class="w-4 h-4 text-muted-foreground" /> 
                  </div> 
                  <span class="text-xs font-bold uppercase tracking-widest truncate">{{ article.authorName || 'Administrator' }}</span> 
                </div> 
              </UiTableCell> 
              <UiTableCell class="py-5 border-b border-border"> 
                <UiBadge :variant="article.isPublished ? 'default' : 'secondary'" class="rounded-xl px-3 py-1 font-bold text-[9px] uppercase tracking-widest border border-border" :class="article.isPublished ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground'" > 
                  <span class="w-1.5 h-1.5 rounded-xl mr-2" :class="article.isPublished ? 'bg-primary animate-pulse' : 'bg-muted-foreground/50'"></span> 
                  {{ article.isPublished ? 'Terbit' : 'Draf' }} 
                </UiBadge> 
              </UiTableCell> 
              <UiTableCell class="py-5 hidden lg:table-cell border-b border-border"> 
                <div class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground"> 
                  <Calendar class="w-3.5 h-3.5 opacity-40 text-foreground" /> 
                  {{ new Date(article.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) }} 
                </div> 
              </UiTableCell> 
              <UiTableCell class="py-5 text-right border-b border-border"> 
                <div class="flex justify-end gap-2"> 
                  <UiButton as-child variant="outline" size="icon" class="rounded-xl hover:bg-primary hover:text-primary-foreground hover:border-primary w-9 h-9 transition-colors border-border" > 
                    <NuxtLink :to="`/admin/artikel/${article.slug}`" title="Edit Article"> 
                      <Pencil class="w-4 h-4" /> 
                    </NuxtLink> 
                  </UiButton> 
                  <UiButton @click="deleteArticle(article.slug)" variant="outline" size="icon" class="rounded-xl hover:bg-error hover:text-error-foreground hover:border-error w-9 h-9 transition-colors border-border" title="Delete Article" > 
                    <Trash2 class="w-4 h-4" /> 
                  </UiButton> 
                </div> 
              </UiTableCell> 
            </UiTableRow> 
          </UiTableBody> 
        </UiTable> 
      </div> 

      <div class="p-4 border-t border-border bg-muted/5 flex items-center justify-between"> 
        <p class="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Navigasi Halaman</p> 
        <div class="flex items-center gap-2"> 
          <UiButton disabled variant="outline" size="sm" class="rounded-xl border-border font-bold text-[9px] uppercase tracking-widest opacity-50">Sebelumnya</UiButton> 
          <UiButton disabled variant="outline" size="sm" class="rounded-xl border-border font-bold text-[9px] uppercase tracking-widest opacity-50">Berikutnya</UiButton> 
        </div> 
      </div> 
    </UiCard> 
  </div>
</template>