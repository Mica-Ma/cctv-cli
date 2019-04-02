import {
  dirs,
  constant,
  constantRegistry
} from './'
import fs from 'mz/fs'
import Git from '../utils/Git'
const CACHEDAY = 30

export default class Conf {
  constructor() {
    this.conf = null
    // this.getConf()
  }
  async getConf(isUpdate) {
    if (isUpdate) return await this.getRemoteConf()
    return this.conf || await this.checkLocalConf() || await this.getRemoteConf()
  }
  async getLocalConf() {
    const rc = dirs.rc
    if (!await fs.exists(rc)) return false
    let conf = null
    try {
      conf = await JSON.parse(fs.readFileSync(rc))
    } catch (err) {
      
    }
    return conf
  }
  async checkLocalConf() {
    let conf = await this.getLocalConf()
    const cacheDay = conf.cache;
    if (cacheDay === 0) return false
    const cacheStamp = (cacheDay || CACHEDAY) * 86400 * 1000
    const now = Date.now()
    if (!conf.list || !conf.version || (now - conf.version) > cacheStamp) {
      return false
    }
    // console.log(conf.addRegistry)
    return conf
  }
  async getRemoteConf() {
    console.log('Remote');
    const conf = await this.getLocalConf()
    const repoAddr = conf.repoAddr || constant.repoAddr
    const repoType = conf.repoType || constant.repoType
    let list = await new Git(repoType, repoAddr).fetchRepoList()
    list = list.map(val => {
      return {
        name: val.name,
        full_name: val.full_name,
        description: val.description,
        url: val.url
      }
    })
    return await this.updateConf({ list })
  }
  async updateConf(...agrs) {
    let conf = {}
    conf.version = Date.now()
    agrs.forEach(obj => {
      Object.keys(obj).forEach(k => {
        if (obj[k] || (k === 'cache' && obj[k] === 0)) conf[k] = obj[k]
      })
    })
    // if (cache || cache === 0) conf.cache = cache
    // repoAddr && (conf.repoAddr = repoAddr)
    // list && (conf.list = list)
    this.conf = conf = Object.assign(await this.getLocalConf() || {}, conf)
    try {
      await fs.writeFileSync(dirs.rc, JSON.stringify(conf, null, 2))
      msg && done(msg)
    } catch (err) {

    }
    return conf
  }
  async resetConf() {
    await this.updateConf({
      repoAddr: constant.repoAddr,
      cache: CACHEDAY,
      manager: constant.manager,
      registry: constant.registry,
      addRegistry: []
    })
    return await this.getRemoteConf()
  }
  async getAllRealConf() {
    const conf = await this.getLocalConf();
    const allRegistry = constantRegistry.concat(conf.addRegistry || [])
    delete conf.list
    return Object.assign(
      dirs, 
      constant,
      {
        allRegistry
      },
      conf
    )
  }
}