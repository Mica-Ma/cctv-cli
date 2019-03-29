const Table = require('cli-table3')
const chalk = require('chalk')
const semver = require('semver')
import { clearConsole, log } from './logger';
import config, { versions, getVersion } from '../config';

export const banner = async (checkUpdate) => {
  
  const current = versions.current
  let title = chalk.bold.blue(`CCTV CLI v${current}`)
  if (checkUpdate) {
    const { CLI_VERSION } = await getVersion()
    if (semver.gt(CLI_VERSION, current)) {
      title += chalk.green(`
┌──────────────────────────────${`─`.repeat(CLI_VERSION.length)}─┐
│ ✨  New version available: ${CLI_VERSION} ✨  │
└──────────────────────────────${`─`.repeat(CLI_VERSION.length)}─┘`)
    }
  }
  clearConsole(title)
  log()
}

export const showTable = async (head, body) => {
  const table = new Table({
    head,
    style: {
      head: ['cyan'],
      border: ['white'],
    },
    compact: true,
  })
  table.push(...body)
  console.log(table.toString())
}