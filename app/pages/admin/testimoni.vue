<script setup lang="ts">
import { Plus, Pencil, Trash2, MessageSquare, User, Quote, Save, Loader2, Search } from 'lucide-vue-next';

definePageMeta({ layout: 'admin', middleware: 'admin-only' });
useHead({ title: 'Kelola Testimoni - Admin PesantrenKu' });

const { data: testimonials, refresh } = await useFetch('/api/testimonials');
const showModal = ref(false);
const editId = ref('');
const form = reactive({ name: '', role: '', message: '', isActive: true });
const loading = ref(false);

const openCreate = () => { 
  editId.value = ''; 
  form.name = ''; 
  form.role = ''; 
  form.message = ''; 
  form.isActive = true; 
  showModal.value = true;
};

const openEdit = (item: any) => { 
  editId.value = item.id; 
  form.name = item.name; 
  form.role = item.role; 
  form.message = item.message; 
  form.isActive = !!item.isActive; 
  showModal.value = true;
};

const handleSave = async () => { 
  if (!form.name || !form.role || !form.message) return;
  loading.value = true; 
  try { 
    if (editId.value) { 
      await $fetch(`/api/testimonials/${editId.value}`, { method: 'PUT', body: form });
    } else { 
      await $fetch('/api/testimonials', { method: 'POST', body: form });
    } 
    showModal.value = false; 
    refresh(); 
  } catch { 
    // Error handling 
  } finally { 
    loading.value = false;
  }
};

