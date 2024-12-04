<template>
  <div v-if="users?.length">
    <SectionHeader
      :title="$t('sponsor.community.title')"
      :description="$t('sponsor.community.description')"
    />

    <div class="flex justify-center flex-wrap gap-3 mt-8 max-w-2xl mx-auto">
      <UAvatar
        v-for="user in users"
        :key="user.name"
        :alt="user.name"
        :src="user.avatar"
        size="3xl"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  type: string
  name: string
  avatar: string
}

defineProps<{ users?: User[] }>()
</script>
