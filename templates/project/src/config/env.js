// 版本
export const APP_VERSION = '0.0.1';

// 当前接口环境，0 线上，1 预发， 2 测试
// export const APP_ENV = 0;
// export const APP_ENV = 1;
export const APP_ENV = 2;

// 是否是测试/预发环境
export const IS_DEV = [1, 2].indexOf(APP_ENV) > -1;
