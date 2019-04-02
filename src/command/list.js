const program = require('commander')
import config from '../config'
import { showTable, banner } from '../utils/show'
import { log } from '../utils/logger'
// import spinner from '../utils/spinner'
// import { cleanArgs } from '../utils';
program
  .command('list')
  .alias('ls')
  .description('install github project to local')
  .action( async(options) => {
    // spinner.start('🌀', 'Loading templates, please wait...')
    // const cmd = cleanArgs(options);
    await banner(true)
    const conf = await config.getConf()
    const templates = conf.list || []
    const body = templates.map(v => [v.name, v.description])
    // spinner.stop()
    log('📗  current templates list:')
    await showTable(['Name', 'Description'], body)
  });