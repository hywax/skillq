<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-dots',
  },
})
</script>
