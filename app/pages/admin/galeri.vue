<script setup lang="ts">
import { Plus, Pencil, Trash2, Image as ImageIcon, X, Loader2, Camera, Search, MoreVertical, Maximize2 } from 'lucide-vue-next';

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
  if (!confirm('Yakin ingin menghapus foto ini dari galeri?')) return;
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
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div class="space-y-1 text-left">
        <h1 class="text-3xl font-extrabold tracking-tight text-foreground">Kelola Galeri</h1>
        <p class="text-muted-foreground font-medium">Dokumentasi momen dan kegiatan berharga di pesantren.</p>
      </div>
      <UiButton @click="openCreate" class="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95">
        <Plus class="size-5 mr-2" /> Tambah Foto Baru
      </UiButton>
    </div>

    <!-- Search & Filter Bar -->
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between bg-background p-4 rounded-xl border border-border/40 shadow-sm text-left">
      <div class="relative w-full md:w-96 text-left">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <UiInput placeholder="Cari judul foto..." class="pl-10 h-10 bg-muted/20 border-transparent focus-visible:ring-primary rounded-xl" />
      </div>
      <div class="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none bg-muted/30 px-3 py-2 rounded-lg">
        <ImageIcon class="size-3 text-primary" /> Total: {{ galleries?.length || 0 }} Media
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!galleries || galleries.length === 0" class="text-center py-32 bg-background rounded-xl border border-dashed border-muted-foreground/20 space-y-4 shadow-inner">
      <div class="size-20 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4 opacity-40">
        <ImageIcon class="size-10" />
      </div>
      <h3 class="text-lg font-bold">Galeri Kosong</h3>
      <p class="text-muted-foreground max-w-xs mx-auto">Upload foto kegiatan pesantren untuk ditampilkan di halaman publik.</p>
      <UiButton variant="outline" @click="openCreate" class="mt-4 rounded-xl border-dashed"> Upload Foto Pertama </UiButton>
    </div>

    <!-- Gallery Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-left">
      <div v-for="g in galleries" :key="g.id" class="group bg-background rounded-xl border border-border/40 shadow-sm overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-primary/5">
        <div class="aspect-[4/3] overflow-hidden bg-muted relative">
          <img :src="g.imageUrl" :alt="g.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <UiButton variant="secondary" size="icon" class="rounded-xl size-10 bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-primary border-0">
              <Maximize2 class="size-4" />
            </UiButton>
          </div>
          <div class="absolute top-2 right-2 flex gap-1">
             <UiBadge variant="secondary" class="bg-black/40 backdrop-blur-md text-white border-0 rounded-lg py-0 px-2 font-bold text-[8px] uppercase tracking-tighter">PHOTO</UiBadge>
          </div>
        </div>
        <div class="p-5 space-y-3">
          <div class="space-y-1">
            <h3 class="font-bold text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors italic tracking-tight">{{ g.title }}</h3>
            <p v-if="g.description" class="text-[11px] text-muted-foreground font-medium line-clamp-2 leading-relaxed italic">{{ g.description }}</p>
            <p v-else class="text-[11px] text-muted-foreground/40 italic">Tidak ada deskripsi</p>
          </div>
          <div class="flex items-center justify-between pt-4 border-t border-border/10">
            <div class="flex gap-1.5">
              <UiButton variant="ghost" size="icon" class="size-8 rounded-lg hover:bg-primary/10 hover:text-primary transition-all" @click="openEdit(g)">
                <Pencil class="size-3.5" />
              </UiButton>
              <UiButton variant="ghost" size="icon" class="size-8 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-all" @click="handleDelete(g.id)">
                <Trash2 class="size-3.5" />
              </UiButton>
            </div>
            <UiButton variant="ghost" size="icon" class="size-8 rounded-lg">
              <MoreVertical class="size-3.5 opacity-40" />
            </UiButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Dialog -->
    <UiDialog v-model:open="showModal">
      <UiDialogContent class="sm:max-w-lg rounded-xl border-0 shadow-2xl p-0 overflow-hidden bg-background">
        <UiDialogHeader class="p-6 bg-muted/20 border-b border-border/10 text-left">
          <UiDialogTitle class="text-xl font-extrabold tracking-tight flex items-center gap-2">
            <Camera class="size-5 text-primary" /> {{ editId ? 'Perbarui Foto' : 'Tambah Foto Baru' }}
          </UiDialogTitle>
          <p class="text-xs font-medium text-muted-foreground">Silakan isi detail foto untuk dokumentasi pesantren.</p>
        </UiDialogHeader>
        <div class="p-8 space-y-6 text-left">
          <div class="space-y-4">
            <div class="space-y-2 text-left">
              <UiLabel class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Judul Foto</UiLabel>
              <UiInput v-model="form.title" placeholder="Misal: Kegiatan Sholat Berjamaah" class="rounded-xl h-11 focus-visible:ring-primary border-muted/60" />
            </div>
            <div class="space-y-2 text-left">
              <UiLabel class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Deskripsi Singkat</UiLabel>
              <UiTextarea v-model="form.description" placeholder="Berikan sedikit konteks tentang foto ini..." class="rounded-xl min-h-[80px] focus-visible:ring-primary border-muted/60 resize-none italic" />
            </div>
            <div class="space-y-3 pt-2 text-left">
              <UiLabel class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Media Visual</UiLabel>
              <div v-if="form.imageUrl" class="relative group rounded-xl overflow-hidden border border-border/40 shadow-inner bg-muted/10 aspect-video">
                <img :src="form.imageUrl" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <UiButton size="sm" variant="destructive" @click="form.imageUrl = ''" class="rounded-xl h-9 font-bold">
                    <X class="size-4 mr-1.5" /> Hapus & Ganti
                  </UiButton>
                </div>
              </div>
              <label v-else class="border-2 border-dashed border-muted hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer flex flex-col items-center justify-center py-10 px-6 rounded-xl text-center group">
                <div class="size-12 bg-muted rounded-xl flex items-center justify-center mb-3 group-hover:scale-95 transition-all">
                  <Plus class="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h4 class="font-bold text-xs uppercase tracking-tight">Pilih File Gambar</h4>
                <p class="text-[9px] text-muted-foreground mt-1 uppercase tracking-widest font-semibold font-mono">JPG, PNG, WEBP</p>
                <input type="file" accept="image/*" class="hidden" @change="uploadImage" />
              </label>
            </div>
          </div>
        </div>
        <UiDialogFooter class="p-6 bg-muted/5 border-t border-border/10 flex items-center gap-3">
          <UiButton variant="outline" @click="showModal = false" class="rounded-xl h-11 px-6 font-bold flex-1 active:scale-95 transition-all">Batal</UiButton>
          <UiButton @click="handleSave" :disabled="loading || !form.title || !form.imageUrl" class="rounded-xl h-11 px-8 font-bold bg-primary hover:bg-primary/90 text-primary-foreground flex-1 shadow-lg shadow-primary/10 active:scale-95 transition-all">
            <Loader2 v-if="loading" class="size-4 mr-2 animate-spin" />
            <Save v-else class="size-4 mr-2" /> Simpan Data
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
