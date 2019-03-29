const program = require('commander')
const fs = require('mz/fs');
const path = require('path')
const COMMANDS = path.join(process.cwd(), '/src/command/')
import { versions } from './config';
import { checkNodeVersion  } from './utils';

require('./utils/enhanceErrorMessages')

checkNodeVersion(versions.nodeEngines)

fs.readdir(COMMANDS, (err, files) => {
  if (!err) {
    files.forEach(n => {
      require(COMMANDS + n)
    })
    program.parse(process.argv);
  }
})