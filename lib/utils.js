/**
 * 工具函数
 */
const fs = require('fs');
const readline = require('readline');
const { supportsColor } = require('chalk');

/**
 * 判断指定路径是否是文件夹
 * @param path
 * @returns {boolean}
 */
exports.isDirectory = (path) => {
  try {
    return fs.statSync(path).isDirectory();
  } catch (e) {
    return false;
  }
};

exports.toStartOfLine = (stream) => {
  if (!supportsColor) {
    stream.write('\r');
    return;
  }
  readline.cursorTo(stream, 0);
};

exports.renderProgressBar = (curr, total) => {
  const ratio = Math.min(Math.max(curr / total, 0), 1);
  const bar = ` ${curr}/${total}`;
  const availableSpace = Math.max(0, process.stderr.columns - bar.length - 3);
  const width = Math.min(total, availableSpace);
  const completeLength = Math.round(width * ratio);
  const complete = '#'.repeat(completeLength);
  const incomplete = '-'.repeat(width - completeLength);

  exports.toStartOfLine(process.stderr);
  process.stderr.write(`[${complete}${incomplete}]${bar}`);
};