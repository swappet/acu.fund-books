module.exports = {
  title: 'ACU.fund books',
  description: 'blockchain and open source book of ACU.Fund with vuepress and github.io base on WTFPL.',
  serviceWorker: true, // 是否开启 PWA

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: 'logo.png' }], // 增加一个自定义的 favicon(网页标签的图标)
    ['link', { rel: 'manifest', href: 'logo.png' }],
    ['link', { rel: 'apple-touch-icon', href: 'logo.png' }],
    ['meta', { 'http-quiv': 'pragma', cotent: 'no-cache'}],
    ['meta', { 'http-quiv': 'pragma', cotent: 'no-cache,must-revalidate'}],
    ['meta', { 'http-quiv': 'expires', cotent: '0'}],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ], 
  base: '/acu.fund-books/', // 部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    nav:[ // 导航栏配置
      {text: 'git手册', link: 'git-manual/' },
      {text: 'linux手册', link: 'linux/' },
      {text: '参考', link: '/refers/'},
      {text: '官网', link: 'https://acu.fund'}      
    ],
    sidebar:  { // 侧边栏配置 
     'git-manual/': [
        {
          title: 'git手册',
          collapsable: false,
          children: [
            '',      /* /git-manual/ */
            'vuepress', /* /git-manual/vuepress.html */ 
            'gitbook'
            // ['gitbook', '基于 Gitbook 制作 Github pages 上的Markdown电子书']
          ]
        }
      ],
     'linux/': [
        {
          title: 'linux手册',
          collapsable: false,
          children: [
            '',      /* /linux/ */
            'certbot-auto', /* /linux/certbot-auto.html */ 
            'nginx-docker-https', 
            'nginx-in-docker' 
          ]
        }
      ],
      '/':[
        ''        /* / */
        // 'contact', /* /contact.html */
        // 'about'    /* /about.html */ 
      ]
    },
    // sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 2 // 侧边栏显示2级
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
};