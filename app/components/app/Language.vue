<template>
  <UDropdownMenu :items="items" :disabled="isDisabled">
    <UButton icon="language" color="neutral" variant="ghost" :aria-label="$t('app.language.label')" />
  </UDropdownMenu>
</template>

<script setup lang="ts">
const error = useError()
const { locales, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isDisabled = computed(() => !!error.value)

const items = computed(() => {
  return locales.value.map((loc) => {
    return {
      label: loc.name || loc.code,
      icon: `flag-${loc.code}`,
      to: switchLocalePath(loc.code),
      disabled: loc.code === locale.value || isDisabled.value,
    }
  })
})
</script>
