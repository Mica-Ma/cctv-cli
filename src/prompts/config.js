const inquirer = require('inquirer');
import config, { constantRegistry, constant } from '../config';

export const configPrompt = async() => {
  const conf = await config.getConf()
  const allRegistry = constantRegistry.concat(conf.addRegistry || [])
  return await inquirer.prompt([
    {
      name: 'manager',
      type: 'list',
      message: 'Please select a package manager',
      choices: [
        {
          name: 'npm',
          value: 'npm'
        },
        {
          name: 'yarn',
          value: 'yarn'
        }
      ],
      default: 'npm',
    },
    {
      name: 'registry',
      type: 'list',
      message: 'Please select a package registry',
      choices: allRegistry.map(v => {
        return {
          name: `${v.name}(${v.registry})`,
          value: v.name
        }
      }),
      default: 'npm',
    },
    {
      name: 'cacheDays',
      type: 'input',
      message: 'Please input cacheDays for templates results, 0 means no cache, default 30 day',
      default: 30,
      validate: (input) => {
        const reg = /^[0-9]+\d*$/
        if (reg.test(input) || !input) {
          return true
        }
        return 'CacheDays must be a number greater than or equal to 0'
      }
    }
  ])
}

export const addRegistry = async() => {
  return await inquirer.prompt([
    {
      name: 'registry',
      type: 'input',
      message: 'Please input your add registry',
      default: ''
    },
    {
      name: 'name',
      type: 'input',
      message: 'Please input your add registry name',
      default: ''
    }
  ])
}
export const delRegistry = async (addRegistry) => {
  return await inquirer.prompt([{
    name: 'name',
    type: 'list',
    message: 'Please input your delete registry',
    choices: addRegistry.map(v => {
      return {
        name: `${v.name}(${v.registry})`,
        value: v.name
      }
    }),
    default: ''
  }])
}
export const newRepoAddr = async () => {
  const conf = await config.getConf()
  return await inquirer.prompt([{
    name: 'addr',
    type: 'input',
    message: `Please input your delete registry current: ${conf.repoAddr}`,
    default: conf.repoAddr
  }])
}