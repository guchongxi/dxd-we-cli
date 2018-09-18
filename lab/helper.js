/**
 * 辅助函数 - 具有业务意义
 */
const program = require('commander');
const execa = require('execa');
const { red } = require('chalk');
const { renderProgressBar } = require('./utils');

/**
 *  增强 commander 错误提示
 * @param {String}} methodName
 * @param {*} log
 */
exports.enhanceErrorMessages = (methodName, log) => {
  program.Command.prototype[methodName] = function (...args) {
    if (methodName === 'unknownOption' && this._allowUnknownOption) {
      return;
    }
    this.outputHelp();
    console.log(`  ${red(log(...args))}`);
    console.log();
    process.exit(1);
  };
};

/**
 * 执行命令
 * @param {String} command 命令
 * @param {Array} args 参数
 * @param {String} targetDir 路径
 */
function executeCommand(command, args, targetDir) {
  return new Promise((resolve, reject) => {

    const child = execa(command, args, {
      cwd: targetDir,
      stdio: ['inherit', 'inherit', command === 'yarn' ? 'pipe' : 'inherit']
    });

    // filter out unwanted yarn output
    if (command === 'yarn') {
      child.stderr.on('data', buf => {
        const str = buf.toString();
        if (/warning/.test(str)) {
          return;
        }

        // progress bar
        const progressBarMatch = str.match(/\[.*\] (\d+)\/(\d+)/);
        if (progressBarMatch) {
          // since yarn is in a child process, it's unable to get the width of
          // the terminal. reimplement the progress bar ourselves!
          renderProgressBar(progressBarMatch[1], progressBarMatch[2]);
          return;
        }

        process.stderr.write(buf);
      });
    }

    child.on('close', code => {
      if (code !== 0) {
        reject(`command failed: ${command} ${args.join(' ')}`);
        return;
      }
      resolve();
    });
  });
}

/**
 *
 * @param {String} targetDir 路径
 * @param {String} command 包管理器
 */
exports.installDeps = async (targetDir, command) => {
  const args = [];
  if (['npm', 'cnpm'].includes(command)) {
    args.push('install', '--loglevel', 'error');
  } else if (command === 'yarn') {
    // do nothing
  } else {
    throw new Error(`Unknown package manager: ${command}`);
  }

  await executeCommand(command, args, targetDir);
};