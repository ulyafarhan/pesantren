<script setup lang="ts">
import { Plus, Pencil, Trash2, GraduationCap, BookOpen, Save, Loader2, Search, School, ArrowRight } from 'lucide-vue-next';

definePageMeta({ layout: 'admin', middleware: 'admin-only' });
useHead({ title: 'Kelola Program Kelas - Admin PesantrenKu' });

const { data: programs, refresh } = await useFetch('/api/class-programs');
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
      await $fetch(`/api/class-programs/${editId.value}`, { method: 'PUT', body: form });
    } else { 
      await $fetch('/api/class-programs', { method: 'POST', body: form });
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
  if (!confirm('Yakin ingin menghapus program pendidikan ini?')) return;
  await $fetch(`/api/class-programs/${id}`, { method: 'DELETE' });
  refresh();
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <!-- Header Area -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div class="space-y-1">
        <h1 class="text-3xl font-extrabold tracking-tight text-foreground">Program Pendidikan</h1>
        <p class="text-muted-foreground font-medium">Pengaturan kurikulum dan jenjang kelas yang ditawarkan pesantren.</p>
      </div>
      <UiButton @click="openCreate" class="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95">
        <Plus class="size-5 mr-2" /> Tambah Program Baru
      </UiButton>
    </div>

    <!-- Quick Stats & Search -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UiCard class="border-0 shadow-sm ring-1 ring-border/5 bg-primary/5 rounded-xl p-6 flex items-center gap-4">
        <div class="size-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/10">
          <GraduationCap class="size-6" />
        </div>
        <div class="text-left">
          <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Jenjang Aktif</p>
          <h3 class="text-2xl font-black mt-1">{{ programs?.length || 0 }} Program</h3>
        </div>
      </UiCard>
      
      <div class="md:col-span-2 flex items-center gap-4 bg-background p-4 rounded-xl border border-border/40 shadow-sm text-left">
        <div class="relative flex-1 text-left">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <UiInput placeholder="Cari kurikulum atau program..." class="pl-10 h-10 bg-muted/20 border-transparent focus-visible:ring-primary rounded-xl font-medium" />
        </div>
        <div class="hidden sm:flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 border-l border-border/40">
          <School class="size-3 text-primary" /> PesantrenKu Academy
        </div>
      </div>
    </div>

    <!-- Programs List Card -->
    <UiCard class="border-0 shadow-xl shadow-black/5 bg-background overflow-hidden rounded-xl ring-1 ring-border/5">
      <div v-if="!programs || programs.length === 0" class="text-center py-24 space-y-4">
        <div class="size-20 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4 opacity-40">
          <BookOpen class="size-10" />
        </div>
        <h3 class="text-lg font-bold">Daftar Program Kosong</h3>
        <p class="text-muted-foreground max-w-xs mx-auto">Definisikan jenjang pendidikan seperti Tahfidz, Madrasah, atau Program Intensif Bahasa.</p>
        <UiButton variant="outline" @click="openCreate" class="mt-4 rounded-xl border-dashed"> Tambah Program Pertama </UiButton>
      </div>

      <div v-else class="overflow-x-auto text-left">
        <UiTable>
          <UiTableHeader class="bg-muted/30">
            <UiTableRow class="hover:bg-transparent border-border/20 text-left">
              <UiTableHead class="w-[350px] font-bold text-foreground h-12 uppercase tracking-tighter text-[10px] text-left">Identitas Program</UiTableHead>
              <UiTableHead class="hidden md:table-cell font-bold text-foreground uppercase tracking-tighter text-[10px] text-left">Ringkasan Kurikulum</UiTableHead>
              <UiTableHead class="text-right font-bold text-foreground uppercase tracking-tighter text-[10px] text-right">Navigasi Aksi</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-for="p in programs" :key="p.id" class="group hover:bg-muted/20 border-border/10 transition-colors text-left">
              <UiTableCell class="py-6 text-left">
                <div class="flex items-center gap-4">
                  <div class="size-12 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-all duration-300">
                    <GraduationCap class="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div class="flex flex-col gap-0.5 text-left">
                    <span class="font-extrabold text-sm text-foreground group-hover:text-primary transition-colors leading-tight">{{ p.name }}</span>
                    <span class="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded w-fit uppercase tracking-tighter">Program Pendidikan</span>
                  </div>
                </div>
              </UiTableCell>
              <UiTableCell class="py-6 hidden md:table-cell text-left">
                <div class="flex items-start gap-2 max-w-md">
                  <div class="size-1.5 rounded-xl bg-primary/40 mt-1.5 shrink-0"></div>
                  <p class="text-xs text-muted-foreground font-medium line-clamp-2 leading-relaxed italic">{{ p.description }}</p>
                </div>
              </UiTableCell>
              <UiTableCell class="py-6 text-right">
                <div class="flex justify-end gap-2">
                  <UiButton variant="ghost" size="icon" @click="openEdit(p)" class="rounded-xl hover:bg-primary/10 hover:text-primary size-9 transition-all" >
                    <Pencil class="size-4" />
                  </UiButton>
                  <UiButton variant="ghost" size="icon" @click="handleDelete(p.id)" class="rounded-xl hover:bg-destructive/10 hover:text-destructive size-9 transition-all" >
                    <Trash2 class="size-4" />
                  </UiButton>
                </div>
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </div>
      <div class="p-4 border-t border-border/20 bg-muted/5">
        <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center flex items-center justify-center gap-2">
          <ArrowRight class="size-3 text-primary" /> Manajemen Akademik Terpadu
        </p>
      </div>
    </UiCard>

    <!-- Dialog Form -->
    <UiDialog v-model:open="showModal">
      <UiDialogContent class="sm:max-w-md rounded-xl border-0 shadow-2xl p-0 overflow-hidden bg-background">
        <UiDialogHeader class="p-6 bg-muted/20 border-b border-border/10 text-left">
          <UiDialogTitle class="text-xl font-extrabold tracking-tight flex items-center gap-2">
            <GraduationCap class="size-5 text-primary" /> {{ editId ? 'Perbarui Program' : 'Tambah Program' }}
          </UiDialogTitle>
          <p class="text-xs font-medium text-muted-foreground">Silakan tentukan nama dan detail kurikulum untuk program ini.</p>
        </UiDialogHeader>
        <div class="p-8 space-y-6 text-left">
          <div class="space-y-4">
            <div class="space-y-2">
              <UiLabel class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Nama Program Pendidikan</UiLabel>
              <UiInput v-model="form.name" placeholder="Misal: Tahfidzul Qur’an Intensif" class="rounded-xl h-11 focus-visible:ring-primary border-muted/60 font-bold" />
            </div>
            <div class="space-y-2 text-left">
              <UiLabel class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Deskripsi & Kurikulum</UiLabel>
              <UiTextarea v-model="form.description" placeholder="Jelaskan detail pengajaran, target hafalan, atau jenjang yang ditempuh..." class="rounded-xl min-h-[160px] focus-visible:ring-primary border-muted/60 resize-none leading-relaxed italic" />
            </div>
          </div>
        </div>
        <UiDialogFooter class="p-6 bg-muted/5 border-t border-border/10 flex items-center gap-3">
          <UiButton variant="outline" @click="showModal = false" class="rounded-xl h-11 px-6 font-bold flex-1 transition-all active:scale-95">Batal</UiButton>
          <UiButton @click="handleSave" :disabled="loading || !form.name || !form.description" class="rounded-xl h-11 px-8 font-bold bg-primary hover:bg-primary/90 text-primary-foreground flex-1 shadow-lg shadow-primary/10 transition-all active:scale-95">
            <Loader2 v-if="loading" class="size-4 mr-2 animate-spin" />
            <Save v-else class="size-4 mr-2" /> Simpan Program
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
