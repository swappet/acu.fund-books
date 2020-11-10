module.exports = {
  title: 'ACU.fund books',
  description: 'blockchain and open source book of ACU.Fund with vuepress and github.io base on WTFPL.',
  serviceWorker: true, // 是否开启 PWA
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
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
    sidebar: [
      '/',
      '/git-manual/',
      ['/git-manual/gitbook', '基于 Gitbook 制作 Github pages 上的Markdown电子书']
    ], // 侧边栏配置
    sidebarDepth: 2, // 侧边栏显示2级
  }
};
