---
title: 基于 VuePress 制作 Github pages 上的Markdown电子书
sidebar: auto
sidebarDepth: 2
---

VuePress 由两部分组成：第一部分是一个[极简静态网站生成器 (opens new window)](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/core)，它包含由 Vue 驱动的[主题系统](https://www.vuepress.cn/theme/)和[插件 API](https://www.vuepress.cn/plugin/)，另一个部分是为书写技术文档而优化的[默认主题](https://www.vuepress.cn/theme/default-theme-config.html)，它的诞生初衷是为了支持 Vue 及其子项目的文档需求。

每一个由 VuePress 生成的页面都带有预渲染好的 HTML，也因此具有非常好的加载性能和搜索引擎优化（SEO）。同时，一旦页面被加载，Vue 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载。

在构建时，VuePress 会为应用创建一个服务端渲染（SSR）的版本，然后通过虚拟访问每一条路径来渲染对应的HTML。

VuePress 有很多优点：
```
更好的兼容、扩展 Markdown 语法
响应式布局，PC端、手机端
Google Analytics 集成
支持 PWA/SSR 
```
# 简单使用

## 安装
```
$ cd ~
$ mkdir myvuepress
$ cd myvuepress
$ npx npm init
$ npx npm i --save vuepress
$ npx npm run dev
```
全局安装：`$ yarn global add vuepress` 或 `$ npx npm install -g vuepress`

如果部署到githua pages，最好本地安装。

## 创建文件夹和文件
```
myvuepress
├─── docs
│   ├── README.md
│   └── .vuepress
│       ├── public
│       └── config.js
└── package.json
```

### config.js
```
module.exports = {
  title: 'ACU.fund books',
  description: 'blockchain and open source book of ACU.Fund with vuepress and github.io base on WTFPL.',
  serviceWorker: true, // 是否开启 PWA
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.png' }], // 增加一个自定义的 favicon(网页标签的图标)
    ['link', { rel: 'manifest', href: '/logo.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/logo.png' }],
    ['meta', { 'http-quiv': 'pragma', cotent: 'no-cache'}],
    ['meta', { 'http-quiv': 'pragma', cotent: 'no-cache,must-revalidate'}],
    ['meta', { 'http-quiv': 'expires', cotent: '0'}]
  ],
  serviceWorker: true, // 是否开启 PWA
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    nav:[ // 导航栏配置
      {text: 'git手册', link: '/git-manual/' },
      {text: '参考', link: '/refers/'},
      {text: '官网', link: 'https://acu.fund'}      
    ],
    sidebar: [ // 侧边栏配置
      {
        '/git-manual/': [
            {
              title: 'git手册',
              children: [
                '/git-manual/gitbook.html',
                '/git-manual/vuepress.html'
              ]
            }
          ] 
      },
      // '/',
      // '/git-manual/',
      // ['/git-manual/gitbook', '基于 Gitbook 制作 Github pages 上的Markdown电子书']
    ],
    // sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 2 // 侧边栏显示2级
  }
};
```

## package.json
两个命令:
```
  "scripts": {
    "start": "vuepress dev docs",
    "dev": "vuepress dev docs",
    "build": "vuepress build docs",
    "deploy": "bash deploy.sh" 
  }
```

## 开始写作
`$ npm run dev`

## 构建静态文件
`$ npm run build`

##  Markdown 语法整理大集合
参考：[ Markdown 语法整理大集合](https://www.jianshu.com/p/b03a8d7b1719)

## 代码块高亮
``` js
<script>
    console.log('Hello world, wecome to ACU.Fund')
</script>
```

# 支持 PWA

# 首页
默认的主题提供了一个首页（Homepage）的布局 (用于 这个网站的主页)。想要使用它，需要在你的根级 README.md 的 YAML front matter 指定 home: true。以下是一个如何使用的例子：
```
---
home: true
heroImage: /logo.png
heroText: ACU Fund 文档库
tagline: 关于区块链和开源的系列文档
actionText: git手册 →
actionLink: git-manual/vuepress.html
features:
- title: 区块链
  details: 区块链区块链区块，链区块链区块链区块链区块链区块，链区块链区块链。
- title: 开源社区
  details: 开源开源开源开源开源，开源开源开源开源开源开源，开源。
- title: 亚链社
  details: 亚洲区块链爱好者的社区，亚洲区块链爱好者的社区亚洲区块链爱好者的社区，亚洲区块链爱好者的社区。
footer: WTFPL Licensed | Copyright © 2020-present ACU.Fund
--- 
```