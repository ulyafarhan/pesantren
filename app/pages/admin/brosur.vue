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
  if (!confirm('Peringatan: Dokumen akan dihapus dari sistem secara permanen. Lanjutkan?')) return;
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
  <div class="space-y-8 animate-in fade-in duration-500 relative z-10">
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border pb-6">
      <div class="space-y-1">
        <h1 class="text-3xl font-black tracking-tighter text-foreground uppercase">Direktori Dokumen</h1>
        <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Manajemen Dokumen Brosur & Pendaftaran (PDF)</p>
      </div>
      <UiButton @click="openCreate" class="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 px-6 rounded-xl shadow-none border border-primary transition-all active:scale-95">
        <Plus class="size-4 mr-2" /> UPLOAD DOKUMEN BARU
      </UiButton>
    </div>

    <UiCard class="border border-border bg-card rounded-xl overflow-hidden relative shadow-none">
      
      <div class="p-6 border-b border-border bg-muted/10 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div class="relative w-full md:w-96 flex">
          <div class="w-12 h-10 bg-muted border border-border border-r-0 flex items-center justify-center shrink-0">
             <Search class="w-4 h-4 text-muted-foreground" /> 
          </div>
          <UiInput placeholder="Cari arsip judul dokumen..." class="h-10 bg-background border border-border focus-visible:ring-primary rounded-xl flex-1 font-mono text-xs" />
        </div>
        <div class="flex items-center gap-2 text-[9px] font-bold text-foreground uppercase tracking-[0.3em] leading-none bg-background border border-border px-4 py-2.5">
          <span class="w-2 h-2 bg-primary"></span> Total: {{ brochures?.length || 0 }} Berkas
        </div>
      </div>

      <div class="overflow-x-auto relative z-10">
        <div v-if="!brochures || brochures.length === 0" class="text-center py-32 bg-background border-b border-border">
          <div class="w-20 h-20 bg-muted border border-border flex items-center justify-center mx-auto mb-6">
            <FileDown class="size-10 text-muted-foreground/40" />
          </div>
          <h3 class="text-xl font-black tracking-tight uppercase">Basis Data Kosong</h3>
          <p class="text-muted-foreground text-sm max-w-xs mx-auto mt-2 italic font-serif">Belum ada dokumen PDF yang diunggah ke dalam sistem.</p>
        </div>

        <UiTable v-else>
          <UiTableHeader class="bg-foreground text-background">
            <UiTableRow class="hover:bg-foreground border-border">
              <UiTableHead class="w-[400px] font-black text-background h-12 uppercase tracking-[0.2em] text-[9px]">Identitas Berkas</UiTableHead>
              <UiTableHead class="hidden md:table-cell font-black text-background uppercase tracking-[0.2em] text-[9px]">Kode Versi / Revisi</UiTableHead>
              <UiTableHead class="font-black text-background uppercase tracking-[0.2em] text-[9px]">Format Berkas</UiTableHead>
              <UiTableHead class="text-right font-black text-background uppercase tracking-[0.2em] text-[9px]">Tindakan</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody class="bg-background">
            <UiTableRow v-for="b in brochures" :key="b.id" class="group hover:bg-muted/30 border-border transition-colors">
              <UiTableCell class="py-5 border-b border-border">
                <div class="flex items-center gap-4">
                  <div class="size-12 bg-muted border border-border flex items-center justify-center text-muted-foreground">
                    <FileText class="size-5" />
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <span class="font-bold text-foreground text-sm group-hover:text-primary transition-colors leading-tight uppercase">{{ b.title }}</span>
                    <span class="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{{ b.version || 'GENERAL RELEASE' }}</span>
                  </div>
                </div>
              </UiTableCell>
              <UiTableCell class="py-5 hidden md:table-cell border-b border-border">
                <div class="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] bg-muted/50 px-2 py-1 w-fit border border-border">
                  <Hash class="size-3" /> {{ b.version || 'V1.0.0' }}
                </div>
              </UiTableCell>
              <UiTableCell class="py-5 border-b border-border">
                <span class="px-3 py-1 font-bold text-[9px] uppercase tracking-widest border bg-red-500/10 text-red-600 border-red-500/20">
                  PDF DOC
                </span>
              </UiTableCell>
              <UiTableCell class="py-5 text-right border-b border-border">
                <div class="flex justify-end gap-2">
                  <a :href="b.fileUrl" target="_blank" title="Unduh File Berkas">
                    <UiButton variant="outline" size="icon" class="rounded-xl hover:bg-primary hover:text-primary-foreground hover:border-primary size-9 transition-colors border-border">
                      <FileDown class="size-4" />
                    </UiButton>
                  </a>
                  <UiButton variant="outline" size="icon" @click="handleDelete(b.id)" class="rounded-xl hover:bg-error hover:text-error-foreground hover:border-error size-9 transition-colors border-border" title="Hapus Permanen">
                    <Trash2 class="size-4" />
                  </UiButton>
                </div>
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </div>
      
      <div class="p-4 border-t border-border bg-muted/5 flex items-center justify-between">
         <p class="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Distribusi Digital Publik</p>
      </div>
    </UiCard>

    <UiDialog v-model:open="showModal">
      <UiDialogContent class="sm:max-w-md rounded-xl border border-border shadow-none p-0 overflow-hidden bg-background">
        <div class="p-6 bg-muted/10 border-b border-border text-left">
          <h2 class="text-lg font-black uppercase tracking-widest flex items-center gap-3">
            <Upload class="size-5 text-primary" /> {{ form.version ? 'Modifikasi Versi Dokumen' : 'Input Dokumen PDF Baru' }}
          </h2>
          <p class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-2">Batas Sistem: 5MB (.PDF)</p>
        </div>
        
        <div class="p-6 space-y-6 text-left">
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Label Berkas</label>
              <UiInput v-model="form.title" placeholder="CONTOH: BROSUR 2026..." class="rounded-xl h-11 border-border focus-visible:ring-primary uppercase tracking-tight font-bold" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Kode Versi / Revisi</label>
              <UiInput v-model="form.version" placeholder="CONTOH: V.2.0..." class="rounded-xl h-11 border-border focus-visible:ring-primary uppercase tracking-tight font-bold" />
            </div>
            
            <div class="space-y-2 pt-2">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block">Upload Dokumen Fisik</label>
              
              <div v-if="form.fileUrl" class="p-4 bg-muted/10 border border-border flex items-center justify-between group">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                    <CheckCircle2 class="size-5" />
                  </div>
                  <div class="flex flex-col text-left">
                    <span class="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">Berkas Tersimpan</span>
                    <NuxtLink :to="form.fileUrl" target="_blank" class="text-[9px] font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 mt-1"> 
                      Validasi URL <ExternalLink class="size-2.5" /> 
                    </NuxtLink>
                  </div>
                </div>
                <UiButton variant="outline" size="icon" @click="form.fileUrl = ''" class="size-9 rounded-xl border-border hover:bg-error hover:text-error-foreground hover:border-error">
                  <X class="size-4" />
                </UiButton>
              </div>
              
              <label v-else class="border-2 border-dashed border-border hover:border-primary/50 bg-muted/10 transition-all cursor-pointer flex flex-col items-center justify-center py-10 px-6 rounded-xl text-center group">
                <div class="w-12 h-12 bg-background border border-border flex items-center justify-center mb-3 group-hover:border-primary transition-colors">
                  <FileDown class="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h4 class="font-black text-[10px] uppercase tracking-widest text-foreground">Lokasikan File Komputer</h4>
                <p class="text-[8px] text-muted-foreground mt-1 uppercase tracking-widest font-mono">Ekstensi .PDF Saja</p>
                <input type="file" accept=".pdf" class="hidden" @change="uploadFile" />
              </label>
            </div>
          </div>
        </div>
        
        <div class="p-6 bg-muted/10 border-t border-border flex items-center gap-3">
          <UiButton variant="outline" @click="showModal = false" class="rounded-xl h-11 px-6 font-bold uppercase tracking-widest text-[9px] flex-1 border-border">Batalkan</UiButton>
          <UiButton @click="handleSave" :disabled="loading || !form.title || !form.fileUrl" class="rounded-xl h-11 px-8 font-bold bg-primary hover:bg-primary/90 text-primary-foreground uppercase tracking-widest text-[9px] flex-1">
            <Loader2 v-if="loading" class="size-4 mr-2 animate-spin" />
            <Save v-else class="size-4 mr-2" /> Eksekusi Simpan
          </UiButton>
        </div>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>