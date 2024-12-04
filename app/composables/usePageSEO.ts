export interface PageSEOOptions {
  title: string
  description: string
}

export function usePageSEO(options: PageSEOOptions) {
  useSeoMeta({
    title: options.title,
    description: options.description,
  })
}
