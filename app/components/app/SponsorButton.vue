<template>
  <UTooltip v-if="flat" :text="$t('app.link.sponsor')">
    <UButton color="neutral" icon="sponsor" variant="ghost" />
  </UTooltip>
  <UButton v-else color="neutral" icon="sponsor" class="px-6 py-2" :label="$t('app.link.sponsor')" />
</template>

<script setup lang="ts">
withDefaults(defineProps<{ flat?: boolean }>(), {
  flat: false,
})
</script>
