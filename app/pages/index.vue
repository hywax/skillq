<template>
  <HomeHero
    class="min-h-[inherit] flex flex-col justify-center items-center"
    :activity="data?.activity"
    :icons="data?.icons"
  />
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/home')
</script>
