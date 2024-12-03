<template>
  <div v-if="stars" class="flex flex-col md:flex-row justify-center items-center gap-6">
    <UAvatarGroup size="md">
      <UAvatar
        v-for="(user, key) in users"
        :key="key"
        :alt="user.name"
        :src="user.avatar"
      />
    </UAvatarGroup>
    <div class="flex flex-col items-start">
      <div class="font-semibold flex items-center gap-2">
        <UIcon name="star" class="text-yellow-500" /> {{ $t('app.activity.label') }}
      </div>
      <div class="text-sm text-gray-500 dark:text-gray-400 leading-6">
        <i18n-t keypath="app.activity.description" tag="span" scope="global">
          <template #star>
            <span class="text-gray-900 dark:text-white">{{ $n(stars) }}</span>
          </template>
        </i18n-t>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface ActivityProps {
  stars: number
  users: {
    name: string
    avatar: string
  }[]
}

defineProps<ActivityProps>()
</script>
