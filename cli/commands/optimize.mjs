import { writeFile } from 'node:fs/promises'
import { defineCommand } from 'citty'
import { consola } from 'consola'
import { optimize } from 'svgo'
import { getIconsList } from '../utils/icons.mjs'

export default defineCommand({
  meta: {
    name: 'optimize',
    description: 'Optimize icons',
  },
  async setup() {
    const icons = await getIconsList()
    const plugins = [
      'removeDoctype',
      'removeXMLProcInst',
      'removeComments',
      'removeMetadata',
      'removeEditorsNSData',
      'cleanupAttrs',
      'mergeStyles',
      'inlineStyles',
      'minifyStyles',
      'removeUselessDefs',
      'cleanupNumericValues',
      'convertColors',
      'removeUnknownsAndDefaults',
      'removeNonInheritableGroupAttrs',
      'removeUselessStrokeAndFill',
      'removeViewBox',
      'cleanupEnableBackground',
      'removeHiddenElems',
      'removeEmptyText',
      'convertShapeToPath',
      'moveElemsAttrsToGroup',
      'moveGroupAttrsToElems',
      'collapseGroups',
      'convertPathData',
      'convertEllipseToCircle',
      'convertTransform',
      'removeEmptyAttrs',
      'removeEmptyContainers',
      'mergePaths',
      'removeUnusedNS',
      'sortAttrs',
      'sortDefsChildren',
      'removeTitle',
      'removeDesc',
    ]
    const stats = {
      optimized: 0,
      unchanged: 0,
    }

    consola.start(`Optimizing ${icons.length} icons`)

    for (const icon of icons) {
      const { data } = optimize(icon.content, { plugins })

      if (data === icon.content) {
        stats.unchanged += 1
        continue
      }

      await writeFile(icon.path, data)
      stats.optimized += 1
    }

    consola.success(`Optimized ${stats.optimized} icons, unchanged ${stats.unchanged}`)
  },
})
