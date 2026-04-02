<script setup lang="ts">
import { Plus, Pencil, Trash2, MessageSquare, User, Quote, Save, Loader2, Search, CheckCircle2, XCircle } from 'lucide-vue-next';

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
  if (!confirm('Yakin ingin menghapus testimoni ini?')) return;
  await $fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
  refresh();
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div class="space-y-1">
        <h1 class="text-3xl font-extrabold tracking-tight text-foreground">Kelola Testimoni</h1>
        <p class="text-muted-foreground font-medium">Ulasan dan kesan pesan dari alumni, santri, serta wali santri.</p>
      </div>
      <UiButton @click="openCreate" class="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95">
        <Plus class="size-5 mr-2" /> Tambah Testimoni
      </UiButton>
    </div>

    <!-- Filters & Stats Area -->
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between bg-background p-4 rounded-xl border border-border/40 shadow-sm text-left">
      <div class="relative w-full md:w-96 text-left">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <UiInput placeholder="Cari nama atau peran..." class="pl-10 h-10 bg-muted/20 border-transparent focus-visible:ring-primary rounded-xl" />
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none bg-emerald-500/5 text-emerald-600 px-3 py-2 rounded-lg border border-emerald-500/10">
          <CheckCircle2 class="size-3" /> Aktif: {{ testimonials?.filter(t => t.isActive).length || 0 }}
        </div>
        <div class="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none bg-muted px-3 py-2 rounded-lg">
          <MessageSquare class="size-3 text-primary" /> Total: {{ testimonials?.length || 0 }}
        </div>
      </div>
    </div>

    <!-- Data Display Area -->
    <UiCard class="border-0 shadow-xl shadow-black/5 bg-background overflow-hidden rounded-xl ring-1 ring-border/5">
      <div v-if="!testimonials || testimonials.length === 0" class="text-center py-24 space-y-4">
        <div class="size-20 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4 opacity-40">
          <Quote class="size-10" />
        </div>
        <h3 class="text-lg font-bold">Belum Ada Testimoni</h3>
        <p class="text-muted-foreground max-w-xs mx-auto">Tampilkan apresiasi dari komunitas pesantren di halaman utama.</p>
        <UiButton variant="outline" @click="openCreate" class="mt-4 rounded-xl border-dashed"> Tambah Testimoni Pertama </UiButton>
      </div>

      <div v-else class="overflow-x-auto text-left">
        <UiTable>
          <UiTableHeader class="bg-muted/30">
            <UiTableRow class="hover:bg-transparent border-border/20 text-left">
              <UiTableHead class="w-[300px] font-bold text-foreground h-12 uppercase tracking-tighter text-[10px] text-left">Pemberi Ulasan</UiTableHead>
              <UiTableHead class="hidden md:table-cell font-bold text-foreground uppercase tracking-tighter text-[10px] text-left">Isi Pesan Testimoni</UiTableHead>
              <UiTableHead class="font-bold text-foreground uppercase tracking-tighter text-[10px] text-left">Status</UiTableHead>
              <UiTableHead class="text-right font-bold text-foreground uppercase tracking-tighter text-[10px] text-right">Aksi</UiTableHead>
            </UiTableRow>
          </UiTableHeader>
          <UiTableBody>
            <UiTableRow v-for="t in testimonials" :key="t.id" class="group hover:bg-muted/20 border-border/10 transition-colors text-left">
              <UiTableCell class="py-5 text-left">
                <div class="flex items-center gap-3">
                  <div class="size-10 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                    <User class="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div class="flex flex-col text-left">
                    <span class="font-bold text-sm text-foreground leading-tight">{{ t.name }}</span>
                    <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{{ t.role }}</span>
                  </div>
                </div>
              </UiTableCell>
              <UiTableCell class="py-5 hidden md:table-cell text-left">
                <div class="flex gap-2 max-w-md">
                  <Quote class="size-3 text-primary shrink-0 opacity-40 mt-1" />
                  <p class="text-xs text-muted-foreground font-medium line-clamp-2 italic leading-relaxed">{{ t.message }}</p>
                </div>
              </UiTableCell>
              <UiTableCell class="py-5 text-left">
                <UiBadge variant="outline" class="rounded-xl px-3 py-1 font-bold text-[9px] uppercase tracking-widest border-0" :class="t.isActive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-muted text-muted-foreground'" >
                  {{ t.isActive ? 'Aktif' : 'Off' }}
                </UiBadge>
              </UiTableCell>
              <UiTableCell class="py-5 text-right">
                <div class="flex justify-end gap-2">
                  <UiButton variant="ghost" size="icon" @click="openEdit(t)" class="rounded-xl hover:bg-primary/10 hover:text-primary size-9 transition-all" >
                    <Pencil class="size-4" />
                  </UiButton>
                  <UiButton variant="ghost" size="icon" @click="handleDelete(t.id)" class="rounded-xl hover:bg-destructive/10 hover:text-destructive size-9 transition-all" >
                    <Trash2 class="size-4" />
                  </UiButton>
                </div>
              </UiTableCell>
            </UiTableRow>
          </UiTableBody>
        </UiTable>
      </div>
      <div class="p-4 border-t border-border/20 bg-muted/5 flex justify-center">
        <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Manajemen Ulasan Alumni & Wali Santri</p>
      </div>
    </UiCard>

    <!-- Modal Dialog -->
    <UiDialog v-model:open="showModal">
      <UiDialogContent class="sm:max-w-md rounded-xl border-0 shadow-2xl p-0 overflow-hidden bg-background">
        <UiDialogHeader class="p-6 bg-muted/20 border-b border-border/10 text-left">
          <UiDialogTitle class="text-xl font-extrabold tracking-tight flex items-center gap-2">
            <MessageSquare class="size-5 text-primary" /> {{ editId ? 'Perbarui Testimoni' : 'Tambah Testimoni' }}
          </UiDialogTitle>
          <p class="text-xs font-medium text-muted-foreground">Silakan isi ulasan positif untuk meningkatkan kepercayaan publik.</p>
        </UiDialogHeader>
        
        <div class="p-8 space-y-6 text-left">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <UiLabel class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Nama Lengkap</UiLabel>
              <UiInput v-model="form.name" placeholder="Misal: Ahmad Zaki" class="rounded-xl h-11 focus-visible:ring-primary border-muted/60" />
            </div>
            <div class="space-y-2">
              <UiLabel class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Peran / Status</UiLabel>
              <UiInput v-model="form.role" placeholder="Misal: Alumni 2020" class="rounded-xl h-11 focus-visible:ring-primary border-muted/60" />
            </div>
          </div>
          <div class="space-y-2 text-left">
            <UiLabel class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Pesan Testimoni</UiLabel>
            <UiTextarea v-model="form.message" placeholder="Tuliskan ulasan atau doa untuk pesantren..." class="rounded-xl min-h-[120px] focus-visible:ring-primary border-muted/60 resize-none leading-relaxed italic" />
          </div>
          <div class="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border/10">
            <div class="flex items-center gap-3">
              <div :class="['size-8 rounded-lg flex items-center justify-center', form.isActive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-muted text-muted-foreground']">
                <CheckCircle2 v-if="form.isActive" class="size-4" />
                <XCircle v-else class="size-4" />
              </div>
              <div class="flex flex-col text-left">
                 <span class="text-xs font-bold leading-tight">Status Publikasi</span>
                 <span class="text-[9px] font-bold uppercase tracking-tighter text-muted-foreground">Tampilkan di halaman web</span>
              </div>
            </div>
            <UiSwitch v-model:checked="form.isActive" class="data-[state=checked]:bg-primary" />
          </div>
        </div>
        
        <UiDialogFooter class="p-6 bg-muted/5 border-t border-border/10 flex items-center gap-3">
          <UiButton variant="outline" @click="showModal = false" class="rounded-xl h-11 px-6 font-bold flex-1">Batal</UiButton>
          <UiButton @click="handleSave" :disabled="loading || !form.name || !form.role || !form.message" class="rounded-xl h-11 px-8 font-bold bg-primary hover:bg-primary/90 text-primary-foreground flex-1 shadow-lg shadow-primary/10">
            <Loader2 v-if="loading" class="size-4 mr-2 animate-spin" />
            <Save v-else class="size-4 mr-2" /> Simpan Data
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
