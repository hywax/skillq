<template>
  <UContainer class="py-10">
    <div v-if="icons?.length" class="flex items-center justify-center gap-2 sm:gap-3">
      <div v-for="(item, key) in icons" :key="key" class="flex flex-col items-center gap-2" :class="[item.style]">
        <div class="h-14 w-14 sm:h-20 sm:w-20 rounded-[25px] metal-shadow border-4 border-white dark:border-gray-700 overflow-hidden" v-html="item.icon" />

        <p class="text-[10px] truncate max-w-[78px] sm:text-xs text-gray-500">
          {{ item.label }}
        </p>
      </div>
    </div>

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

    <div v-if="activity" class="mt-10 flex justify-center">
      <AppActivity v-bind="activity" />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { ActivityProps } from '~/components/app/Activity.vue'

export interface HomeHeroProps {
  activity?: ActivityProps
  icons?: {
    content: string
    name: string
  }[]
}

const props = defineProps<HomeHeroProps>()

const appConfig = useAppConfig()
const localePath = useLocalePath()

const iconPositions = [
  '-rotate-12 translate-y-5',
  '-rotate-6 translate-y-1',
  '',
  'rotate-6 translate-y-1',
  'rotate-12 translate-y-5',
]

const icons = computed(() => props.icons?.map((icon, key) => ({
  icon: icon.content,
  label: icon.name,
  style: iconPositions[key],
})))
</script>
