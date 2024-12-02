import { readFile } from 'node:fs/promises'
import { globby } from 'globby'
import { resolve } from 'pathe'

export const iconsDir = resolve(import.meta.dirname, '../../icons')

export function getIconsList() {
  return globby(`${iconsDir}/*.svg`)
}

export function getIconContent(nameOrPath) {
  if (nameOrPath.startsWith(iconsDir)) {
    return readFile(nameOrPath, 'utf-8')
  }

  return readFile(resolve(iconsDir, `${nameOrPath}.svg`), 'utf-8')
}
