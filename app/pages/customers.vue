<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { upperFirst } from 'scule'
import { getPaginationRowModel } from '@tanstack/table-core'
import type { Row } from '@tanstack/table-core'
import type { User } from '~/types'

const UAvatar = resolveComponent('UAvatar')
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')

const toast = useToast()
const table = useTemplateRef('table')

const columnFilters = ref([{ id: 'email', value: '' }])
const columnVisibility = ref()
const rowSelection = ref({ 1: true })

const { data, status } = await useFetch<User[]>('/api/customers', { lazy: true })

function getRowItems(row: Row<User>) {
  return [
    { type: 'label', label: 'Tindakan' },
    { label: 'Salin ID Pengguna', icon: 'i-lucide-copy', onSelect() {
        navigator.clipboard.writeText(row.original.id.toString())
        toast.add({ title: 'Disalin', description: 'ID Pengguna disalin ke clipboard' })
      }
    },
    { type: 'separator' },
    { label: 'Detail Pengguna', icon: 'i-lucide-list' },
    { label: 'Riwayat Transaksi', icon: 'i-lucide-wallet' },
    { type: 'separator' },
    { label: 'Hapus Data', icon: 'i-lucide-trash', color: 'error', onSelect() {
        toast.add({ title: 'Dihapus', description: 'Data pengguna telah dihapus secara permanen.' })
      }
    }
  ]
}

