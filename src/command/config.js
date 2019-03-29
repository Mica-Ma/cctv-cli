import program from 'commander';
import config from '../config';
import { cleanArgs } from '../utils';
import { log } from '../utils/logger';
import { configPrompt, addRegistry, delRegistry, newRepoAddr } from '../prompts/config';

program
  .command('config')
  .option('-r, --reset', 'Reset profile')
  .option('-s, --show', 'show profile')
  .option('-c, --change_repoaddr', 'Please enter the new repoaddr')
  .option('-a, --add_registry', 'Please enter the registry you want to add')
  .option('-d, --del_registry', 'Please enter the registry you want to delete')
  .description('init project for local')
  .action(async (options) => {
    const cmd = cleanArgs(options);
    // 重置
    if (cmd.reset) {
      await config.resetConf();
      return;
    }
    // 显示
    if (cmd.show) {
      console.log(await config.getConf());
      return;
    }
    // 添加
    if (cmd.add_registry) {
      const conf = await config.getConf()
      const add = conf.addRegistry || []
      const newRegistry = await addRegistry()
      add.push(newRegistry)
      return await config.updateConf({
        addRegistry: add
      });
    }
    // 删除
    if (cmd.del_registry) {
      const conf = await config.getConf()
      const add = conf.addRegistry || []
      const { name } = await delRegistry(add)
      const current = add.filter(v => v.name !== name) 
      return await config.updateConf({
        addRegistry: current
      });
    }
    if (cmd.change_repoaddr) {
      const { addr } = await newRepoAddr()
      await config.updateConf({
        repoAddr: addr
      });
      return config.getRemoteConf()
    }
    const { manager, registry, cacheDays } = await configPrompt()
    await config.updateConf({
      manager,
      registry,
      cache: cacheDays
    })
    log(await config.getAllRealConf());
  });