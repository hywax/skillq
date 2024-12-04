<template>
  <UContainer v-if="error" class="h-screen flex flex-col justify-center items-center">
    <UBadge variant="soft" class="mb-4">
      {{ error?.statusCode || 404 }}
    </UBadge>
    <h1 class="text-balance text-4xl md:text-5xl font-semibold max-w-3xl mx-auto xl:text-5xl xl:[line-height:1.125]">
      {{ title }}
    </h1>
    <p class="text-balance mx-auto text-center mt-8 max-w-2xl text-lg hidden sm:block">
      {{ message }}
    </p>
    <div class="mt-8 flex items-center justify-center gap-4">
      <UButton size="lg" @click="handleError">
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
