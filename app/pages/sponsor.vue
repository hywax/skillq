<template>
  <UContainer class="py-16 space-y-16">
    <SponsorVariants :variants="variants" />
    <SponsorCommunity :users="sponsor?.community.users" />
  </UContainer>
</template>

<script setup lang="ts">
usePageSEO({
  title: $t('sponsor.meta.title'),
  description: $t('sponsor.meta.description'),
})

const appConfig = useAppConfig()
const { data: sponsor } = await useFetch('/api/sponsor')
const variants = [
  {
    icon: 'skillq-coffee',
    to: appConfig.links.kofi,
    label: $t('sponsor.variants.kofi.label'),
    description: $t('sponsor.variants.kofi.description'),
    background: 'var(--ui-primary)',
  },
  {
    icon: 'boosty',
    to: appConfig.links.boosty,
    label: $t('sponsor.variants.boosty.label'),
    description: $t('sponsor.variants.boosty.description'),
    background: 'oklch(0.67 0.19 38.38)',
  },
  {
    icon: 'github',
    to: appConfig.links.github,
    label: $t('sponsor.variants.github.label'),
    description: $t('sponsor.variants.github.description'),
  },
]
</script>
