<script setup lang="ts">
import { ArrowLeft, Save, Loader2, X, FileText, Settings2, Eye, Upload, Image as ImageIcon } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'admin-only' })
useHead({ title: 'Tulis Artikel Baru - Admin PesantrenKu' })

const title = ref('')
const excerpt = ref('')
const content = ref('')
const isPublished = ref(false)
const coverImage = ref('')
const loading = ref(false)
const errorMsg = ref('')

const handleSave = async () => { 
  loading.value = true 
  errorMsg.value = '' 
  try { 
    if (!title.value || !content.value) { 
      throw new Error('Kolom Judul Utama dan Isi Konten wajib didefinisikan.') 
    } 
    await $fetch('/api/articles', { 
      method: 'POST', 
      body: { 
        title: title.value, 
        excerpt: excerpt.value, 
        content: content.value, 
        isPublished: isPublished.value, 
        coverImage: coverImage.value || null 
      } 
    }) 
    navigateTo('/admin/artikel') 
  } catch (err: any) { 
    errorMsg.value = err?.data?.statusMessage || err.message || 'Gagal menyimpan dokumen artikel.' 
  } finally { 
    loading.value = false 
  }
} 

const uploadCover = async (e: Event) => { 
  const input = e.target as HTMLInputElement 
  if (!input.files?.length) return 
  const formData = new FormData() 
  formData.append('file', input.files[0]) 
  try { 
    const res = await $fetch<{ url: string }>('/api/upload', { 
      method: 'POST', 
      body: formData 
    }) 
    coverImage.value = res.url 
  } catch { 
    errorMsg.value = 'Terjadi kesalahan sistem saat mengunggah media visual.' 
  }
}
</script>

