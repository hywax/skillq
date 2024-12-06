<template>
  <div class="border border-[var(--ui-border)] bg-[#fcfcfc] dark:bg-[#1e1e1e] p-4 md:p-8 rounded-xl">
    <div class="flex flex-col sm:flex-row gap-4 justify-between border-b border-[var(--ui-border)] pb-4">
      <UInput v-model="search" :placeholder="$t('builder.overview.search.placeholder')" icon="search" />
      <UTabs v-model="type" :items="typeVariants" :content="false" size="xs" />
    </div>

    <div class="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(64px,_1fr))] grid-rows-[repeat(auto-fill,_minmax(64px,_1fr))] min-h-[280px] my-4">
      <div
        v-for="item in paginatedItems"
        :key="item.name"
        :data-selected="selectedMap.has(item.name) ? 'true' : undefined"
        class="w-full aspect-square cursor-pointer data-[selected=true]:opacity-20"
        @click="selectIcon(item)"
        v-html="getSVGIcon(item, theme)"
      />
    </div>

    <div class="flex flex-col sm:flex-row gap-4 items-center justify-between mt-8 border-t border-[var(--ui-border)] pt-4">
      <div class="text-sm text-[var(--ui-text-muted)]">
        {{ $t('builder.overview.pagination.total', { total: filteredItems.length }) }}
      </div>
      <UPagination v-model:page="page" :items-per-page="perPage" :total="filteredItems.length" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MetaIcon } from '#shared/types'

interface IconsOverviewProps {
  theme?: 'light' | 'dark'
  loading?: boolean
}

withDefaults(defineProps<IconsOverviewProps>(), {
  theme: 'light',
  loading: false,
})

const { getSVGIcon, meta } = useIcons()

const selected = defineModel<string[]>('selected')
const selectedMap = computed(() => new Map(selected.value?.map((item) => [item, true])))
function selectIcon(icon: MetaIcon) {
  if (!selected.value) {
    return
  }

  selected.value = selected.value.includes(icon.name)
    ? selected.value.filter((item) => item !== icon.name)
    : [...selected.value, icon.name]
}

const type = ref<string>('all')
const typeVariants = computed(() => [
  { label: $t('builder.overview.type.all'), value: 'all', icon: 'grid' },
  { label: $t('builder.overview.type.filled'), value: 'filled', icon: 'filled' },
  { label: $t('builder.overview.type.duo'), value: 'duo', icon: 'palette' },
])

const search = ref<string>('')
const searchDebounce = refDebounced(search, 150)

const perPage = 56
const page = ref<number>(1)

const filteredItems = computed(() => {
  if (!meta.value?.icons) {
    return []
  }

  // filter by type
  const filteredByType = meta.value.icons.filter((item) => {
    if (type.value === 'all') {
      return true
    }

    return item.duo ? type.value === 'duo' : type.value === 'filled'
  })

  // filter by search
  return filteredByType.filter((item) => {
    if (!searchDebounce.value) {
      return true
    }

    const text = item.name.toLowerCase() + item.aliases.join(' ').toLowerCase()
    return text.includes(searchDebounce.value.toLowerCase())
  })
})

const paginatedItems = computed(() => {
  return filteredItems.value.slice((page.value - 1) * perPage, page.value * perPage)
})

watch([searchDebounce, type], () => {
  if (page.value !== 1) {
    page.value = 1
  }
})
</script>
