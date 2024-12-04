<template>
  <UApp :locale="localeApp">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { en, ru } from '@nuxt/ui/locale'

const { locale } = useI18n()
const i18nHead = useLocaleHead()
const config = useAppConfig()

const appLocales = { en, ru }
const localeApp = computed(() => {
  return appLocales[locale.value] ?? en
})

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
    dir: i18nHead.value.htmlAttrs?.dir,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
  titleTemplate: (titleChunk) => {
    const defaultPostfix = config.app.name

    if (!titleChunk || titleChunk === defaultPostfix) {
      return defaultPostfix
    }

    return `${titleChunk} - ${defaultPostfix}`
  },
}))
</script>
