#!/usr/bin/env node
import { defineCommand, runMain } from 'citty'
import security from './commands/security.mjs'

const main = defineCommand({
  meta: {
    name: '@skillq/cli',
    description: 'CLI for SkillQ',
  },
  subCommands: {
    security,
  },
})

runMain(main)
