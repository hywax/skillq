<template>
  <UContainer class="min-h-[inherit] flex flex-col justify-center items-center text-center">
    <h1 class="text-balance text-4xl md:text-5xl font-semibold max-w-3xl mx-auto xl:text-5xl xl:[line-height:1.125]">
      {{ $t('app.coming-soon.title') }}
    </h1>
    <p class="text-balance mx-auto mt-8 max-w-2xl text-lg hidden sm:block">
      {{ $t('app.coming-soon.description') }}
    </p>
  </UContainer>
</template>

<script setup lang="ts">
usePageSEO({
  title: $t('builder.meta.title'),
  description: $t('builder.meta.description'),
})
</script>
