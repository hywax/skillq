<template>
  <UHeader :ui="{ left: 'gap-3' }">
    <template #left>
      <AppLogotype />
    </template>
    <UNavigationMenu :items="links" variant="link" />
    <template #right>
      <AppTheme />
      <AppLanguage />
    </template>

    <template #content>
      <UNavigationMenu orientation="vertical" :items="links" class="-ml-2.5" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const config = useAppConfig()
const localePath = useLocalePath()

const links = [
  {
    label: $t('app.header.menu.builder'),
    to: localePath('/builder'),
  },
  {
    label: $t('app.header.menu.sponsor'),
    to: localePath('/sponsor'),
  },
  {
    label: $t('app.header.menu.github'),
    to: config.links.github,
    target: '_blank',
  },
  {
    label: $t('app.header.menu.releases'),
    to: `${config.links.github}/releases`,
    target: '_blank',
  },
]
</script>
