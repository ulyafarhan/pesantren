<script setup lang="ts">
import { Plus, Pencil, Trash2, GraduationCap, BookOpen, Save, Loader2, Search } from 'lucide-vue-next';

definePageMeta({ layout: 'admin', middleware: 'admin-only' });
useHead({ title: 'Kelola Program - Admin PesantrenKu' });

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
  if (!confirm('Peringatan: Yakin ingin menghapus dokumen program ini?')) return;
  await $fetch(`/api/class-programs/${id}`, { method: 'DELETE' });
  refresh();
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in duration-500 relative z-10">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border pb-6">
      <div class="space-y-1">
        <h1 class="text-3xl font-black tracking-tighter text-foreground uppercase">Struktur Kurikulum</h1>
        <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Manajemen Program Pendidikan</p>
      </div>
      <UiButton @click="openCreate" class="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 px-6 rounded-xl shadow-none border border-primary transition-all active:scale-95">
        <Plus class="size-4 mr-2" /> BUAT PROGRAM BARU
      </UiButton>
    </div>

    <UiCard class="border border-border bg-card rounded-xl overflow-hidden relative shadow-none">
      <div class="p-6 border-b border-border bg-muted/10 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div class="relative w-full md:w-96 flex">
          <div class="w-12 h-10 bg-muted border border-border border-r-0 flex items-center justify-center shrink-0">
             <Search class="w-4 h-4 text-muted-foreground" /> 
          </div>
          <UiInput placeholder="Cari nama program..." class="h-10 bg-background border border-border focus-visible:ring-primary rounded-xl flex-1 font-mono text-xs" />
        </div>
        <div class="flex items-center gap-2 text-[9px] font-bold text-foreground uppercase tracking-[0.3em] leading-none bg-background border border-border px-4 py-2.5">
          <span class="w-2 h-2 bg-primary"></span> Total: {{ programs?.length || 0 }} Kurikulum
        </div>
      </div>

      <div class="overflow-x-auto relative z-10">
        <div v-if="!programs || programs.length === 0" class="text-center py-32 bg-background border-b border-border">
          <div class="w-20 h-20 bg-muted border border-border flex items-center justify-center mx-auto mb-6">
            <BookOpen class="size-10 text-muted-foreground/40" />
          </div>
          <h3 class="text-xl font-black tracking-tight uppercase">Sistem Pendidikan Kosong</h3>
          <p class="text-muted-foreground text-sm max-w-xs mx-auto mt-2 italic font-serif">Definisikan jenjang pendidikan seperti Tahfidz atau Madrasah.</p>
        </div>

        <UiTable v-else>
          <UiTableHeader class="bg-foreground text-background">
            <UiTableRow class="hover:bg-foreground border-border">
              <UiTableHead class="w-[350px] font-black text-background h-12 uppercase tracking-[0.2em] text-[9px]">Identitas Program</UiTableHead>
              <UiTableHead class="hidden md:table-cell font-black text-background uppercase tracking-[0.2em] text-[9px]">Ringkasan Kurikulum</UiTableHead>
              <UiTableHead class="text-right font-black text-background uppercase tracking-[0.2em] text-[9px]">Tindakan</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody class="bg-background">
            <UiTableRow v-for="p in programs" :key="p.id" class="group hover:bg-muted/30 border-border transition-colors">
              <UiTableCell class="py-6 border-b border-border">
                <div class="flex items-center gap-4">
                  <div class="size-12 bg-muted border border-border flex items-center justify-center">
                    <GraduationCap class="size-6 text-muted-foreground" />
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <span class="font-black text-sm text-foreground group-hover:text-primary transition-colors leading-tight uppercase">{{ p.name }}</span>
                    <span class="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Silabus Aktif</span>
                  </div>
                </div>
              </UiTableCell>
              <UiTableCell class="py-6 hidden md:table-cell border-b border-border">
                 <p class="text-xs text-muted-foreground font-medium line-clamp-2 leading-relaxed italic font-serif max-w-md">{{ p.description }}</p>
              </UiTableCell>
              <UiTableCell class="py-6 text-right border-b border-border">
                <div class="flex justify-end gap-2">
                  <UiButton variant="outline" size="icon" @click="openEdit(p)" class="rounded-xl hover:bg-primary hover:text-primary-foreground hover:border-primary size-9 transition-colors border-border">
                    <Pencil class="size-4" />
                  </UiButton>
                  <UiButton variant="outline" size="icon" @click="handleDelete(p.id)" class="rounded-xl hover:bg-error hover:text-error-foreground hover:border-error size-9 transition-colors border-border">
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
            <GraduationCap class="size-5 text-primary" /> {{ editId ? 'Perbarui Silabus' : 'Definisikan Program' }}
          </h2>
        </div>
        <div class="p-6 space-y-6 text-left">
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Nama Program</label>
              <UiInput v-model="form.name" placeholder="TAHFIDZ..." class="rounded-xl h-11 border-border focus-visible:ring-primary uppercase tracking-tight font-bold" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Deskripsi Teknis</label>
              <UiTextarea v-model="form.description" placeholder="Jelaskan detail pengajaran..." class="rounded-xl min-h-[160px] border-border focus-visible:ring-primary resize-none font-serif italic" />
            </div>
          </div>
        </div>
        <div class="p-6 bg-muted/10 border-t border-border flex items-center gap-3">
          <UiButton variant="outline" @click="showModal = false" class="rounded-xl h-11 px-6 font-bold uppercase tracking-widest text-[9px] flex-1 border-border">Batal</UiButton>
          <UiButton @click="handleSave" :disabled="loading || !form.name || !form.description" class="rounded-xl h-11 px-8 font-bold bg-primary hover:bg-primary/90 text-primary-foreground uppercase tracking-widest text-[9px] flex-1">
            <Loader2 v-if="loading" class="size-4 mr-2 animate-spin" />
            <Save v-else class="size-4 mr-2" /> Simpan Program
          </UiButton>
        </div>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>