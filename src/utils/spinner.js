// vue-cli/packages/@vue/cli-shared-utils/lib/spinner.js
const ora = require('ora')
const chalk = require('chalk')

// const spinner = ora()
// let lastMsg = null

// exports.logWithSpinner = (symbol, msg) => {
//   if (!msg) {
//     msg = symbol
//     symbol = chalk.green('✔')
//   }
//   if (lastMsg) {
//     spinner.stopAndPersist({
//       symbol: lastMsg.symbol,
//       text: lastMsg.text,
//     })
//   }
//   spinner.text = ' ' + msg
//   lastMsg = {
//     symbol: symbol + ' ',
//     text: msg,
//   }
//   spinner.start()
// }

// exports.stopSpinner = (persist) => {
//   if (lastMsg && persist !== false) {
//     spinner.stopAndPersist({
//       symbol: lastMsg.symbol,
//       text: lastMsg.text,
//     })
//   } else {
//     spinner.stop()
//   }
//   lastMsg = null
// }

// exports.pauseSpinner = () => {
//   spinner.stop()
// }

// exports.resumeSpinner = () => {
//   spinner.start()
// }

class Spinner {
  constructor() {
    this.spinner = ora()
    this.lastMsg = null
  }
  start(symbol, msg) {
    if (!msg) {
      msg = symbol
      symbol = chalk.green('✔')
    }
    if (this.lastMsg) {
      this.spinner.stopAndPersist({
        symbol: this.lastMsg.symbol,
        text: this.lastMsg.text,
      })
    }
    this.spinner.text = ' ' + msg
    this.lastMsg = {
      symbol: symbol + ' ',
      text: msg,
    }
    this.spinner.start()
  }
  stop(persist) {
    if (this.lastMsg && persist !== false) {
      this.spinner.stopAndPersist({
        symbol: this.lastMsg.symbol,
        text: this.lastMsg.text,
      })
    } else {
      this.spinner.stop()
    }
    this.lastMsg = null
  }
  succeed(msg) {
    this.spinner.succeed(msg)
  }
  resumeSpinner() {
    this.spinner.start()
  }
  pauseSpinner() {
    this.spinner.stop()
  }
}

export default new Spinner()