const columns: TableColumn<User>[] = [
  {
    id: 'select',
    header: ({ table }) => h(UCheckbox, {
      'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
      'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Pilih Semua',
      'class': 'rounded-xl border-border'
    }),
    cell: ({ row }) => h(UCheckbox, {
      'modelValue': row.getIsSelected(),
      'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
      'ariaLabel': 'Pilih baris',
      'class': 'rounded-xl border-border'
    })
  },
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'name',
    header: 'Nama',
    cell: ({ row }) => h('div', { class: 'flex items-center gap-4' }, [
      h(UAvatar, { ...row.original.avatar, size: 'lg', ui: { rounded: 'rounded-xl border border-border' } }),
      h('div', undefined, [
        h('p', { class: 'font-black tracking-tight text-foreground uppercase text-xs' }, row.original.name),
        h('p', { class: 'text-[9px] font-bold tracking-widest text-muted-foreground' }, `@${row.original.name}`)
      ])
    ])
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return h(UButton, {
        color: 'neutral', variant: 'ghost', label: 'Surel Elektronik',
        icon: isSorted ? (isSorted === 'asc' ? 'i-lucide-arrow-up-narrow-wide' : 'i-lucide-arrow-down-wide-narrow') : 'i-lucide-arrow-up-down',
        class: '-mx-2.5 rounded-xl font-bold uppercase tracking-widest text-[9px] hover:bg-muted',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    }
  },
  { accessorKey: 'location', header: 'Lokasi' },
  {
    accessorKey: 'status',
    header: 'Status',
    filterFn: 'equals',
    cell: ({ row }) => {
      const color = { subscribed: 'success' as const, unsubscribed: 'error' as const, bounced: 'warning' as const }[row.original.status]
      return h(UBadge, { class: 'uppercase tracking-widest font-black text-[8px] rounded-xl border border-current', variant: 'subtle', color }, () => row.original.status)
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => h('div', { class: 'text-right' }, h(UDropdownMenu, { content: { align: 'end' }, items: getRowItems(row) }, () =>
      h(UButton, { icon: 'i-lucide-ellipsis-vertical', color: 'neutral', variant: 'ghost', class: 'ml-auto rounded-xl hover:bg-muted' })
    ))
  }
]

const statusFilter = ref('all')
watch(() => statusFilter.value, (newVal) => {
  if (!table?.value?.tableApi) return
  const statusColumn = table.value.tableApi.getColumn('status')
  if (!statusColumn) return
  statusColumn.setFilterValue(newVal === 'all' ? undefined : newVal)
})

const email = computed({
  get: (): string => (table.value?.tableApi?.getColumn('email')?.getFilterValue() as string) || '',
  set: (value: string) => table.value?.tableApi?.getColumn('email')?.setFilterValue(value || undefined)
})

const pagination = ref({ pageIndex: 0, pageSize: 10 })
</script>

<template>
  <UDashboardPanel id="customers" class="bg-background relative overflow-hidden rounded-xl border-l border-border z-10">
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

    <template #header>
      <UDashboardNavbar title="Data Pengguna" class="border-b border-border bg-background/90 backdrop-blur-sm relative z-10 font-black uppercase tracking-widest">
        <template #leading>
          <UDashboardSidebarCollapse class="rounded-xl border border-border" />
        </template>
        <template #right>
          <CustomersAddModal class="rounded-xl border border-border" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center justify-between gap-4 relative z-10 mb-6 bg-card p-4 border border-border">
        <UInput
          v-model="email"
          class="max-w-sm w-full"
          icon="i-lucide-search"
          placeholder="Cari surel..."
          :ui="{ base: 'rounded-xl border-border focus:ring-primary h-10', icon: { trailing: { pointerEvents: 'none' } } }"
        />

        <div class="flex flex-wrap items-center gap-3">
          <CustomersDeleteModal :count="table?.tableApi?.getFilteredSelectedRowModel().rows.length">
            <UButton
              v-if="table?.tableApi?.getFilteredSelectedRowModel().rows.length"
              label="Hapus Pilihan" color="error" variant="subtle" icon="i-lucide-trash"
              class="rounded-xl font-bold uppercase tracking-widest text-[9px] h-10 border border-error"
            >
              <template #trailing>
                <UKbd class="rounded-xl bg-error/20 text-error">{{ table?.tableApi?.getFilteredSelectedRowModel().rows.length }}</UKbd>
              </template>
            </UButton>
          </CustomersDeleteModal>

          <USelect
            v-model="statusFilter"
            :items="[
              { label: 'Semua', value: 'all' },
              { label: 'Aktif', value: 'subscribed' },
              { label: 'Nonaktif', value: 'unsubscribed' },
              { label: 'Tertunda', value: 'bounced' }
            ]"
            :ui="{ base: 'rounded-xl border-border h-10 focus:ring-primary', trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
            placeholder="Saring status"
            class="min-w-[140px] font-bold uppercase tracking-widest text-[9px]"
          />
          <UDropdownMenu
            :items="table?.tableApi?.getAllColumns().filter((c: any) => c.getCanHide()).map((c: any) => ({ label: upperFirst(c.id), type: 'checkbox' as const, checked: c.getIsVisible(), onUpdateChecked(ch: boolean) { table?.tableApi?.getColumn(c.id)?.toggleVisibility(!!ch) }, onSelect(e?: Event) { e?.preventDefault() } }))"
            :content="{ align: 'end' }"
          >
            <UButton label="Tampilan" color="neutral" variant="outline" trailing-icon="i-lucide-settings-2" class="rounded-xl font-bold uppercase tracking-widest text-[9px] h-10 border-border" />
          </UDropdownMenu>
        </div>
      </div>

      <div class="bg-card border border-border relative z-10 overflow-x-auto shadow-xl">
        <UTable
          ref="table"
          v-model:column-filters="columnFilters"
          v-model:column-visibility="columnVisibility"
          v-model:row-selection="rowSelection"
          v-model:pagination="pagination"
          :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
          class="shrink-0 w-full"
          :data="data"
          :columns="columns"
          :loading="status === 'pending'"
          :ui="{
            base: 'table-auto w-full border-collapse bg-background',
            thead: '[&>tr]:bg-muted/30 [&>tr]:after:content-none text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground',
            tbody: '[&>tr]:hover:bg-muted/10 transition-colors',
            th: 'py-4 px-4 rounded-xl border-b border-border text-left',
            td: 'border-b border-border/50 py-4 px-4',
            separator: 'h-0 border-0'
          }"
        />
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-border p-4 mt-6 relative z-10">
        <div class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <span class="text-primary">{{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }}</span> dari
          {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} baris dipilih.
        </div>

        <UPagination
          :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="table?.tableApi?.getFilteredRowModel().rows.length"
          @update:page="(p: number) => table?.tableApi?.setPageIndex(p - 1)"
          :ui="{ wrapper: 'gap-1', base: 'rounded-xl border border-border w-8 h-8 flex items-center justify-center font-bold text-[10px]' }"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>