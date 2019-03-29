const program = require('commander')
const chalk = require('chalk')

program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`cctv <command> --help`)} for detailed usage of given command.`)
  console.log()
})

program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
  })

program.commands.forEach((c) => c.on('--help', () => console.log()))

if (!process.argv.slice(2).length) {
  program.outputHelp()
}