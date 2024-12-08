<template>
  <UContainer>
    <UPage class="h-[var(--ui-main-height)]">
      <div class="h-full flex flex-col">
        <div class="flex-1 flex flex-col gap-8 justify-center items-center">
          <SectionHeader
            :title="$t('sponsor.variants.title')"
            :description="$t('sponsor.variants.description')"
          />

          <div class="w-full">
            <div class="flex justify-center gap-4">
              <div v-for="i in 5" :key="i" class="w-[64px] h-[64px] border border-dashed border-[#3a3a3a] rounded-lg" />
            </div>
          </div>

          <div class="flex gap-4">
            <UButton size="lg" icon="sparkles" @click="fetchMeta()">
              Generate Markdown
            </UButton>
            <UButton size="lg" variant="outline" icon="lucide:settings-2">
              Preference
            </UButton>
          </div>
        </div>

        <div class="flex-1">
          <IconsOverview
            v-model:selected="selectedIcons"
            :loading="isLoading"
            :icons="icons"
            :meta="meta"
            :theme="colorMode.value"
          />
        </div>
      </div>
    </UPage>
  </UContainer>
</template>

<script setup lang="ts">
usePageSEO({
  title: $t('builder.meta.title'),
  description: $t('builder.meta.description'),
})

const selectedIcons = ref<string[]>([])

const colorMode = useColorMode()

const { fetchMeta, metaStatus, iconsStatus, meta, icons } = useIcons()
const isLoading = computed(() => metaStatus.value === 'pending' || iconsStatus.value === 'pending')

onMounted(() => {
  fetchMeta()
})
</script>
