<template>
  <ULink :to="localePath('/')" class="flex gap-2 items-center text-[var(--ui-bg-inverted)]">
    <UIcon name="skillq-logo" class="w-7 h-7 text-[var(--ui-primary)]" />
    <span class="font-bold tracking-tight">
      SkillQ
    </span>
  </ULink>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
