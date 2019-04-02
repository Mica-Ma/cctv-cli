import inquirer from 'inquirer'
import chalk from 'chalk'
import { execSync } from 'child_process';

export const projectPrompt = async (dirName) => {

  let user = execSync('git config --global user.name', {
    encoding: 'utf-8'
  })
  let email = execSync('git config --global user.email', {
    encoding: 'utf-8'
  })

  user = user.trim()
  email = email.trim()

  return await inquirer.prompt([{
      type: 'confirm',
      name: 'projectPrivate',
      message: 'Is the project private ?'
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'package name',
      default: dirName,
      validate(input) {
        const done = this.async();
        if (input.trim().length === 0) {
          done('project name is empty');
          return;
        }
        done(null, true);
      }
    },

    {
      type: 'input',
      name: 'projectDescription',
      message: 'description'
    },

    {
      type: 'list',
      name: 'projectLicense',
      message: 'license',
      choices: ['MIT', "BSD 2-clause 'Simplified'", 'Apache 2.0', 'GNU General Public v3.0', 'BSD 3-clause', 'Eclipse Public 1.0', 'GNU Affero General Public v3.0', 'GNU General Public v2.0', 'GNU Lesser General Public v2.1', 'GNU Lesser General Public v3.0', 'Mozilla Public 2.0', 'The Unlicense']
    },
    {
      type: 'input',
      name: 'projectAuthor',
      message: 'author',
      default: email
    },
    {
      type: 'input',
      name: 'projectGit',
      message: 'user/repo',
      default: `${user}/${dirName}`,
      validate(input) {
        const done = this.async();
        if (!/\w+\/\w+/.test(input)) {
          done('Please input like user/repo');
          return;
        }
        done(null, true);
      }
    }
  ])
}