<script setup lang="ts">
import { Plus, Pencil, Trash2, Building, Save, Loader2, Search, MoreVertical, LayoutGrid, List } from 'lucide-vue-next';

definePageMeta({ layout: 'admin', middleware: 'admin-only' });
useHead({ title: 'Kelola Fasilitas - Admin PesantrenKu' });

const { data: facilities, refresh } = await useFetch('/api/facilities');
const showModal = ref(false);
const editId = ref('');
const form = reactive({ name: '', description: '' });
const loading = ref(false);

const openCreate = () => { 
  editId.value = ''; 
  form.name = ''; 
  form.description = ''; 
  showModal.value = true;
};

const openEdit = (item: any) => { 
  editId.value = item.id; 
  form.name = item.name; 
  form.description = item.description; 
  showModal.value = true;
};

const handleSave = async () => { 
  if (!form.name || !form.description) return;
  loading.value = true; 
  try { 
    if (editId.value) { 
      await $fetch(`/api/facilities/${editId.value}`, { method: 'PUT', body: form });
    } else { 
      await $fetch('/api/facilities', { method: 'POST', body: form });
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
  if (!confirm('Yakin ingin menghapus fasilitas ini?')) return;
  await $fetch(`/api/facilities/${id}`, { method: 'DELETE' });
  refresh();
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div class="space-y-1 text-left">
        <h1 class="text-3xl font-extrabold tracking-tight text-foreground">Kelola Fasilitas</h1>
        <p class="text-muted-foreground font-medium">Informasi sarana dan prasarana pendukung belajar di pesantren.</p>
      </div>
      <UiButton @click="openCreate" class="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95">
        <Plus class="size-5 mr-2" /> Tambah Fasilitas
      </UiButton>
    </div>

    <!-- Stats & Filters -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <UiCard class="md:col-span-1 border-0 shadow-sm ring-1 ring-border/5 bg-primary/5 rounded-xl p-6 flex items-center gap-4 text-left">
        <div class="size-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/10">
          <Building class="size-6" />
        </div>
        <div class="text-left">
          <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Total Fasilitas</p>
          <h3 class="text-2xl font-black mt-1">{{ facilities?.length || 0 }}</h3>
        </div>
      </UiCard>
      
      <div class="md:col-span-3 flex items-center gap-4 bg-background p-4 rounded-xl border border-border/40 shadow-sm text-left">
        <div class="relative flex-1 text-left">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <UiInput placeholder="Cari nama fasilitas..." class="pl-10 h-10 bg-muted/20 border-transparent focus-visible:ring-primary rounded-xl" />
        </div>
        <div class="flex items-center border border-border/40 rounded-lg p-1 bg-muted/10">
          <UiButton variant="ghost" size="icon" class="size-8 rounded-md bg-background shadow-sm text-primary"><List class="size-4" /></UiButton>
          <UiButton variant="ghost" size="icon" class="size-8 rounded-md opacity-40"><LayoutGrid class="size-4" /></UiButton>
        </div>
      </div>
    </div>

    <!-- Data Table Card -->
    <UiCard class="border-0 shadow-xl shadow-black/5 bg-background overflow-hidden rounded-xl ring-1 ring-border/5">
      <div v-if="!facilities || facilities.length === 0" class="text-center py-24 space-y-4">
        <div class="size-20 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4 opacity-40">
          <Building class="size-10" />
        </div>
        <h3 class="text-lg font-bold">Data Fasilitas Kosong</h3>
        <p class="text-muted-foreground max-w-xs mx-auto">Tambahkan fasilitas pendukung seperti gedung, laboratorium, atau asrama.</p>
        <UiButton variant="outline" @click="openCreate" class="mt-4 rounded-xl border-dashed"> Mulai Tambah Data </UiButton>
      </div>

      <div v-else class="overflow-x-auto text-left">
        <UiTable>
          <UiTableHeader class="bg-muted/30">
            <UiTableRow class="hover:bg-transparent border-border/20 text-left">
              <UiTableHead class="w-[300px] font-bold text-foreground h-12 uppercase tracking-tighter text-[10px] text-left">Nama Fasilitas</UiTableHead>
              <UiTableHead class="hidden md:table-cell font-bold text-foreground uppercase tracking-tighter text-[10px] text-left">Deskripsi Sarana</UiTableHead>
              <UiTableHead class="text-right font-bold text-foreground uppercase tracking-tighter text-[10px] text-right">Aksi</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-for="f in facilities" :key="f.id" class="group hover:bg-muted/20 border-border/10 transition-colors text-left">
              <UiTableCell class="py-5 text-left">
                <div class="flex items-center gap-3">
                  <div class="size-10 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                    <Building class="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span class="font-bold text-sm text-foreground">{{ f.name }}</span>
                </div>
              </UiTableCell>
              <UiTableCell class="py-5 hidden md:table-cell text-left">
                <p class="text-xs text-muted-foreground font-medium line-clamp-1 max-w-sm italic">{{ f.description }}</p>
              </UiTableCell>
              <UiTableCell class="py-5 text-right">
                <div class="flex justify-end gap-2">
                  <UiButton variant="ghost" size="icon" @click="openEdit(f)" class="rounded-xl hover:bg-primary/10 hover:text-primary size-9 transition-all" title="Edit Facility" >
                    <Pencil class="size-4" />
                  </UiButton>
                  <UiButton variant="ghost" size="icon" @click="handleDelete(f.id)" class="rounded-xl hover:bg-destructive/10 hover:text-destructive size-9 transition-all" title="Delete Facility" >
                    <Trash2 class="size-4" />
                  </UiButton>
                </div>
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </div>
      <div class="p-4 border-t border-border/20 bg-muted/5">
        <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">Menampilkan {{ facilities?.length || 0 }} Fasilitas Utama</p>
      </div>
    </UiCard>

    <!-- Dialog -->
    <UiDialog v-model:open="showModal">
      <UiDialogContent class="sm:max-w-md rounded-xl border-0 shadow-2xl p-0 overflow-hidden bg-background">
        <UiDialogHeader class="p-6 bg-muted/20 border-b border-border/10 text-left">
          <UiDialogTitle class="text-xl font-extrabold tracking-tight flex items-center gap-2">
            <Building class="size-5 text-primary" /> {{ editId ? 'Perbarui Fasilitas' : 'Tambah Fasilitas' }}
          </UiDialogTitle>
          <p class="text-xs font-medium text-muted-foreground text-left">Isi detail fasilitas untuk ditampilkan di menu sarana web.</p>
        </UiDialogHeader>
        <div class="p-8 space-y-6 text-left">
          <div class="space-y-4">
            <div class="space-y-2 text-left">
              <UiLabel class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Nama Fasilitas</UiLabel>
              <UiInput v-model="form.name" placeholder="Misal: Gedung Olahraga Terpadu" class="rounded-xl h-11 focus-visible:ring-primary border-muted/60" />
            </div>
            <div class="space-y-2 text-left">
              <UiLabel class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Deskripsi & Fungsi</UiLabel>
              <UiTextarea v-model="form.description" placeholder="Jelaskan kegunaan dan kapasitas fasilitas ini..." class="rounded-xl min-h-[120px] focus-visible:ring-primary border-muted/60 resize-none leading-relaxed italic" />
            </div>
          </div>
        </div>
        <UiDialogFooter class="p-6 bg-muted/5 border-t border-border/10 flex items-center gap-3">
          <UiButton variant="outline" @click="showModal = false" class="rounded-xl h-11 px-6 font-bold flex-1 active:scale-95 transition-all">Batal</UiButton>
          <UiButton @click="handleSave" :disabled="loading || !form.name" class="rounded-xl h-11 px-8 font-bold bg-primary hover:bg-primary/90 text-primary-foreground flex-1 shadow-lg shadow-primary/10 active:scale-95 transition-all">
            <Loader2 v-if="loading" class="size-4 mr-2 animate-spin" />
            <Save v-else class="size-4 mr-2" /> Simpan Fasilitas
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
