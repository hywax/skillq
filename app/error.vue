<template>
  <UContainer v-if="error" class="h-screen flex flex-col justify-center items-center">
    <p class="font-semibold">
      {{ error?.statusCode || 404 }}
    </p>
    <h1 class="text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[var(--ui-bg-inverted)] font-extrabold text-center max-w-4xl mx-auto">
      {{ title }}
    </h1>
    <p class="mt-6 text-lg text-center text-[var(--ui-text-muted)] max-w-3xl">
      {{ message }}
    </p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <UButton size="lg" color="neutral" @click="handleError">
        {{ buttonLabel }}
      </UButton>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const error = useError()

const title = computed(() => {
  return $te(`errors.status.${error.value?.statusCode}.title`) ? $t(`errors.status.${error.value?.statusCode}.title`) : $t('errors.title')
})

const message = computed(() => {
  if (error.value?.message === 'Error') {
    return error.value.message
  }

  return $te(`errors.status.${error.value?.statusCode}.message`) ? $t(`errors.status.${error.value?.statusCode}.message`) : $t('errors.message')
})

const buttonLabel = computed(() => {
  if (error.value?.statusCode === 404) {
    return $t('errors.action.home')
  }

  return $t('errors.action.refresh')
})

function handleError() {
  if (error.value?.statusCode === 404) {
    return clearError({ redirect: localePath('/') })
  }

  return reloadNuxtApp({ force: true })
}
</script>
