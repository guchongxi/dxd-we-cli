#!/usr/bin/env node

const program = require('commander');
const updateNotifier = require('update-notifier');
const { yellow } = require('chalk');
const pkg = require('../package.json');
const { PKG_DESCRIPTION } = require('../lib/constant');
const { enhanceErrorMessages } = require('../lib/helper');

// 版本更新提示
// 默认一天提醒一次
updateNotifier({ pkg })
  .notify({
    // 在命令执行时直接提示
    defer: false
  });

// 工具版本
program
  .version(pkg.version)
  .name('dxd-we')
  .description(PKG_DESCRIPTION)
  .usage('<command> [options]');

program
  .command('create <app-name>')
  .alias('c')
  .description('create a new project powered by dxd-we')
  .option('-f, --force', 'Overwrite target directory if it exists')
  .action((appName, options) => {
    require('../lib/create')(appName, options);
  });

enhanceErrorMessages('missingArgument', argName => {
  return `Missing required argument ${yellow(`<${argName}>`)}.`;
});

enhanceErrorMessages('unknownOption', optionName => {
  return `Unknown option ${yellow(optionName)}.`;
});

enhanceErrorMessages('optionMissingArgument', (option, flag) => {
  return `Missing required argument for option ${yellow(option.flags)}${flag ? `, got ${yellow(flag)}` : ''}`;
});

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
