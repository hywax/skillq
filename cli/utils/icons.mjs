import { readFile } from 'node:fs/promises'
import { globby } from 'globby'
import { basename, resolve } from 'pathe'

export const iconsMetaProdDir = resolve(import.meta.dirname, '../../.output/meta')
export const iconsMetaDevDir = resolve(import.meta.dirname, '../../meta')
export const iconsDir = resolve(import.meta.dirname, '../../icons')

export async function getIconsList() {
  const list = await globby(`${iconsDir}/*.svg`)
  const icons = []

  for (const path of list) {
    const file = basename(path)
    const [name, variant = 'filled'] = file.replace('.svg', '').split('-')
    const content = await getIconContent(path)

    icons.push({ path, file, name, variant, content })
  }

  return icons
}

export function getIconContent(nameOrPath) {
  if (nameOrPath.startsWith(iconsDir)) {
    return readFile(nameOrPath, 'utf-8')
  }

  return readFile(resolve(iconsDir, `${nameOrPath}.svg`), 'utf-8')
}
