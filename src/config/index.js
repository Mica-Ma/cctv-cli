const os = require('os');
import {
  name,
  version,
  engines
} from '../../package.json';
import Conf from './Conf';
export * from './version'
// export const getVersion = getVersion

// 系统user文件夹
const home = os.homedir();

// user agent
export const ua = `${name}-${version}`;

/**
 * 文件夹定义
 * @type {Object}
 */
export const dirs = {
  home,
  download: `${home}/.temporary-templates`,
  rc: `${home}/.cctvrc`,
  tmp: os.tmpdir(),
  metalsmith: 'metalsmith'
};

/**
 * 版本
 * @type {Object}
 */
export const versions = {
  node: process.version.substr(1),
  nodeEngines: engines.node,
  [name]: version,
  current: version
};



export const constant = {
  repoAddr: 'mica-templates', // 仓库地址
  repoType: 'org', // ['org', 'user']
  manager: 'npm',
  registry: 'taobao',
  metalsmith: true,
  name
}
export const constantRegistry = [
  {
    name: 'npm',
    registry: 'https://registry.npmjs.org/'
  },
  {
    name: 'cnpm',
    registry: 'http://r.cnpmjs.org/'
  },
  {
    name: 'taobao',
    registry: 'https://registry.npm.taobao.org/'
  }
]

export default new Conf()

