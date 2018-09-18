/**
 * 创建项目
 */

const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const { red, yellow, cyan, gray } = require('chalk');
const validateProjectName = require('validate-npm-package-name');
const { isDirectory } = require('./utils');
const { installDeps } = require('./helper');
const { TEMPLATE_PATH } = require('./constant');

const createProject = async (name, context) => {
  console.log(`✨  Creating project in ${yellow(context)}.`);

  // 复制模板
  await fs.copy(`${TEMPLATE_PATH}/project`, context);

  // 询问是否安装依赖
  const { packageManager } = await inquirer.prompt([
    {
      name: 'packageManager',
      type: 'list',
      message: '📦  Installing additional dependencies...',
      choices: [
        { name: 'Yarn', value: 'yarn' },
        { name: 'Npm', value: 'npm' },
        { name: 'Cnpm', value: 'cnpm' },
        { name: 'Cancel', value: false }
      ]
    }
  ]);

  if (packageManager) {
    await installDeps(context, packageManager);
  }

  console.log(`🎉  Successfully created project ${yellow(name)}.\n`);

  console.log(
    '👉  Get started with the following commands:\n\n' +
    (this.context === process.cwd() ? '' : cyan(` ${gray('$')} cd ${name}\n`)) +
    cyan(` ${gray('$')} ${packageManager ? (packageManager === 'yarn' ? 'yarn serve' : 'npm run serve') : 'npm install'}`)
  );
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
          console.log();
          await fs.remove(targetDir);
        }
      }
    }
  }

  createProject(name, targetDir);
};
