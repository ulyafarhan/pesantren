<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
    </div>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Artikel</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">0</div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

definePageMeta({
  layout: 'admin'
})
</script>