<template> 
  <div class="space-y-8 animate-in fade-in duration-500 relative z-10"> 
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border pb-6"> 
      <div class="flex items-center gap-6"> 
        <UiButton variant="outline" size="icon" as-child class="rounded-xl border-border hover:bg-foreground hover:text-background w-12 h-12 transition-colors"> 
          <NuxtLink to="/admin/artikel"> <ArrowLeft class="w-5 h-5" /> </NuxtLink> 
        </UiButton> 
        <div class="space-y-1"> 
          <h1 class="text-3xl font-black tracking-tighter text-foreground uppercase">Tulis Dokumen Baru</h1> 
          <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Sistem Input Literasi Pesantren</p> 
        </div> 
      </div> 
      
      <div class="flex items-center gap-3 w-full md:w-auto"> 
        <UiButton variant="outline" as-child class="flex-1 md:flex-none rounded-xl border-border font-bold uppercase tracking-widest text-[9px] h-12 px-6 hover:bg-muted transition-colors"> 
          <NuxtLink to="/admin/artikel">Batalkan</NuxtLink> 
        </UiButton> 
        <UiButton @click="handleSave" :disabled="loading" class="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest text-[9px] h-12 px-8 rounded-xl border border-primary transition-all active:scale-95"> 
          <Loader2 v-if="loading" class="mr-2 w-4 h-4 animate-spin" /> 
          <Save v-else class="mr-2 w-4 h-4" /> Simpan Dokumen
        </UiButton> 
      </div> 
    </div> 

    <div v-if="errorMsg" class="p-4 bg-error/10 border border-error/20 text-error text-[10px] uppercase tracking-widest font-bold flex items-center gap-3"> 
      <X class="w-4 h-4 shrink-0" /> {{ errorMsg }} 
    </div> 

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"> 
      
      <div class="lg:col-span-2 space-y-6"> 
        <UiCard class="border border-border bg-card rounded-xl overflow-hidden shadow-none"> 
          <UiCardHeader class="p-6 border-b border-border bg-muted/10"> 
            <UiCardTitle class="text-sm font-black uppercase tracking-widest flex items-center gap-3"> 
              <FileText class="w-4 h-4 text-primary" /> Parameter Konten 
            </UiCardTitle> 
          </UiCardHeader> 
          <UiCardContent class="p-8 space-y-8 bg-background"> 
            <div class="space-y-3"> 
              <label for="title" class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Judul Publikasi</label> 
              <UiInput id="title" v-model="title" placeholder="DEFINISIKAN JUDUL DI SINI..." class="text-xl font-black h-16 border-border bg-muted/5 focus-visible:ring-primary focus-visible:border-primary rounded-xl tracking-tight uppercase" /> 
            </div> 
            
            <div class="space-y-3"> 
              <label for="excerpt" class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Ringkasan Eksekutif (Excerpt)</label> 
              <UiTextarea id="excerpt" v-model="excerpt" placeholder="Tuliskan 1-2 kalimat ringkasan yang akan muncul di kartu artikel..." class="min-h-[100px] border-border bg-muted/5 focus-visible:ring-primary rounded-xl resize-none font-serif italic text-base" /> 
            </div> 
            
            <div class="w-full h-px bg-border/50"></div> 
            
            <div class="space-y-3"> 
              <div class="flex items-center justify-between"> 
                <label for="content" class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Batang Tubuh Artikel</label> 
                <div class="text-[8px] bg-primary/10 text-primary border border-primary/20 px-2 py-1 font-black uppercase tracking-widest">Markdown & HTML Ready</div> 
              </div> 
              <UiTextarea id="content" v-model="content" placeholder="Ketikkan teks artikel secara mendalam di sini..." class="min-h-[400px] border-border bg-muted/5 focus-visible:ring-primary rounded-xl font-mono text-sm leading-relaxed p-6" /> 
            </div> 
          </UiCardContent> 
        </UiCard> 
      </div> 

      <div class="space-y-6"> 
        <UiCard class="border border-border bg-card rounded-xl overflow-hidden shadow-none"> 
          <UiCardHeader class="p-6 border-b border-border bg-muted/10"> 
            <UiCardTitle class="text-sm font-black uppercase tracking-widest flex items-center gap-3"> 
              <Settings2 class="w-4 h-4 text-primary" /> Konfigurasi Sistem 
            </UiCardTitle> 
          </UiCardHeader> 
          
          <UiCardContent class="p-6 space-y-8 bg-background"> 
            
            <div class="flex items-center justify-between p-4 bg-background border border-border"> 
              <div class="space-y-1"> 
                <div class="text-[10px] font-black uppercase tracking-widest flex items-center gap-2"> 
                  <Eye class="w-3.5 h-3.5 text-primary" /> Status Tayang 
                </div> 
                <p class="text-[8px] text-muted-foreground font-bold uppercase tracking-widest">Tampilkan ke publik</p> 
              </div> 
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="isPublished" class="sr-only peer">
                <div class="w-11 h-6 bg-muted peer-focus:outline-none border border-border peer-checked:bg-primary transition-colors duration-300 rounded-xl after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border-border after:border after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-[20px]"></div>
              </label>
            </div> 
            
            <div class="w-full h-px bg-border/50"></div> 
            
            <div class="space-y-4"> 
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Media Visual Utama</label> 
              <div v-if="coverImage" class="relative group rounded-xl overflow-hidden border border-border bg-muted aspect-video"> 
                <img :src="coverImage" alt="Cover Preview" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" /> 
                <div class="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm"> 
                  <UiButton size="sm" variant="outline" @click="coverImage = ''" class="rounded-xl border-error text-error hover:bg-error hover:text-error-foreground h-10 font-bold uppercase tracking-widest text-[9px]"> 
                    <X class="w-3.5 h-3.5 mr-2" /> Hapus Media 
                  </UiButton> 
                </div> 
              </div> 
              
              <label v-else class="border-2 border-dashed border-border bg-background hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center py-12 px-6 rounded-xl text-center group" > 
                <div class="w-12 h-12 bg-muted border border-border flex items-center justify-center mb-4 group-hover:border-primary transition-colors"> 
                  <Upload class="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" /> 
                </div> 
                <h4 class="font-black text-[10px] uppercase tracking-widest text-foreground">Pilih File Visual</h4> 
                <p class="text-[8px] text-muted-foreground mt-2 uppercase tracking-widest font-bold">JPG, PNG, WEBP (Max 2MB)</p> 
                <input type="file" accept="image/*" class="hidden" @change="uploadCover" /> 
              </label> 
            </div> 
          </UiCardContent> 
        </UiCard> 
      </div> 
    </div> 
  </div>
</template>