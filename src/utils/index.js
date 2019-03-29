const semver = require('semver')
const chalk = require('chalk')

export const checkNodeVersion = (wanted, id) => {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(
      chalk.red(
        "You are using Node " +
        process.version +
        ", but this version of " +
        id +
        " requires Node " +
        wanted +
        ".\nPlease upgrade your Node version."
      )
    )
    process.exit(1)
  }
}

export const cleanArgs = (cmd) => {
  const args = {}
  cmd.options.forEach(o => {
    const key = o.long.replace(/^--/, '')
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}