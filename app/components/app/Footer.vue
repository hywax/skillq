<template>
  <div class="h-[var(--ui-footer-height)] bg-[var(--ui-bg)]/75 backdrop-blur">
    <USeparator class="h-px" icon="skillq-logo-outline" :ui="{ border: 'border-[var(--color-gray-100)] dark:border-[var(--color-gray-800)]' }" />

    <UContainer class="py-4 flex items-center justify-between gap-x-3">
      <div class="text-sm text-[var(--ui-text-muted)] flex items-center gap-x-1.5">
        <i18n-t keypath="app.footer.copyright" tag="p" scope="global">
          <template #author>
            <UTooltip :text="$t('app.link.personal')">
              <ULink :to="appConfig.links.personal" target="_blank" class="text-gray-900 dark:text-white">
                @hywax
              </ULink>
            </UTooltip>
          </template>
        </i18n-t>
        <p class="hidden md:inline">
          <span class="-ml-[5px]">.</span>
          {{ $t('app.footer.epistle') }}
        </p>
      </div>
      <div class="flex-1 flex items-center justify-end gap-x-1.5">
        <AppSponsorButton flat />
        <UTooltip :text="$t('app.link.github')">
          <UButton
            :aria-label="$t('app.link.github')"
            icon="github"
            :to="appConfig.links.github"
            target="_blank"
            rel="nofollow"
            color="neutral"
            variant="ghost"
          />
        </UTooltip>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
</script>
