<h1>让docker中的网站支持https</h1>

如何让docker中的网站支持https？通常涉及到两个环节：
1）nginx前端反向代理到docker，支持https/443 ；
2）docker内的网站支持https/443。

# 搭建docker环境
参考：[ docker安装nginx 负载均衡配置  ](https://steemit.com/@dappcoder/20200605nginxproxy) 

# 准备https 所需要的证书
参考：[ certbot-auto申请https证书，自动续期  ](https://steemit.com/@dappcoder/20200605nginxproxy) 

# docker安装nginx并配置https访问
启动 nginx01 网站的docker：
```
sudo su -
mkdir -p /nginx01/html /nginx01/conf/conf.d /nginx01/logs
echo '80+443 port nginx' > /nginx01/html/index.html 
docker run -p 8180:80 -p 8143:443 --name nginx01 \
  -v /nginx01/html:/usr/share/nginx/html:rw \
  -v /nginx01/conf/nginx.conf:/etc/nginx/nginx.conf:rw \
  -v /nginx01/conf/conf.d/default.conf:/etc/nginx/conf.d/default.conf:rw \
  -v /nginx01/logs:/var/log/nginx:rw \
  -v /etc/letsencrypt:/etc/letsencrypt:rw \
  -d nginx
```

同时支持443/80的配置：/nginx01/conf/conf.d/default.conf
```
server{
    listen 80;
    listen 443;
    server_name  w1.huaren.news;
    #ssl on;
    ssl_certificate  /etc/letsencrypt/live/huaren.news/fullchain.pem;
    ssl_certificate_key  /etc/letsencrypt/live/huaren.news/privkey.pem;
}
```
强制80跳转443的配置：/nginx01/conf/conf.d/default.conf
```
server {
    listen 80;
    server_name w1.huaren.news;
    return 301 https://$server_name$request_uri;
}
server{
    listen 443 ssl;
    ssl on;
    ssl_certificate  /etc/letsencrypt/live/huaren.news/fullchain.pem;
    ssl_certificate_key  /etc/letsencrypt/live/huaren.news/privkey.pem;
}
```

docker cp sc:/etc/nginx/conf.d/default.conf ~/steemconnect/conf/conf.d

# 宿主机使用nginx向docker容器转发https请求
https://blog.csdn.net/qq_32080545/article/details/85221112

