<script setup lang="ts">
import { Plus, Pencil, Trash2, Image as ImageIcon, X, Loader2, Camera, Search, Maximize2 } from 'lucide-vue-next';

definePageMeta({ layout: 'admin', middleware: 'admin-only' });
useHead({ title: 'Kelola Galeri - Admin PesantrenKu' });

const { data: galleries, refresh } = await useFetch('/api/galleries');
const showModal = ref(false);
const editId = ref('');
const form = reactive({ title: '', description: '', imageUrl: '' });
const loading = ref(false);

const openCreate = () => { 
  editId.value = ''; 
  form.title = ''; 
  form.description = ''; 
  form.imageUrl = ''; 
  showModal.value = true;
};

const openEdit = (item: any) => { 
  editId.value = item.id; 
  form.title = item.title; 
  form.description = item.description || ''; 
  form.imageUrl = item.imageUrl; 
  showModal.value = true;
};

const handleSave = async () => { 
  if (!form.title || !form.imageUrl) return;
  loading.value = true; 
  try { 
    if (editId.value) { 
      await $fetch(`/api/galleries/${editId.value}`, { method: 'PUT', body: form });
    } else { 
      await $fetch('/api/galleries', { method: 'POST', body: form });
    } 
    showModal.value = false; 
    refresh(); 
  } catch { 
    // Handle error 
  } finally { 
    loading.value = false;
  }
};

const handleDelete = async (id: string) => { 
  if (!confirm('Perhatian: Data visual akan dihapus dari sistem. Lanjutkan?')) return;
  await $fetch(`/api/galleries/${id}`, { method: 'DELETE' });
  refresh();
};

