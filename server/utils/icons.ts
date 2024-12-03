import type { Meta, MetaPage } from '#shared/types'

const storage = useStorage('meta')

export async function getIconsMeta(): Promise<Meta> {
  if (!await storage.hasItem('meta.json')) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Icons meta not found',
    })
  }

  return storage.getItem('meta.json') as Promise<Meta>
}

export async function getIconsPage(page: number): Promise<MetaPage> {
  const pageFile = `page-${page}.json`

  if (!await storage.hasItem(pageFile)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Icons page not found',
    })
  }

  return storage.getItem(pageFile) as Promise<MetaPage>
}

export async function getRandomIcons(count = 5): Promise<{ name: string, content: string }[]> {
  const meta = await getIconsMeta()
  const icons = Object.values(meta.icons).filter((icon) => icon.filled)

  /**
   * Get random icons
   */
  const randomIcons = []
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * icons.length)
    randomIcons.push(icons.splice(randomIndex, 1)[0])
  }

  /**
   * Get svg content
   */
  const randomSvg = []
  const cachePage = new Map()
  for (const icon of randomIcons) {
    if (!cachePage.has(icon.page)) {
      cachePage.set(icon.page, await getIconsPage(icon.page))
    }

    randomSvg.push({
      name: icon.name,
      content: cachePage.get(icon.page)![icon.position].filled,
    })
  }

  return randomSvg
}
