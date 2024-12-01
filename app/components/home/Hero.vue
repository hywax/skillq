<template>
  <UContainer class="py-10">
    <HomeIcons />

    <h1 class="text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[var(--ui-bg-inverted)] font-extrabold text-center max-w-4xl mx-auto mt-16">
      {{ $t('home.hero.title') }}
    </h1>

    <div class="mt-10 flex flex-wrap gap-x-6 gap-y-3 justify-center">
      <UButton
        color="neutral"
        size="lg"
        class="px-6 py-2"
        :label="$t('home.hero.action.tryNow')"
        :to="localePath('/builder')"
      />
      <UButton
        color="neutral" size="lg"
        variant="ghost"
        trailing-icon="arrow-right"
        target="_blank"
        rel="nofollow"
        :label="$t('home.hero.action.star')"
        :to="appConfig.links.github"
      />
    </div>

    <div class="mt-10 flex justify-center">
      <AppActivity />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
const localePath = useLocalePath()
</script>