const uploadImage = async (e: Event) => { 
  const input = e.target as HTMLInputElement; 
  if (!input.files?.length) return; 
  const formData = new FormData(); 
  formData.append('file', input.files[0]); 
  try { 
    const res = await $fetch<{ url: string }>('/api/upload', { method: 'POST', body: formData }); 
    form.imageUrl = res.url; 
  } catch { 
    // Handle error 
  }
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in duration-500 relative z-10">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border pb-6">
      <div class="space-y-1">
        <h1 class="text-3xl font-black tracking-tighter text-foreground uppercase">Arsip Visual</h1>
        <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Manajemen Media Fotografi</p>
      </div>
      <UiButton @click="openCreate" class="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 px-6 rounded-xl shadow-none border border-primary transition-all active:scale-95">
        <Plus class="size-4 mr-2" /> UPLOAD MEDIA BARU
      </UiButton>
    </div>

    <div class="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="relative w-full md:w-96 flex">
        <div class="w-12 h-10 bg-muted border border-border border-r-0 flex items-center justify-center shrink-0">
           <Search class="w-4 h-4 text-muted-foreground" /> 
        </div>
        <UiInput placeholder="Cari meta-data foto..." class="h-10 bg-background border border-border focus-visible:ring-primary rounded-xl flex-1 font-mono text-xs" />
      </div>
      <div class="flex items-center gap-2 text-[9px] font-bold text-foreground uppercase tracking-[0.3em] leading-none bg-background border border-border px-4 py-2.5">
        <span class="w-2 h-2 bg-primary"></span> Terindeks: {{ galleries?.length || 0 }} File
      </div>
    </div>

    <div v-if="!galleries || galleries.length === 0" class="text-center py-32 bg-background border border-border">
      <div class="w-20 h-20 bg-muted border border-border flex items-center justify-center mx-auto mb-6">
        <ImageIcon class="size-10 text-muted-foreground/40" />
      </div>
      <h3 class="text-xl font-black tracking-tight uppercase">Direktori Kosong</h3>
      <p class="text-muted-foreground text-sm max-w-xs mx-auto mt-2 italic font-serif">Sistem tidak menemukan berkas gambar satupun.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="g in galleries" :key="g.id" class="group bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary">
        <div class="aspect-square overflow-hidden bg-muted border-b border-border relative">
          <img :src="g.imageUrl" :alt="g.title" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
          <div class="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
             <UiButton variant="outline" size="icon" class="rounded-xl border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary size-10" @click="openEdit(g)">
                <Pencil class="size-4" />
             </UiButton>
             <UiButton variant="outline" size="icon" class="rounded-xl border-border text-foreground hover:bg-error hover:text-error-foreground hover:border-error size-10" @click="handleDelete(g.id)">
                <Trash2 class="size-4" />
             </UiButton>
          </div>
        </div>
        <div class="p-4 space-y-2 bg-background">
          <h3 class="font-bold text-foreground text-sm line-clamp-1 uppercase tracking-tight">{{ g.title }}</h3>
          <p v-if="g.description" class="text-[10px] text-muted-foreground font-medium line-clamp-2 leading-relaxed italic font-serif">{{ g.description }}</p>
        </div>
      </div>
    </div>

    <UiDialog v-model:open="showModal">
      <UiDialogContent class="sm:max-w-lg rounded-xl border border-border shadow-none p-0 overflow-hidden bg-background">
        <div class="p-6 bg-muted/10 border-b border-border text-left">
          <h2 class="text-lg font-black uppercase tracking-widest flex items-center gap-3">
            <Camera class="size-5 text-primary" /> {{ editId ? 'Modifikasi Meta-data' : 'Upload Berkas Baru' }}
          </h2>
        </div>
        
        <div class="p-6 space-y-6 text-left bg-background">
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Judul Media</label>
              <UiInput v-model="form.title" placeholder="JUDUL..." class="rounded-xl h-11 border-border focus-visible:ring-primary uppercase tracking-tight font-bold" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Keterangan Teknis</label>
              <UiTextarea v-model="form.description" placeholder="Deskripsi..." class="rounded-xl min-h-[80px] border-border focus-visible:ring-primary resize-none italic font-serif" />
            </div>
            
            <div class="space-y-2 pt-2">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Berkas Visual</label>
              <div v-if="form.imageUrl" class="relative group rounded-xl overflow-hidden border border-border bg-muted aspect-video">
                <img :src="form.imageUrl" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <UiButton size="sm" variant="outline" @click="form.imageUrl = ''" class="rounded-xl border-error text-error hover:bg-error hover:text-error-foreground h-10 font-bold uppercase tracking-[0.2em] text-[9px]">
                    <X class="size-3.5 mr-2" /> Buang Berkas
                  </UiButton>
                </div>
              </div>
              <label v-else class="border-2 border-dashed border-border hover:border-primary/50 bg-muted/10 transition-all cursor-pointer flex flex-col items-center justify-center py-10 px-6 rounded-xl text-center group">
                <div class="w-12 h-12 bg-background border border-border flex items-center justify-center mb-3 group-hover:border-primary transition-colors">
                  <Plus class="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h4 class="font-black text-[10px] uppercase tracking-widest text-foreground">Lokasikan Berkas (Browse)</h4>
                <p class="text-[8px] text-muted-foreground mt-1 uppercase tracking-widest font-mono">Max 2MB</p>
                <input type="file" accept="image/*" class="hidden" @change="uploadImage" />
              </label>
            </div>
          </div>
        </div>
        
        <div class="p-6 bg-muted/10 border-t border-border flex items-center gap-3">
          <UiButton variant="outline" @click="showModal = false" class="rounded-xl h-11 px-6 font-bold uppercase tracking-widest text-[9px] flex-1 border-border">Batalkan</UiButton>
          <UiButton @click="handleSave" :disabled="loading || !form.title || !form.imageUrl" class="rounded-xl h-11 px-8 font-bold bg-primary hover:bg-primary/90 text-primary-foreground uppercase tracking-widest text-[9px] flex-1">
            <Loader2 v-if="loading" class="size-4 mr-2 animate-spin" />
            <Save v-else class="size-4 mr-2" /> Eksekusi Simpan
          </UiButton>
        </div>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>