const systemInfo = wx.getSystemInfoSync();

// 手机型号
export const SYS_MODEL = systemInfo.model;
// 操作系统版本
export const SYS_SYSTEM = systemInfo.system;

const [systemName, systemVersion] = SYS_SYSTEM.split(' ');

// 操作系统名
export const SYS_NAME = systemName;
// 操作系统版本
export const SYS_VERSION = systemVersion
// 是否是安卓设备
export const isAndroid = systemName === 'Android';
