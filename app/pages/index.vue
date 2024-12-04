<template>
  <UContainer class="min-h-[inherit] flex flex-col justify-center items-center">
    <AppRelease class="mx-auto mb-4" />
    <HomeHero />
    <HomeSpecialties />
  </UContainer>
</template>

<script setup lang="ts">
usePageSEO({
  title: $t('home.meta.title'),
  description: $t('home.meta.description'),
})
</script>
