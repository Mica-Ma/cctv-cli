import config, { versions } from './';
import Git from '../utils/Git';

export const getVersion =  async () => {
  const conf = await config.getAllRealConf()
  const name = conf.registry
  const registry = conf.allRegistry.filter(v => v.name === name)[0].registry
  const data = await new Git(conf.repoType, conf.repoAddr).fetch(`${registry}/${conf.name}`)
  const CLI_VERSION = process.env.CLI_VERSION = data['dist-tags'] ? data['dist-tags'].latest : versions.current
  return Object.assign(versions, {
    CLI_VERSION
  })
}