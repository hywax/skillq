<template>
  <div class="w-fit group relative flex items-center gap-2 rounded-full px-3 py-1.5 text-xs ring-1 ring-inset ring-black/[0.08] dark:ring-white/[0.08]">
    <UIcon name="sparkles" class="h-4 w-4 text-[var(--ui-primary)]" />
    <span class="font-semibold">{{ $t('app.release.new') }}</span>
    <svg width="2" height="2" aria-hidden="true" class="fill-[var(--ui-bg-inverted)]">
      <circle cx="1" cy="1" r="1" />
    </svg>
    <span class="font-medium text-gray-500 dark:text-gray-400">v{{ packageJson.version }}</span>
  </div>
</template>

<script setup lang="ts">
import packageJson from '~~/package.json'
</script>
