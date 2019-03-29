const request = require('request')
import config, {
  ua,
  dirs
} from '../config';

/**
 * github 操作
 * @class Git
 */
export default class Git {
  constructor(type, repo) {
    this.type = type
    this.repo = repo
  }
  /**
   * request Promise封装 方便调用
   * @param  {[string]} api [地址]
   * @param  {[string]} ua [User-Agent]
   * @return {[Promise]}     [description]
   */
  async fetch(api) {
    return new Promise((resolve, reject) => {
      request(
        {
          url: api,
          method: 'GET',
          headers: {
            'User-Agent': `${ua}`
          }
        },
        (err, res, body) => {
          if (err) {
            reject(err);
            return;
          }
          const data = JSON.parse(body);
          if (data.message === 'Not Found') {
            reject(new Error(`${api} is not found`));
          } else {
            resolve(data);
          }
        }
      )
    })
  }
  /**
   * 获取git仓库列表
   */
  async fetchRepoList() {
    const api = `https://api.github.com/${this.type}s/${this.repo}/repos`;
    return await this.fetch(api);
  }
  /**
   * 获取仓库所有的版本
   * @param  {[string]} repo [仓库名称]
   * @return {[type]}      [description]
   */
  async fetchRepoTagList(repo) {
    const {
      url,
      scaffold
    } = await this.fetchGitInfo(repo);
    const api = `https://api.github.com/repos/${url}/tags`;

    return this.fetch(api, scaffold, url);
  }

  /**
   * 获取仓库详细信息
   * @param  {[string]} repo [仓库名称]
   * @return {[type]}      [description]
   */
  async fetchGitInfo(repo) {
    let template = repo;
    let [scaffold] = template.split('@');

    scaffold = basename(scaffold);

    template = template.split('@')
      .filter(Boolean)
      .join('#');
    const url = `${this.repo}/${template}`;
    return {
      url,
      scaffold
    };
  }
  /**
   * 下载git仓库代码到指定文件夹
   * @param  {[type]} repo [description]
   * @return {[type]}      [description]
   */
  async download(repo) {
    const {
      url,
      scaffold
    } = await this.fetchGitInfo(repo);

    return new Promise((resolve, reject) => {
      DownloadGitRepo(url, `${dirs.download}/${scaffold}`, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  }
}
// module.exports = new Git(config.repoType, config.repo)