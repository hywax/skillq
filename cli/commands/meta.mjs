import { mkdir, writeFile } from 'node:fs/promises'
import { defineCommand } from 'citty'
import { consola } from 'consola'
import { resolve } from 'pathe'
import { getIconsList, iconsMetaDevDir, iconsMetaProdDir } from '../utils/icons.mjs'

export default defineCommand({
  meta: {
    name: 'meta',
    description: 'Generate meta',
  },
  args: {
    prod: {
      type: 'boolean',
      description: 'Generate dev meta',
      default: false,
    },
  },
  async setup({ args }) {
    const icons = await getIconsList()
    const iconsMap = new Map()
    const meta = {
      icons: {},
      pages: {
        total: 0,
        perPage: 100,
        count: 0,
        list: [],
      },
    }

    consola.start(`Generating meta for ${icons.length} icons, mode: ${args.prod ? 'production' : 'development'}`)

    /**
     * Step 1. Add to icons meta and create icons map
     */
    for (const icon of icons) {
      if (!meta.icons[icon.name]) {
        meta.icons[icon.name] = {
          name: icon.name,
          aliases: [],
          filled: false,
          duo: false,
          page: 0,
        }

        iconsMap.set(icon.name, {})
      }

      if (['light', 'dark'].includes(icon.variant)) {
        meta.icons[icon.name].duo = true
      }

      if (icon.variant === 'filled') {
        meta.icons[icon.name].filled = true
      }

      iconsMap.get(icon.name)[icon.variant] = icon.content
    }

    /**
     * Step 2. Add to pages
     */
    const parsedIcons = Object.values(meta.icons)

    meta.pages.total = parsedIcons.length
    meta.pages.count = Math.ceil(parsedIcons.length / meta.pages.perPage)

    for (const [index, icon] of parsedIcons.entries()) {
      const page = Math.floor(index / meta.pages.perPage)

      if (!meta.pages.list[page]) {
        meta.pages.list[page] = []
      }

      icon.page = page
      meta.pages.list[page].push(icon.name)
    }

    /**
     * Step 3. Generate pages
     */
    const pages = []
    for (const page of meta.pages.list) {
      const icons = []

      for (const icon of page) {
        icons.push(iconsMap.get(icon))
      }

      pages.push(icons)
    }

    /**
     * Step 4. Save meta
     */
    const iconsMetaDir = args.prod ? iconsMetaProdDir : iconsMetaDevDir

    await mkdir(iconsMetaDir, { recursive: true })
    await writeFile(resolve(iconsMetaDir, 'meta.json'), JSON.stringify(meta), 'utf-8')

    for (const [index, page] of pages.entries()) {
      await writeFile(resolve(iconsMetaDir, `page-${index}.json`), JSON.stringify(page), 'utf-8')
    }

    consola.success('Done')
  },
})
