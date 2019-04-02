import program from 'commander'
import config from '../config'
import { cleanArgs } from '../utils'
import fs from 'mz/fs'
import rimraf from 'rimraf'
import { resolve } from 'path'
import { overwritePrompt, selectListPrompt } from '../prompts/init';
import { projectPrompt } from '../prompts/project'
import download from '../utils/download'
import generate from '../utils/generate'


program
  .command('init <app-name>')
  .description('✈️  create a new project from template')
  .action(async (name, options) => {
    const cmd = cleanArgs(options)
    const targetDir = resolve(process.cwd(), name)
    if (fs.existsSync(targetDir)) {
      const { isOverwrite } = await overwritePrompt(targetDir)
      isOverwrite && await rimraf.sync(targetDir)
    }
    const conf = await config.getConf()

    let { repoUrl } = await selectListPrompt(conf)
    await download(repoUrl, targetDir)
    const pkg = await projectPrompt(name)
    await generate(pkg, targetDir, targetDir)

    // console.log(pkg);
    // console.log('init command');
    
  });
