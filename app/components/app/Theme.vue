<template>
  <ClientOnly v-if="!colorMode?.forced">
    <UTooltip :text="areaLabel">
      <UButton
        :icon="isDark ? 'dark' : 'light'"
        :aria-label="areaLabel"
        variant="ghost"
        color="neutral"
        @click="isDark = !isDark"
      />
    </UTooltip>

    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

const areaLabel = computed(() => isDark.value ? t('app.theme.light') : t('app.theme.dark'))
</script>
