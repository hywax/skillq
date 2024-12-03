<template>
  <UHeader :ui="{ left: 'gap-3' }">
    <template #left>
      <AppLogotype />
    </template>
    <template #right>
      <AppTheme />
      <AppLanguage />

      <UButton v-if="tryButton" color="neutral" class="px-6 py-2 hidden md:inline-flex" :label="$t('app.link.tryNow')" :to="localePath('/builder')" />
      <AppSponsorButton v-else />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const route = useRoute()
const tryButton = computed(() => (route?.name as string || '').includes('index__'))
</script>
