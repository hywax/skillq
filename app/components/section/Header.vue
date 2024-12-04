<template>
  <div class="text-center">
    <h2 v-if="title" class="text-3xl font-semibold text-balance">
      {{ title }}
    </h2>
    <p v-if="description" class="mt-6 max-w-4xl mx-auto text-balance">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title?: string, description?: string }>()
</script>
