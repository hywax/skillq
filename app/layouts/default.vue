<template>
  <AppHeader />

  <UMain class="min-h-[calc(100vh-var(--ui-header-height)-var(--ui-footer-height))]">
    <slot />
  </UMain>

  <AppFooter />
</template>

<script setup lang="ts">
</script>
