import inquirer from 'inquirer'
import chalk from 'chalk'
import config, {
  constantRegistry,
  constant
} from '../config';

/**
 * 是否覆盖已存在目录
 *
 * @param {*} targetDir
 * @returns 
 */
export const overwritePrompt = async (targetDir) => {
  return await inquirer.prompt([
    {
      name: 'isOverwrite',
      type: 'list',
      message: 
        `Target directory ${chalk.cyan(targetDir)} already exists.\n` +
        `Pick an action:`,
      choices: [
        { name: 'Overwrite', value: true },
        { name: 'Cancel', value: false }
      ]
    }
  ])
}

export const selectListPrompt = async(conf) => {
  const choices = (conf.list || []).map(val => {
    return {
      name: `${val.name} (${val.description})`,
      value: val.full_name || val.url
    }
  })
  if (!choices.length) return { repoUrl: '' }
  return await inquirer.prompt([{
    name: 'repoUrl',
    type: 'list',
    message: 'Please choose a template below:',
    choices
  }])
}