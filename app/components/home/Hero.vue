<template>
  <div class="text-center">
    <h1 class="text-balance text-4xl md:text-5xl font-semibold max-w-3xl mx-auto xl:text-5xl xl:[line-height:1.125]">
      {{ $t('home.hero.title') }}
    </h1>
    <p class="text-balance mx-auto mt-8 max-w-2xl text-lg hidden sm:block">
      {{ $t('home.hero.description') }}
    </p>
    <div class="mt-8 flex items-center justify-center gap-4">
      <UButton
        color="primary"
        size="lg"
        icon="rocket"
        :label="$t('home.hero.action.tryNow')"
        :to="localePath('/builder')"
      />
      <UButton
        color="neutral"
        size="lg"
        variant="ghost"
        trailing-icon="chevron-right"
        target="_blank"
        rel="nofollow"
        :label="$t('home.hero.action.star')"
        :to="appConfig.links.github"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
const localePath = useLocalePath()
</script>
