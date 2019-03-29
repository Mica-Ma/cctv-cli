const program = require('commander');
import config from '../config';
import { cleanArgs } from '../utils';

program
  .command('init <app-name>')
  .description('✈️  create a new project from template')
  .action(async (name, options) => {
    const cmd = cleanArgs(options)
    console.log(name, cmd);
    console.log(await config.getConf());
    console.log('init command');
  });
