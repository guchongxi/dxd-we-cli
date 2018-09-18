/**
 * 创建资源
 */

const path = require('path');
const fs = require('fs-extra');
const { red, yellow } = require('chalk');
const { isDirectory } = require('./utils');
const { TEMPLATE_PATH } = require('./constant');

module.exports = async (type, name, options = {}) => {
  const { workDir, srcDir } = options;
  const cwd = process.cwd();
  const defaultDir = path.resolve(cwd, `${type}s`);

  // 目标路径
  const targetDir = path.resolve(workDir ? path.join(defaultDir, workDir) : defaultDir, name);
  // 源路径
  const sourceDir = srcDir ? path.join(cwd, srcDir, type) : `${TEMPLATE_PATH}/${type}`;

  if (isDirectory(targetDir)) {
    // 检查是否目录是否已存在
    console.log(red(`${type.replace(/^\w/, w => w.toUpperCase())} ${yellow(name)} already exists.`));

    return;
  } else if (!isDirectory(sourceDir)) {
    // 检查源目录是否存在
    console.log(red(`Template ${yellow(sourceDir)} does not exist.`));

    return;
  }

  // 复制模板
  await fs.copy(sourceDir, targetDir);

  console.log(`🎉  Successfully generate ${type} ${yellow(name)}.\n`);
};
