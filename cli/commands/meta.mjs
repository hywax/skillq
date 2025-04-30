import { mkdir, writeFile } from 'node:fs/promises'
import { defineCommand } from 'citty'
import { consola } from 'consola'
import { resolve } from 'pathe'
import { objectChunk } from '../utils/chunk.mjs'
import { getIconsList, iconsMetaDir } from '../utils/icons.mjs'

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
    const iconsList = await getIconsList()
    const iconsMeta = new Map()

    consola.start(`Generating meta for ${iconsList.length} icons, mode: ${args.prod ? 'production' : 'development'}`)

    /**
     * Step 1. Create icon meta map
     */
    for (const icon of iconsList) {
      if (!iconsMeta.has(icon.name)) {
        iconsMeta.set(icon.name, {
          name: icon.name,
          aliases: [],
          filled: false,
          duo: false,
          variants: {},
        })
      }

      if (['light', 'dark'].includes(icon.variant)) {
        iconsMeta.get(icon.name).duo = true
      }

      if (icon.variant === 'filled') {
        iconsMeta.get(icon.name).filled = true
      }

      iconsMeta.get(icon.name).variants[[icon.variant]] = icon.content
    }

    /**
     * Step 2. Normalize meta
     */
    const perPage = 70
    const meta = {
      pages: Math.ceil(iconsMeta.size / perPage),
      total: iconsMeta.size,
      icons: [],
    }
    const icons = {}

    for (const [name, icon] of iconsMeta.entries()) {
      meta.icons.push({
        name,
        aliases: icon.aliases,
        filled: icon.filled,
        duo: icon.duo,
      })

      icons[name] = icon.variants
    }

    /**
     * Step 3. Save meta
     */
    await mkdir(iconsMetaDir, { recursive: true })
    await writeFile(resolve(iconsMetaDir, 'meta.json'), JSON.stringify(meta), 'utf-8')

    // await writeFile(resolve(iconsMetaDir, 'icons.json'), JSON.stringify(icons), 'utf-8')
    const chunks = objectChunk(icons, perPage)
    for (const [index, chunk] of chunks.entries()) {
      await writeFile(resolve(iconsMetaDir, `chunk-${index}.json`), JSON.stringify(chunk), 'utf-8')
    }

    consola.success('Done')
  },
})
