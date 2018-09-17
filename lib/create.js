/**
 * 创建项目
 */

const path = require('path');
const fs = require('fs-extra');
const execSync = require('child_process').execSync;
const inquirer = require('inquirer');
const { red, yellow, cyan } = require('chalk');
const validateProjectName = require('validate-npm-package-name');
const { isDirectory } = require('./utils');

const createProject = () => {
  console.log('创建项目');
};

module.exports = async (projectName, options = {}) => {
  const { force = false } = options;

  // 当前执行环境绝对路径
  const cwd = process.cwd();
  // 是否是当前文件夹
  const inCurrent = projectName === '.';
  // 如果是当前文件夹则获取当前目录名
  const name = inCurrent ? path.relative('../', cwd) : projectName;
  // 目标路径
  const targetDir = path.resolve(cwd, projectName || '.');
  // 校验目录名是否合法
  const result = validateProjectName(name);

  // 如果不合法提示
  if (!result.validForNewPackages) {
    console.log(red(`Invalid project name: ${yellow(projectName)}`));

    result.errors && result.errors.forEach(err => {
      console.log(red(err));
    });

    // 退出进程
    process.exit(1);
  }

  // 判断是否已存在该目录
  if (isDirectory(targetDir)) {
    if (force) {
      await fs.remove(targetDir);
    } else {
      if (inCurrent) {
        const { ok } = await inquirer.prompt([
          {
            name: 'ok',
            type: 'confirm',
            message: 'Generate project in current directory?'
          }
        ]);
        if (!ok) {
          return;
        }
      } else {
        const { action } = await inquirer.prompt([
          {
            name: 'action',
            type: 'list',
            message: `Target directory ${cyan(targetDir)} already exists. Pick an action:`,
            choices: [
              { name: 'Overwrite', value: 'overwrite' },
              { name: 'Merge', value: 'merge' },
              { name: 'Cancel', value: false }
            ]
          }
        ]);
        if (!action) {
          return;
        } else if (action === 'overwrite') {
          console.log(`\nRemoving ${cyan(targetDir)}...`);
          await fs.remove(targetDir);
        }
      }
    }
  }

  createProject();

  // console.log('下载初始项目...'.green);
  // download('maichong/labrador-demo', rootDir, () => {
  //   console.log('下载完毕'.green);

  //   let pkgFile = path.join(rootDir, 'package.json');
  //   let pkg = utils.readJSON(pkgFile);
  //   pkg.name = name;
  //   utils.writeJson(pkgFile, pkg);

  //   console.log('安装npm依赖'.green);
  //   execSync((which('yarn') ? 'yarn install' : 'npm install'), {
  //     cwd: rootDir,
  //     stdio: ['inherit', 'inherit', 'inherit'],
  //     env: Object.assign({
  //       NPM_CONFIG_LOGLEVEL: 'http',
  //       NPM_CONFIG_PROGRESS: 'false',
  //       NPM_CONFIG_COLOR: 'false'
  //     }, process.env)
  //   });
  //   console.log('构建项目...'.green);
  //   execSync('labrador build', {
  //     cwd: rootDir,
  //     stdio: ['inherit', 'inherit', 'inherit']
  //   });
  // });
};
