<template>
  <div class="flex items-center justify-center gap-2 sm:gap-3">
    <div v-for="(item, key) in items" :key="key" class="flex flex-col items-center gap-2" :class="[item.style]">
      <div class="h-14 w-14 sm:h-20 sm:w-20 rounded-xl sm:rounded-2xl metal-shadow border-4 border-white dark:border-gray-700" :class="[item.background]" />
      <p class="text-[10px] sm:text-xs text-gray-500">
        {{ item.label }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  { icon: '', label: 'Skill', background: 'bg-red-500', style: '-rotate-12 translate-y-5' },
  { icon: '', label: 'Skill', background: 'bg-indigo-500', style: '-rotate-6 translate-y-1' },
  { icon: '', label: 'Skill', background: 'bg-green-500', style: '' },
  { icon: '', label: 'Skill', background: 'bg-teal-500', style: 'rotate-6 translate-y-1' },
  { icon: '', label: 'Skill', background: 'bg-purple-500', style: 'rotate-12 translate-y-5' },
]
</script>
