import type { Icons, Meta, MetaIcon } from '#shared/types'

function _useIcons() {
  const {
    execute: fetchMeta,
    status: metaStatus,
    data: meta,
  } = useFetch<Meta>('/icons/meta.json', { immediate: false, deep: false, server: false })

  const {
    execute: fetchIcons,
    status: iconsStatus,
    data: icons,
  } = useAsyncData<Icons>('icons', async () => {
    if (!meta.value?.pages) {
      return {}
    }

    const queries = Array.from({ length: meta.value?.pages }, (_, i) => $fetch<Icons>(`/icons/chunk-${i}.json`))
    const chunks = await Promise.allSettled(queries)

    return chunks
      .filter((promise) => promise.status === 'fulfilled')
      .reduce((acc, chunk) => ({ ...acc, ...chunk.value }), {})
  }, { immediate: false, deep: false, server: false, watch: [meta] })

  const getSVGIcon = (meta: MetaIcon, theme: 'light' | 'dark' = 'light') => {
    const variants = icons.value?.[meta.name]

    if (!variants) {
      // todo maybe add default icon
      return ''
    }

    // @ts-expect-error todo resolve types
    return meta.duo ? variants[theme] : variants.filled
  }

  return {
    icons,
    meta,
    metaStatus,
    iconsStatus,
    fetchIcons,
    fetchMeta,
    getSVGIcon,
  }
}

export const useIcons = createSharedComposable(_useIcons)