const handleDelete = async (id: string) => { 
  if (!confirm('Yakin ingin menghapus ulasan ini secara permanen?')) return;
  await $fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
  refresh();
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in duration-500 relative z-10">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border pb-6">
      <div class="space-y-1">
        <h1 class="text-3xl font-black tracking-tighter text-foreground uppercase">Tinjauan Publik</h1>
        <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Manajemen Ulasan Santri & Wali Santri</p>
      </div>
      <UiButton @click="openCreate" class="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 px-6 rounded-xl shadow-none border border-primary transition-all active:scale-95">
        <Plus class="size-4 mr-2" /> INPUT ULASAN BARU
      </UiButton>
    </div>

    <UiCard class="border border-border bg-card rounded-xl overflow-hidden relative shadow-none">
      <div class="p-6 border-b border-border bg-muted/10 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div class="relative w-full md:w-96 flex">
          <div class="w-12 h-10 bg-muted border border-border border-r-0 flex items-center justify-center shrink-0">
             <Search class="w-4 h-4 text-muted-foreground" /> 
          </div>
          <UiInput placeholder="Cari nama atau peran..." class="h-10 bg-background border border-border focus-visible:ring-primary rounded-xl flex-1 font-mono text-xs" />
        </div>
        <div class="flex items-center gap-2 text-[9px] font-bold text-foreground uppercase tracking-[0.3em] leading-none bg-background border border-border px-4 py-2.5">
          <span class="w-2 h-2 bg-emerald-500"></span> Total: {{ testimonials?.length || 0 }} Tinjauan
        </div>
      </div>

      <div class="overflow-x-auto relative z-10">
        <div v-if="!testimonials || testimonials.length === 0" class="text-center py-32 bg-background border-b border-border">
          <div class="w-20 h-20 bg-muted border border-border flex items-center justify-center mx-auto mb-6">
            <Quote class="size-10 text-muted-foreground/40" />
          </div>
          <h3 class="text-xl font-black tracking-tight uppercase">Basis Data Ulasan Kosong</h3>
          <p class="text-muted-foreground text-sm max-w-xs mx-auto mt-2 italic font-serif">Belum ada tanggapan yang tercatat dalam sistem.</p>
        </div>

        <UiTable v-else>
          <UiTableHeader class="bg-foreground text-background">
            <UiTableRow class="hover:bg-foreground border-border">
              <UiTableHead class="w-[300px] font-black text-background h-12 uppercase tracking-[0.2em] text-[9px]">Pemberi Ulasan</UiTableHead>
              <UiTableHead class="hidden md:table-cell font-black text-background uppercase tracking-[0.2em] text-[9px]">Isi Pesan</UiTableHead>
              <UiTableHead class="font-black text-background uppercase tracking-[0.2em] text-[9px]">Status Publikasi</UiTableHead>
              <UiTableHead class="text-right font-black text-background uppercase tracking-[0.2em] text-[9px]">Tindakan</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody class="bg-background">
            <UiTableRow v-for="t in testimonials" :key="t.id" class="group hover:bg-muted/30 border-border transition-colors">
              <UiTableCell class="py-5 border-b border-border">
                <div class="flex items-center gap-4">
                  <div class="size-12 bg-muted border border-border flex items-center justify-center">
                    <User class="size-5 text-muted-foreground" />
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <span class="font-bold text-foreground text-sm group-hover:text-primary transition-colors leading-tight uppercase">{{ t.name }}</span>
                    <span class="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{{ t.role }}</span>
                  </div>
                </div>
              </UiTableCell>
              <UiTableCell class="py-5 hidden md:table-cell border-b border-border">
                <p class="text-xs font-medium text-muted-foreground line-clamp-2 italic font-serif max-w-sm">{{ t.message }}</p>
              </UiTableCell>
              <UiTableCell class="py-5 border-b border-border">
                <span class="px-3 py-1 font-bold text-[9px] uppercase tracking-widest border" :class="t.isActive ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground border-border'">
                  {{ t.isActive ? 'Aktif' : 'Non-Aktif' }}
                </span>
              </UiTableCell>
              <UiTableCell class="py-5 text-right border-b border-border">
                <div class="flex justify-end gap-2">
                  <UiButton variant="outline" size="icon" @click="openEdit(t)" class="rounded-xl hover:bg-primary hover:text-primary-foreground hover:border-primary size-9 transition-colors border-border">
                    <Pencil class="size-4" />
                  </UiButton>
                  <UiButton variant="outline" size="icon" @click="handleDelete(t.id)" class="rounded-xl hover:bg-error hover:text-error-foreground hover:border-error size-9 transition-colors border-border">
                    <Trash2 class="size-4" />
                  </UiButton>
                </div>
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </div>
    </UiCard>

    <UiDialog v-model:open="showModal">
      <UiDialogContent class="sm:max-w-md rounded-xl border border-border shadow-none p-0 overflow-hidden bg-background">
        <div class="p-6 bg-muted/10 border-b border-border text-left">
          <h2 class="text-lg font-black uppercase tracking-widest flex items-center gap-3">
            <MessageSquare class="size-5 text-primary" /> {{ editId ? 'Perbarui Dokumen Ulasan' : 'Input Ulasan Baru' }}
          </h2>
        </div>
        
        <div class="p-6 space-y-6 text-left">
          <div class="grid grid-cols-1 gap-4">
            <div class="space-y-2">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Nama Lengkap</label>
              <UiInput v-model="form.name" placeholder="NAMA..." class="rounded-xl h-11 border-border focus-visible:ring-primary uppercase tracking-tight font-bold" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Peran / Status</label>
              <UiInput v-model="form.role" placeholder="ALUMNI 2020..." class="rounded-xl h-11 border-border focus-visible:ring-primary uppercase tracking-tight font-bold" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Teks Ulasan</label>
              <UiTextarea v-model="form.message" placeholder="Tuliskan ulasan..." class="rounded-xl min-h-[120px] border-border focus-visible:ring-primary resize-none font-serif italic" />
            </div>
            
            <div class="flex items-center justify-between p-4 bg-muted/5 border border-border mt-2">
               <div class="space-y-1">
                 <div class="text-[10px] font-black uppercase tracking-widest">Tampilkan Publik</div>
               </div>
               <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="form.isActive" class="sr-only peer">
                <div class="w-11 h-6 bg-muted peer-focus:outline-none border border-border peer-checked:bg-primary transition-colors duration-300 rounded-xl after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border-border after:border after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-[20px]"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div class="p-6 bg-muted/10 border-t border-border flex items-center gap-3">
          <UiButton variant="outline" @click="showModal = false" class="rounded-xl h-11 px-6 font-bold uppercase tracking-widest text-[9px] flex-1 border-border">Batalkan</UiButton>
          <UiButton @click="handleSave" :disabled="loading || !form.name || !form.role || !form.message" class="rounded-xl h-11 px-8 font-bold bg-primary hover:bg-primary/90 text-primary-foreground uppercase tracking-widest text-[9px] flex-1">
            <Loader2 v-if="loading" class="size-4 mr-2 animate-spin" />
            <Save v-else class="size-4 mr-2" /> Simpan Entitas
          </UiButton>
        </div>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>