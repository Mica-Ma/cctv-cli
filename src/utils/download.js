import fs from "mz/fs"
import mkdirp from "mkdirp"
import { dirs } from "../config"
import path from "path"
import DownloadGitRepo from "download-git-repo"
import spinner from "./spinner"
import chalk from "chalk"
import { ncp } from "ncp"

export default async (url, targetDir) => {
  const dir = path.join(dirs.download, url)
  if (await fs.existsSync(dir)) {
    await copyFile(targetDir, dir)
  } else {
    await downloadGitRepo(url, dir)
    await copyFile(targetDir, dir)
  }
}
export const downloadGitRepo = async (url, dir) => {
  return new Promise((resolve, reject) => {
    spinner.start("✨", `Creating project in ${chalk.yellow(dir)}`)
    // console.log('url: ' + url)
    DownloadGitRepo(url, dir, err => {
      if (err) {
        reject(err)
      } else {
        spinner.succeed("downloadGitRepo")
        resolve(dir)
      }
    })
  })
}
export const copyFile = async (src, dest) => {
  return new Promise(async (resolve, reject) => {
    if (!(await fs.exists(src))) {
      await mkdirp.sync(src)
    }
    ncp(dest, src, err => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}
