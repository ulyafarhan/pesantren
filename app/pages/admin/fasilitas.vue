<script setup lang="ts">
import { Plus, Building, Search, Pencil, Trash2, MapPin, Save, Loader2, X } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'admin-only' })
useHead({ title: 'Kelola Fasilitas - Admin PesantrenKu' })

// Fetch State
const { data: facilities, refresh } = await useFetch('/api/fasilitas', { 
  key: 'admin-fasilitas-data',
  default: () => [] 
})

// Modal & Form State
const showModal = ref(false)
const editId = ref('')
const form = reactive({ name: '', description: '', location: '', imageUrl: '' })
const loading = ref(false)
const uploadLoading = ref(false)

const openCreate = () => { 
  editId.value = ''; 
  form.name = ''; 
  form.description = ''; 
  form.location = ''; 
  form.imageUrl = ''; 
  showModal.value = true;
};

const openEdit = (item: any) => { 
  // Gunakan fallback _id (MongoDB) atau id (SQL) jika struktur datanya bervariasi
  editId.value = item.id || item._id; 
  form.name = item.name; 
  form.description = item.description; 
  form.location = item.location; 
  form.imageUrl = item.imageUrl; 
  showModal.value = true;
};

const handleSave = async () => { 
  if (!form.name) return;
  loading.value = true; 
  try { 
    if (editId.value) { 
      await $fetch(`/api/fasilitas/${editId.value}`, { method: 'PUT', body: form });
    } else { 
      await $fetch('/api/fasilitas', { method: 'POST', body: form });
    } 
    showModal.value = false; 
    refresh(); 
  } catch { 
    // Error handling 
  } finally { 
    loading.value = false;
  }
};

const handleDelete = async (id: string | number) => { 
  if (!confirm('Peringatan: Yakin ingin menghapus data infrastruktur ini secara permanen?')) return 
  await $fetch(`/api/fasilitas/${id}`, { method: 'DELETE' }) 
  refresh()
}

