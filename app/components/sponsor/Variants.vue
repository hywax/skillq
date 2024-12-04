<template>
  <div>
    <SectionHeader
      :title="$t('sponsor.variants.title')"
      :description="$t('sponsor.variants.description')"
    />

    <div class="flex justify-center flex-wrap mt-8 gap-4">
      <div v-for="(variant, key) in variants" :key="key" class="flex max-w-md gap-4">
        <ULink :to="variant.to" class="overflow-hidden group block px-6 py-8 rounded-[calc(var(--ui-radius)*2)] border border-[var(--ui-border)] hover:bg-[var(--ui-bg-elevated)]/50 focus-visible:outline-[var(--ui-primary)] transition-colors relative" rel="nofollow" target="_blank">
          <UIcon :name="variant.icon" class="absolute top-0 right-0 opacity-5 text-[140px] font-extrabold leading-none" :style="{ background: variant.background }" />
          <p class="font-medium text-[15px] text-[var(--ui-text-highlighted)] mb-1">
            {{ variant.label }}
            <UIcon name="arrow-up-right" class="inline-block size-3 text-[var(--ui-text-dimmed)]" />
          </p>
          <p class="text-sm text-[var(--ui-text-muted)]">
            {{ variant.description }}
          </p>
        </ULink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Variant {
  icon: string
  label: string
  description: string
  to: string
  background?: string
}

defineProps<{ variants: Variant[] }>()
</script>
