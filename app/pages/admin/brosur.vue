<script setup lang="ts">
import { Plus, FileDown, Trash2, FileText, Upload, CheckCircle2, Save, Loader2, ExternalLink, Search, Hash, X } from 'lucide-vue-next';

definePageMeta({ layout: 'admin', middleware: 'admin-only' });
useHead({ title: 'Kelola Brosur - Admin PesantrenKu' });

const { data: brochures, refresh } = await useFetch('/api/brochures');
const showModal = ref(false);
const form = reactive({ title: '', fileUrl: '', version: '' });
const loading = ref(false);

const openCreate = () => { 
  form.title = ''; 
  form.fileUrl = ''; 
  form.version = ''; 
  showModal.value = true;
};

const handleSave = async () => { 
  if (!form.title || !form.fileUrl) return;
  loading.value = true; 
  try { 
    await $fetch('/api/brochures', { method: 'POST', body: form });
    showModal.value = false; 
    refresh(); 
  } catch { 
    // Error handling 
  } finally { 
    loading.value = false;
  }
};

const handleDelete = async (id: string) => { 
  if (!confirm('Yakin ingin menghapus brosur ini?')) return;
  await $fetch(`/api/brochures/${id}`, { method: 'DELETE' });
  refresh();
};

const uploadFile = async (e: Event) => { 
  const input = e.target as HTMLInputElement; 
  if (!input.files?.length) return; 
  const formData = new FormData(); 
  formData.append('file', input.files[0]); 
  try { 
    const res = await $fetch<{ url: string }>('/api/upload', { method: 'POST', body: formData }); 
    form.fileUrl = res.url; 
  } catch { 
    // Error handling 
  }
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div class="space-y-1 text-left">
        <h1 class="text-3xl font-extrabold tracking-tight text-foreground">Kelola Brosur</h1>
        <p class="text-muted-foreground font-medium">Dokumen digital pendaftaran dan informasi pesantren dalam format PDF.</p>
      </div>
      <UiButton @click="openCreate" class="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95">
        <Plus class="size-5 mr-2" /> Tambah Brosur Baru
      </UiButton>
    </div>

    <!-- Search & Meta -->
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between bg-background p-4 rounded-xl border border-border/40 shadow-sm text-left">
      <div class="relative w-full md:w-96 text-left">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <UiInput placeholder="Cari judul brosur..." class="pl-10 h-10 bg-muted/20 border-transparent focus-visible:ring-primary rounded-xl" />
      </div>
      <div class="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none bg-muted/30 px-3 py-2 rounded-lg border border-border/10">
        <FileText class="size-3 text-red-500" /> Total Dokumentasi: {{ brochures?.length || 0 }} File
      </div>
    </div>

    <!-- Data Table Card -->
    <UiCard class="border-0 shadow-xl shadow-black/5 bg-background overflow-hidden rounded-xl ring-1 ring-border/5">
      <div v-if="!brochures || brochures.length === 0" class="text-center py-24 space-y-4">
        <div class="size-20 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4 opacity-40">
          <FileDown class="size-10" />
        </div>
        <h3 class="text-lg font-bold">Belum Ada Brosur</h3>
        <p class="text-muted-foreground max-w-xs mx-auto">Upload brosur pendaftaran terbaru agar calon wali santri dapat mengunduhnya.</p>
        <UiButton variant="outline" @click="openCreate" class="mt-4 rounded-xl border-dashed"> Unggah Dokumen PDF </UiButton>
      </div>

      <div v-else class="overflow-x-auto text-left">
        <UiTable>
          <UiTableHeader class="bg-muted/30">
            <UiTableRow class="hover:bg-transparent border-border/20 text-left">
              <UiTableHead class="w-[400px] font-bold text-foreground h-12 uppercase tracking-tighter text-[10px] text-left">Judul & Deskripsi File</UiTableHead>
              <UiTableHead class="hidden md:table-cell font-bold text-foreground uppercase tracking-tighter text-[10px] text-left">Versi / Tahun</UiTableHead>
              <UiTableHead class="font-bold text-foreground uppercase tracking-tighter text-[10px] text-left">Tipe File</UiTableHead>
              <UiTableHead class="text-right font-bold text-foreground uppercase tracking-tighter text-[10px] text-right">Tindakan</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-for="b in brochures" :key="b.id" class="group hover:bg-muted/20 border-border/10 transition-colors text-left">
              <UiTableCell class="py-5 text-left">
                <div class="flex items-center gap-3">
                  <div class="size-10 rounded-xl bg-red-500/5 text-red-500 flex items-center justify-center transition-all shadow-sm border border-red-500/10">
                    <FileText class="size-5" />
                  </div>
                  <div class="flex flex-col text-left">
                    <span class="font-bold text-sm text-foreground leading-tight italic tracking-tight">{{ b.title }}</span>
                    <span class="text-[10px] font-medium text-muted-foreground uppercase mt-0.5">{{ b.version || 'General Release' }}</span>
                  </div>
                </div>
              </UiTableCell>
              <UiTableCell class="py-5 hidden md:table-cell text-left">
                <div class="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-muted/20 px-2 py-1 rounded-md w-fit italic">
                  <Hash class="size-3" /> {{ b.version || 'v1.0' }}
                </div>
              </UiTableCell>
              <UiTableCell class="py-5 text-left">
                <UiBadge variant="outline" class="rounded-xl px-3 py-1 font-bold text-[9px] uppercase tracking-widest text-red-600 bg-red-500/5 border-red-500/20"> PDF DOCUMENT </UiBadge>
              </UiTableCell>
              <UiTableCell class="py-5 text-right">
                <div class="flex justify-end gap-2 text-right">
                  <a :href="b.fileUrl" target="_blank" title="Unduh File">
                    <UiButton variant="ghost" size="icon" class="rounded-xl hover:bg-primary/10 hover:text-primary size-9 transition-all" >
                      <FileDown class="size-4" />
                    </UiButton>
                  </a>
                  <UiButton variant="ghost" size="icon" @click="handleDelete(b.id)" class="rounded-xl hover:bg-destructive/10 hover:text-destructive size-9 transition-all" title="Hapus Brosur" >
                    <Trash2 class="size-4" />
                  </UiButton>
                </div>
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </div>
      <div class="p-4 border-t border-border/20 bg-muted/5 flex justify-center">
        <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Informasi Pendaftaran Digital PesantrenKu</p>
      </div>
    </UiCard>

    <!-- Modal Dialog -->
    <UiDialog v-model:open="showModal">
      <UiDialogContent class="sm:max-w-md rounded-xl border-0 shadow-2xl p-0 overflow-hidden bg-background">
        <UiDialogHeader class="p-6 bg-muted/20 border-b border-border/10 text-left">
          <UiDialogTitle class="text-xl font-extrabold tracking-tight flex items-center gap-2">
            <Upload class="size-5 text-primary" /> {{ form.version ? 'Update Brosur' : 'Unggah Brosur Baru' }}
          </UiDialogTitle>
          <p class="text-xs font-medium text-muted-foreground text-left">Pastikan file dalam format PDF dengan ukuran di bawah 5MB.</p>
        </UiDialogHeader>
        <div class="p-8 space-y-6 text-left">
          <div class="space-y-4">
            <div class="space-y-2 text-left">
              <UiLabel class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Judul Dokumen</UiLabel>
              <UiInput v-model="form.title" placeholder="Misal: Brosur Pendaftaran Santri 2026" class="rounded-xl h-11 focus-visible:ring-primary border-muted/60 font-semibold" />
            </div>
            <div class="space-y-2 text-left">
              <UiLabel class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Versi / Tahun Ajaran</UiLabel>
              <UiInput v-model="form.version" placeholder="Misal: 2026/2027" class="rounded-xl h-11 focus-visible:ring-primary border-muted/60" />
            </div>
            <div class="space-y-3 pt-2 text-left">
              <UiLabel class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Unggah PDF</UiLabel>
              <div v-if="form.fileUrl" class="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between group transition-all">
                <div class="flex items-center gap-3">
                  <div class="size-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-md">
                    <CheckCircle2 class="size-4" />
                  </div>
                  <div class="flex flex-col text-left">
                    <span class="text-xs font-bold text-emerald-700">File Berhasil Diunggah</span>
                    <NuxtLink :to="form.fileUrl" target="_blank" class="text-[9px] font-bold uppercase text-primary hover:underline flex items-center gap-1"> Lihat File <ExternalLink class="size-2.5" /> </NuxtLink>
                  </div>
                </div>
                <UiButton variant="ghost" size="icon" @click="form.fileUrl = ''" class="size-8 rounded-lg hover:bg-destructive/10 hover:text-destructive">
                  <X class="size-4" />
                </UiButton>
              </div>
              <label v-else class="border-2 border-dashed border-muted hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer flex flex-col items-center justify-center py-12 px-6 rounded-xl text-center group">
                <div class="size-14 bg-muted rounded-xl flex items-center justify-center mb-3 transition-all shadow-inner group-hover:scale-95">
                  <FileDown class="size-7 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h4 class="font-bold text-xs uppercase tracking-tight">Pilih File PDF</h4>
                <p class="text-[9px] text-muted-foreground mt-1 uppercase tracking-widest font-semibold font-mono">Format .PDF Saja</p>
                <input type="file" accept=".pdf" class="hidden" @change="uploadFile" />
              </label>
            </div>
          </div>
        </div>
        <UiDialogFooter class="p-6 bg-muted/5 border-t border-border/10 flex items-center gap-3">
          <UiButton variant="outline" @click="showModal = false" class="rounded-xl h-11 px-6 font-bold flex-1 transition-all active:scale-95">Batal</UiButton>
          <UiButton @click="handleSave" :disabled="loading || !form.title || !form.fileUrl" class="rounded-xl h-11 px-8 font-bold bg-primary hover:bg-primary/90 text-primary-foreground flex-1 shadow-lg shadow-primary/10 transition-all active:scale-95">
            <Loader2 v-if="loading" class="size-4 mr-2 animate-spin" />
            <Save v-else class="size-4 mr-2" /> Simpan Brosur
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
