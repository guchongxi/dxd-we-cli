## 小程序实例

# 基本信息

AppID: <xxx>

# 开发工具

- [vs code](https://code.visualstudio.com/)
- [wechat app support for vscode](https://marketplace.visualstudio.com/items?itemName=qinjia.vscode-wechat)
- [官方开发工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)

## 开发

1. GitLab 拉取源码

    ```
    git clone <xxxx>
    ```

2. 安装依赖

    ```
    npm i
    ```
    or
    ```
    yarn
    ```

3. 建立 Git 分支

    ```
    git checkout -b 'YourBranch'
    ```

> 原则上来说所有的更改都应该在你自己的分支上进行，
> 或者可以遵循 gitflow 的规则进行代码协同开发。

#### 注意

1. 引入了丁香医生小程序组件库，开发原则遵循组件(http://gitlab.dxy.net/f2e/doctor-ui-weapp)

2. 组件库的引入会把相应的组件目录放到项目目录的 components/dxy-doctor 中，该目录是不能传到git 上的

## 提测

1. 将功能分支 push 到远程

2. 远程提交 MR 至预发版本分支

3. 合并后拉取版本分支至本地

4. 使用开发者工具上传代码

5. 登录小程序管理后台将自己的代码设为体验版本

## 发布

1. 远程提交版本分支 MR 至主分支

2. 拉取版本分支至本地，修改`package.json`中版本号

3. 执行`npm run log`

3. 使用开发者工具上传代码

4. 登录小程序管理后台将自己的代码提交审核

5. 代码发布后远程合并 MR ，新建 tag ，将版本 log 粘贴至 release message 中

## 项目文件结构说明

仅包含原生页面、未定功能表示有 H5 承载
```
  /api                     ---> 通用请求
  /components              ---> 组件
  /cofnig                  ---> 全局变量配置
  /images                  ---> 图片资源
  /pages                   ---> 页面
    /comment                  ---> 我的评价
    /dev                      ---> 彩蛋
    /dashboard                ---> 首页
    /login                    ---> 登录页
    /question                 ---> 问题详情相关
    /webview                  ---> webview
    /statistic                ---> 我的数据
    /me                       ---> 我的相关
        /questions                ---> 我的问诊
        /examines                 ---> 审核任务
  /style                   ---> 通用样式
  /utils                   ---> 通用工具类
  /vendor                  ---> 第三方资源库
  app.js                   ---> 小程序入口
  app.json                 ---> 小程序全局配置
  app.wxss                 ---> 小程序全局样式
```


# 权限开通

## 开发及体验权限


## 数据统计


#### 注意


# 参考

[官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/)

[官方开发者社区](https://developers.weixin.qq.com)

# scss
scss转wxss使用的node-sass-chokidar这个库；但是原本只支持生成.css文件，因此在安装后需要修改源码

安装依赖后修改node_modules/node-sass-chokidar/bin/node-sass-chokidar文件，第198行替换'.css'为'.wxss'即可

使用`npm run style`启动文件监控