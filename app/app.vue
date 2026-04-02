<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - PesantrenKu` : 'PesantrenKu - Pusat Pendidikan Islami Modern';
  },
  htmlAttrs: {
    lang: 'id'
  },
  meta: [
    { name: 'description', content: 'PesantrenKu adalah pusat pendidikan Islam yang modern, inklusif, dan mengedepankan pembentukan adab serta ilmu pengetahuan berlandaskan nilai salafush shalih.' },
    { name: 'keywords', content: 'pesantren, islamic boarding school, pendidikan islam, sekolah islam' },
    { property: 'og:title', content: 'PesantrenKu - Pendidikan Islami Modern' },
    { property: 'og:description', content: 'Pusat pendidikan Islam yang modern, inklusif, dan mengedepankan adab serta ilmu pengetahuan.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>