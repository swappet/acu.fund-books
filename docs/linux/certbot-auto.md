<h1>certbot-auto申请https证书，自动续期</h1>

# 先安装certbot
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto

# 申请证书
注意：需要把要申请证书的域名先解析到这台服务器上，才能申请。

Certbot 会启动一个临时服务器来完成验证（会占用80端口或443端口，因此需要暂时关闭 Web 服务器），然后 Certbot 会把证书以文件的形式保存，包括完整的证书链文件和私钥文件。


查看端口:`netstat -ltunp`

填写自己的邮箱，域名（可以填多个）
`sudo ./certbot-auto certonly --standalone --email huaren.news@pm.me -d huaren.news -d www.huaren.news -d steemconnect.huaren.news -d steemauto.huaren.news -d hiveauto.huaren.news -d steemd.huaren.news -d steem.huaren.news -d steemwallet.huaren.news -d steemsigner.huaren.news -d steemkeys.huaren.news -d hiveconnect.huaren.news -d hivekey.huaren.news -d sexwallet.huaren.news -d hivewallet.huaren.news `

# 备份pem文件
文件保存在 /etc/letsencrypt/live/ 下面的域名目录下:`cp -arf /etc/letsencrypt/live/huaren.news huaren.news.certbot`

This directory contains your keys and certificates.

`privkey.pem`  : the private key for your certificate.
`fullchain.pem`: the certificate file used in most server software.
`chain.pem`    : used for OCSP stapling in Nginx >=1.3.7.
`cert.pem`     : will break many server configurations, and should not be used
                 without reading further documentation (see link below).

WARNING: DO NOT MOVE OR RENAME THESE FILES!
         Certbot expects these files to remain in this location in order
         to function properly!

We recommend not moving these files. For more information, see the Certbot
User Guide at https://certbot.eff.org/docs/using.html#where-are-my-certificates.

# 修改nginx配置
```
server {
    listen 80;
    server_name huaren.news;
    rewrite ^(.*) https://huaren.news permanent;
}
server{
    listen 443 ssl default_server;
    listen [::]:443 ssl default_server;
    server_name www.huaren.news;
    ssl_certificate /etc/letsencrypt/live/huaren.news/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/huaren.news/privkey.pem;
    root /web/huaren.news/;
}
```

# 创建定时任务，自动续期
默认证书有效期是3个月，所以需要续期；可以设置每月1日8点定期执行所有域名续期操作。

在最后添加(certbot-auto的所在目录为/root/):`$ sudo crontab -e`
`0 8 1 * * /root/certbot-auto renew --renew-hook "sudo nginx -s reload"`

查看是否存在刚添加的定时命令:`$ sudo crontab -l`
重启cron生效：`$ service crond restart`
查看cron状态：`$ service cron status`