const uploadImage = async (e: Event) => { 
  const input = e.target as HTMLInputElement; 
  if (!input.files?.length) return; 
  
  uploadLoading.value = true;
  const formData = new FormData(); 
  formData.append('file', input.files[0]); 
  
  try { 
    const res = await $fetch<{ url: string }>('/api/upload', { method: 'POST', body: formData }); 
    form.imageUrl = res.url; 
  } catch { 
    // Error handling 
  } finally {
    uploadLoading.value = false;
  }
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in duration-500 relative z-10"> 
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border pb-6"> 
      <div class="space-y-1"> 
        <h1 class="text-3xl font-black tracking-tighter text-foreground uppercase">Infrastruktur & Fasilitas</h1> 
        <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Manajemen Aset Fisik & Bangunan Pesantren</p> 
      </div> 
      <UiButton @click="openCreate" class="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 px-6 rounded-none shadow-none border border-primary transition-all active:scale-95"> 
        <Plus class="w-4 h-4 mr-2" /> TAMBAH INFRASTRUKTUR 
      </UiButton> 
    </div> 

    <UiCard class="border border-border bg-card rounded-none overflow-hidden relative shadow-none"> 
      <div class="p-6 border-b border-border bg-muted/10 flex flex-col md:flex-row gap-4 items-center justify-between"> 
        <div class="relative w-full md:w-96 flex"> 
          <div class="w-12 h-10 bg-muted border border-border border-r-0 flex items-center justify-center shrink-0">
             <Search class="w-4 h-4 text-muted-foreground" /> 
          </div>
          <UiInput placeholder="Cari nama gedung / fasilitas..." class="h-10 bg-background border border-border focus-visible:ring-primary rounded-none flex-1 font-mono text-xs" /> 
        </div> 
        <div class="flex items-center gap-2 text-[9px] font-bold text-foreground uppercase tracking-[0.3em] leading-none bg-background border border-border px-4 py-2.5"> 
          <span class="w-2 h-2 bg-primary"></span> Total: {{ facilities?.length || 0 }} Aset Terdaftar
        </div> 
      </div> 

      <div class="overflow-x-auto relative z-10"> 
        <div v-if="!facilities || facilities.length === 0" class="text-center py-32 bg-background border-b border-border"> 
          <div class="w-20 h-20 bg-muted border border-border flex items-center justify-center mx-auto mb-6"> 
            <Building class="w-10 h-10 text-muted-foreground/40" /> 
          </div> 
          <h3 class="text-xl font-black tracking-tight uppercase">Basis Data Infrastruktur Kosong</h3> 
          <p class="text-muted-foreground text-sm max-w-xs mx-auto mt-2 italic font-serif">Sistem belum mencatat data fasilitas apapun. Silakan tambahkan aset pertama.</p> 
        </div> 

        <UiTable v-else> 
          <UiTableHeader class="bg-foreground text-background"> 
            <UiTableRow class="hover:bg-foreground border-border"> 
              <UiTableHead class="w-[300px] font-black text-background h-12 uppercase tracking-[0.2em] text-[9px]">Nama Infrastruktur</UiTableHead> 
              <UiTableHead class="hidden md:table-cell font-black text-background uppercase tracking-[0.2em] text-[9px]">Keterangan Aset</UiTableHead> 
              <UiTableHead class="text-right font-black text-background uppercase tracking-[0.2em] text-[9px]">Tindakan</UiTableHead> 
            </UiTableRow> 
          </UiTableHeader> 
          <UiTableBody class="bg-background"> 
            <UiTableRow v-for="item in facilities" :key="item.id || item._id" class="group hover:bg-muted/30 border-border transition-colors"> 
              <UiTableCell class="py-5 border-b border-border"> 
                <div class="flex items-center gap-4">
                  <div class="w-16 h-16 bg-muted border border-border shrink-0 overflow-hidden">
                    <img v-if="item.imageUrl" :src="item.imageUrl" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div v-else class="w-full h-full flex items-center justify-center"><Building class="w-6 h-6 text-muted-foreground/30" /></div>
                  </div>
                  <div class="flex flex-col gap-1.5"> 
                    <div class="font-bold text-foreground text-sm group-hover:text-primary transition-colors leading-tight uppercase">{{ item.name }}</div> 
                    <div class="flex items-center gap-1.5 text-[9px] text-muted-foreground font-black uppercase tracking-widest"> 
                      <MapPin class="w-3 h-3 text-primary" /> {{ item.location || 'Area Kampus Utama' }}
                    </div> 
                  </div>
                </div> 
              </UiTableCell> 
              <UiTableCell class="py-5 hidden md:table-cell border-b border-border"> 
                 <p class="text-xs font-medium text-muted-foreground line-clamp-2 italic font-serif max-w-sm">{{ item.description || 'Tidak ada deskripsi teknis.' }}</p>
              </UiTableCell> 
              <UiTableCell class="py-5 text-right border-b border-border"> 
                <div class="flex justify-end gap-2"> 
                  <UiButton @click="openEdit(item)" variant="outline" size="icon" class="rounded-none hover:bg-primary hover:text-primary-foreground hover:border-primary w-9 h-9 transition-colors border-border" title="Modifikasi Aset" > 
                    <Pencil class="w-4 h-4" /> 
                  </UiButton> 
                  <UiButton @click="deleteFacility(item.id || item._id)" variant="outline" size="icon" class="rounded-none hover:bg-error hover:text-error-foreground hover:border-error w-9 h-9 transition-colors border-border" title="Hapus Aset" > 
                    <Trash2 class="w-4 h-4" /> 
                  </UiButton> 
                </div> 
              </UiTableCell> 
            </UiTableRow> 
          </UiTableBody> 
        </UiTable> 
      </div> 

      <div class="p-4 border-t border-border bg-muted/5 flex items-center justify-between"> 
        <p class="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Sistem Inventaris Berjalan</p> 
      </div> 
    </UiCard> 

    <UiDialog v-model:open="showModal">
      <UiDialogContent class="sm:max-w-lg rounded-none border border-border shadow-none p-0 overflow-hidden bg-background">
        <div class="p-6 bg-muted/10 border-b border-border text-left">
          <h2 class="text-lg font-black uppercase tracking-widest flex items-center gap-3">
            <Building class="size-5 text-primary" /> {{ editId ? 'Modifikasi Data Aset' : 'Registrasi Aset Baru' }}
          </h2>
        </div>
        
        <div class="p-6 space-y-6 text-left bg-background">
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div class="space-y-2">
                 <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Nama Fasilitas</label>
                 <UiInput v-model="form.name" placeholder="MASJID UTAMA..." class="rounded-none h-11 border-border focus-visible:ring-primary uppercase tracking-tight font-bold" />
               </div>
               <div class="space-y-2">
                 <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Lokasi Geografis</label>
                 <UiInput v-model="form.location" placeholder="KAMPUS 1..." class="rounded-none h-11 border-border focus-visible:ring-primary uppercase tracking-tight font-bold" />
               </div>
            </div>
            
            <div class="space-y-2">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Spesifikasi Bangunan</label>
              <UiTextarea v-model="form.description" placeholder="Jelaskan fungsi, kapasitas, atau detail fisik dari aset ini..." class="rounded-none min-h-[100px] border-border focus-visible:ring-primary resize-none italic font-serif" />
            </div>
            
            <div class="space-y-2 pt-2">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Media Dokumentasi</label>
              <div v-if="form.imageUrl" class="relative group rounded-none overflow-hidden border border-border bg-muted aspect-video">
                <img :src="form.imageUrl" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <UiButton size="sm" variant="outline" @click="form.imageUrl = ''" class="rounded-none border-error text-error hover:bg-error hover:text-error-foreground h-10 font-bold uppercase tracking-[0.2em] text-[9px]">
                    <X class="size-3.5 mr-2" /> Hapus Visual
                  </UiButton>
                </div>
              </div>
              <label v-else class="border-2 border-dashed border-border hover:border-primary/50 bg-muted/10 transition-all cursor-pointer flex flex-col items-center justify-center py-10 px-6 rounded-none text-center group">
                <div class="w-12 h-12 bg-background border border-border flex items-center justify-center mb-3 group-hover:border-primary transition-colors">
                  <Loader2 v-if="uploadLoading" class="size-5 text-primary animate-spin" />
                  <Plus v-else class="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h4 class="font-black text-[10px] uppercase tracking-widest text-foreground">Lokasikan Foto Fasilitas</h4>
                <p class="text-[8px] text-muted-foreground mt-1 uppercase tracking-widest font-mono">JPG/PNG/WEBP</p>
                <input type="file" accept="image/*" class="hidden" @change="uploadImage" :disabled="uploadLoading" />
              </label>
            </div>
          </div>
        </div>
        
        <div class="p-6 bg-muted/10 border-t border-border flex items-center gap-3">
          <UiButton variant="outline" @click="showModal = false" class="rounded-none h-11 px-6 font-bold uppercase tracking-widest text-[9px] flex-1 border-border">Batalkan</UiButton>
          <UiButton @click="handleSave" :disabled="loading || uploadLoading || !form.name" class="rounded-none h-11 px-8 font-bold bg-primary hover:bg-primary/90 text-primary-foreground uppercase tracking-widest text-[9px] flex-1">
            <Loader2 v-if="loading" class="size-4 mr-2 animate-spin" />
            <Save v-else class="size-4 mr-2" /> Eksekusi Simpan
          </UiButton>
        </div>
      </UiDialogContent>
    </UiDialog>

  </div>
</template>