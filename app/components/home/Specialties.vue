<template>
  <div class="-mx-6 relative mt-8 sm:mt-12 max-w-xl sm:mx-auto">
    <div class="absolute inset-0 -top-8 left-1/2 -z-20 h-56 w-full -translate-x-1/2 dark:opacity-10 [background-image:linear-gradient(to_bottom,transparent_98%,theme(colors.gray.200/75%)_98%),linear-gradient(to_right,transparent_94%,_theme(colors.gray.200/75%)_94%)] [background-size:16px_35px] [mask:radial-gradient(black,transparent_95%)]" />
    <div class="absolute top-12 inset-x-0 w-2/3 h-1/3 -z-[1] rounded-full bg-[var(--ui-primary)] dark:bg-white/20 mx-auto blur-3xl" />

    <ClientOnly>
      <Vue3Marquee
        v-for="key in rows"
        :key="key"
        :direction="key % 2 === 0 ? 'reverse' : 'normal'"
        :duration="180"
        class="marquee-container"
      >
        <div
          v-for="item in items"
          :key="item"
          class="metal-shadow bg-white dark:bg-[var(--ui-bg-elevated)] font-medium" :class="[itemClass]"
        >
          {{ item }}
        </div>
      </Vue3Marquee>

      <template #fallback>
        <div class="marquee-container">
          <div v-for="key in rows" :key="key" class="flex">
            <USkeleton class="h-10 w-[50px]" :class="[itemClass]" />
            <USkeleton class="h-10 w-[175px]" :class="[itemClass]" />
            <USkeleton class="h-10 w-[90px]" :class="[itemClass]" />
            <USkeleton class="h-10 w-[200px]" :class="[itemClass]" />
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
import { Vue3Marquee } from 'vue3-marquee'

const itemClass = 'rounded-lg px-3 py-2 mx-2 my-2'

const rows = 2
const items = [
  'Frontend Engineer',
  'Backend Architect',
  'Fullstack Specialist',
  'DevOps Engineer',
  'Data Analyst',
  'Machine Learning Expert',
  'Mobile Applications Specialist',
  'iOS Engineer',
  'Android Specialist',
  'Game Programmer',
  'UI/UX Designer',
  'Product Owner',
  'QA Analyst',
  'Test Automation Engineer',
  'Cybersecurity Analyst',
  'Cloud Solutions Architect',
  'Blockchain Specialist',
  'Embedded Systems Programmer',
  'Network Engineer',
  'Database Manager',
  'IT Support Technician',
  'Technical Documentation Specialist',
  'Solutions Architect',
  'Site Reliability Engineer (SRE)',
  'Systems Consultant',
  'Scrum Coordinator',
  'IT Project Coordinator',
  'SEO Strategist',
  'AR/VR Specialist',
  'Tech Evangelist',
]
</script>

<style scoped>
.marquee-container {
  --mask: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0,
    rgba(0, 0, 0, 0) 5%,
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0) 95%,
    rgba(0, 0, 0, 0) 0
  )
  100% 50% / 100% 100%;

  -webkit-mask: var(--mask);
  mask: var(--mask);
}
</style>
