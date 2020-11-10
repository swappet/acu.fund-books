(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{365:function(e,t,n){"use strict";n.r(t);var r=n(42),s=Object(r.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",[e._v("certbot-auto申请https证书，自动续期")]),e._v(" "),n("h1",{attrs:{id:"先安装certbot"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#先安装certbot"}},[e._v("#")]),e._v(" 先安装certbot")]),e._v(" "),n("p",[e._v("wget https://dl.eff.org/certbot-auto\nchmod a+x certbot-auto")]),e._v(" "),n("h1",{attrs:{id:"申请证书"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#申请证书"}},[e._v("#")]),e._v(" 申请证书")]),e._v(" "),n("p",[e._v("注意：需要把要申请证书的域名先解析到这台服务器上，才能申请。")]),e._v(" "),n("p",[e._v("Certbot 会启动一个临时服务器来完成验证（会占用80端口或443端口，因此需要暂时关闭 Web 服务器），然后 Certbot 会把证书以文件的形式保存，包括完整的证书链文件和私钥文件。")]),e._v(" "),n("p",[e._v("查看端口:"),n("code",[e._v("netstat -ltunp")])]),e._v(" "),n("p",[e._v("填写自己的邮箱，域名（可以填多个）\n"),n("code",[e._v("sudo ./certbot-auto certonly --standalone --email huaren.news@pm.me -d huaren.news -d www.huaren.news -d steemconnect.huaren.news -d steemauto.huaren.news -d hiveauto.huaren.news -d steemd.huaren.news -d steem.huaren.news -d steemwallet.huaren.news -d steemsigner.huaren.news -d steemkeys.huaren.news -d hiveconnect.huaren.news -d hivekey.huaren.news -d sexwallet.huaren.news -d hivewallet.huaren.news")])]),e._v(" "),n("h1",{attrs:{id:"备份pem文件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#备份pem文件"}},[e._v("#")]),e._v(" 备份pem文件")]),e._v(" "),n("p",[e._v("文件保存在 /etc/letsencrypt/live/ 下面的域名目录下:"),n("code",[e._v("cp -arf /etc/letsencrypt/live/huaren.news huaren.news.certbot")])]),e._v(" "),n("p",[e._v("This directory contains your keys and certificates.")]),e._v(" "),n("p",[n("code",[e._v("privkey.pem")]),e._v("  : the private key for your certificate.\n"),n("code",[e._v("fullchain.pem")]),e._v(": the certificate file used in most server software.\n"),n("code",[e._v("chain.pem")]),e._v("    : used for OCSP stapling in Nginx >=1.3.7.\n"),n("code",[e._v("cert.pem")]),e._v("     : will break many server configurations, and should not be used\nwithout reading further documentation (see link below).")]),e._v(" "),n("p",[e._v("WARNING: DO NOT MOVE OR RENAME THESE FILES!\nCertbot expects these files to remain in this location in order\nto function properly!")]),e._v(" "),n("p",[e._v("We recommend not moving these files. For more information, see the Certbot\nUser Guide at https://certbot.eff.org/docs/using.html#where-are-my-certificates.")]),e._v(" "),n("h1",{attrs:{id:"修改nginx配置"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#修改nginx配置"}},[e._v("#")]),e._v(" 修改nginx配置")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("server {\n    listen 80;\n    server_name huaren.news;\n    rewrite ^(.*) https://huaren.news permanent;\n}\nserver{\n    listen 443 ssl default_server;\n    listen [::]:443 ssl default_server;\n    server_name www.huaren.news;\n    ssl_certificate /etc/letsencrypt/live/huaren.news/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/huaren.news/privkey.pem;\n    root /web/huaren.news/;\n}\n")])])]),n("h1",{attrs:{id:"创建定时任务-自动续期"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#创建定时任务-自动续期"}},[e._v("#")]),e._v(" 创建定时任务，自动续期")]),e._v(" "),n("p",[e._v("默认证书有效期是3个月，所以需要续期；可以设置每月1日8点定期执行所有域名续期操作。")]),e._v(" "),n("p",[e._v("在最后添加(certbot-auto的所在目录为/root/):"),n("code",[e._v("$ sudo crontab -e")]),e._v(" "),n("code",[e._v('0 8 1 * * /root/certbot-auto renew --renew-hook "sudo nginx -s reload"')])]),e._v(" "),n("p",[e._v("查看是否存在刚添加的定时命令:"),n("code",[e._v("$ sudo crontab -l")]),e._v("\n重启cron生效："),n("code",[e._v("$ service crond restart")]),e._v("\n查看cron状态："),n("code",[e._v("$ service cron status")])])])}),[],!1,null,null,null);t.default=s.exports}}]);