<template>
  <UHeader :ui="{ root: 'border-[var(--color-gray-100)] dark:border-[var(--color-gray-800)]', left: 'gap-3' }">
    <template #left>
      <AppLogotype />
      <div class="rounded-full px-3 py-2 text-xs text-[var(--ui-bg-inverted)] ring-1 ring-inset ring-black/[0.08] dark:ring-white/[0.08] font-semibold">
        {{ packageJson.version }}
      </div>
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
import packageJson from '../../../package.json'

const localePath = useLocalePath()
const route = useRoute()
const tryButton = computed(() => (route?.name as string || '').includes('index__'))
</script>
