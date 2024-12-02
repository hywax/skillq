import process from 'node:process'
import { defineCommand } from 'citty'
import { consola } from 'consola'
import { basename } from 'pathe'
import { getIconContent, getIconsList } from '../utils/icons.mjs'

export default defineCommand({
  meta: {
    name: 'security',
    description: 'Security check',
  },
  async setup() {
    const icons = await getIconsList()
    const detected = {
      xss: [],
      base64: [],
    }

    consola.start(`Checking icons: ${icons.length}`)

    for (const icon of icons) {
      const content = await getIconContent(icon)
      const name = basename(icon)

      if (content.includes('<script')) {
        detected.xss.push(name)
      }

      if (content.includes('base64')) {
        detected.base64.push(name)
      }
    }

    if (!detected.xss.length && !detected.base64.length) {
      consola.success('No XSS or base64 detected')
      return
    }

    if (detected.xss.length) {
      consola.error(`XSS detected in icons: ${detected.xss.join(', ')}`)
    }

    if (detected.base64.length) {
      consola.error(`Base64 detected in icons: ${detected.base64.join(', ')}`)
    }

    process.exit(1)
  },
})
