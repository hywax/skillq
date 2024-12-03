#!/usr/bin/env node
import { defineCommand, runMain } from 'citty'
import meta from './commands/meta.mjs'
import optimize from './commands/optimize.mjs'
import security from './commands/security.mjs'

const main = defineCommand({
  meta: {
    name: '@skillq/cli',
    description: 'CLI for SkillQ',
  },
  subCommands: {
    security,
    meta,
    optimize,
  },
})

runMain(main)
