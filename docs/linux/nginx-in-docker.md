<h1>docker安装nginx 负载均衡配置</h1>

一个云主机上部署多个网站，对应不同的目录和域名。

可以用 docker 运行 nginx，作为负载均衡或反向代理。

# 运行一个nginx镜像
`$ sudo docker run --name nginxproxy -p 8888:80 -d nginx`  

# 从启动的nginx镜像中,复制nginx配置文件到本地
```
$ sudo mkdir /nginxproxy
$ cd /nginxproxy
$ sudo mkdir -p conf  html  logs
$ sudo docker cp nginxproxy:/etc/nginx/nginx.conf /nginxproxy/conf
```

# 制作两个模拟的nginx网站

## nginx01
从启动的nginx中复制配置文件到本地:
```
$ sudo mkdir /nginx01
$ cd /nginx01
$ sudo mkdir -p conf  html  logs
$ sudo docker cp nginxproxy:/etc/nginx/nginx.conf /nginx01/conf
```

在 /nginx01/conf/nginx.conf 中添加 nginx01 网站的配置：`vi conf/nginx.conf`   
```
    include /etc/nginx/conf.d/*.conf;

    server {
        listen 8081;
        root /usr/share/nginx/html;
        index index.html index.htm;
    }
```

增加 nginx01 网站首页：`echo '8081 port nginx' > /nginx01/html/index.html `

然后启动 nginx01 网站的docker：
```
$ sudo docker run -d -p 8081:8081 --name nginx01 \
  -v /nginx01/html:/usr/share/nginx/html \
  -v /nginx01/conf/nginx.conf:/etc/nginx/nginx.conf \
  -v /nginx01/logs:/var/log/nginx nginx
```

浏览器访问：http://ip:8081

## nginx02
类似 nginx01 方式，制作  nginx02 网站('8081'的地方，改为'8082'):
```
$ cp -rf /nginx01 /nginx02
$ echo '8082 port nginx' > /nginx02/html/index.html
$ vi /nginx02/conf/nginx.conf
```

然后启动 nginx02 网站的docker：
```
$ sudo docker run -d -p 8082:8082 --name nginx02 \
  -v /nginx02/html:/usr/share/nginx/html \
  -v /nginx02/conf/nginx.conf:/etc/nginx/nginx.conf \
  -v /nginx02/logs:/var/log/nginx nginx
```

浏览器访问：http://ip:8082

# 负载均衡/反向代理
删除之前运行的镜像：
```
$ docker ps -a
115460b1e2e2  nginx nginxproxy 0.0.0.0:8888->80/tcp
$ docker rm -f  115460b1e2e2
```

修改nginx反向代理配置：`vi /nginxproxy/conf/nginx.conf`    
``` 
http {
    include /etc/nginx/conf.d/*.conf;

    server { 
        listen       80;
        server_name  w1.test.com; 
        location / { 
            proxy_pass http://w1; 
            proxy_set_header   Host    $host; 
            proxy_set_header   X-Real-IP   $remote_addr; 
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for; 
        } 
    } 
    server { 
        listen       80;
        server_name  w2.test.com; 
        location / { 
            proxy_pass http://w2; 
            proxy_set_header   Host    $host; 
            proxy_set_header   X-Real-IP   $remote_addr; 
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for; 
        } 
    } 
    server { 
        listen       80; 
        server_name  wn.test.com; 
        location /w1 { 
            proxy_pass http://w1/; 
        } 
        location /w2 { 
            proxy_pass http://w2/; 
        } 
    }   
    server {  
        listen       80;
        server_name  wx.test.com;
        location / {  
            proxy_pass http://wx;  
            proxy_redirect default;  
        } 
    }
    upstream w1{
        server wn.test.com:8081;
    }
    upstream w2{
        server wn.test.com:8082;
    }
    upstream wx{
        server wx.test.com:8081 weight=5;
        server wx.test.com:8082 weight=5;
    } 
```
/nginxproxy/conf/conf.d/steemconnect.conf
```
server {
  listen       80;
  server_name  steemconnect.huaren.news;
  return 301 https://$server_name$request_uri;
}
server { 
  listen 443 ssl;
  server_name  steemconnect.huaren.news;
  ssl on;
  ssl_certificate  /etc/letsencrypt/live/huaren.news/fullchain.pem;
  ssl_certificate_key  /etc/letsencrypt/live/huaren.news/privkey.pem;
  location / { 
    proxy_pass http://steemconnect.huaren.news:8180;
    proxy_set_header   Host    $host;
    proxy_set_header   X-Real-IP   $remote_addr;
    proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
  }
}
```
挂载本地目录启动nginx：
```
$ sudo docker run  -itd \
  --name nginxproxy \
  --restart always \
  -p 80:80 \
  -p 443:443 \
  -v /nginxproxy/html:/usr/share/nginx/html \
  -v /nginxproxy/conf/nginx.conf:/etc/nginx/nginx.conf \
  -v /nginxproxy/conf/conf.d/default.conf:/etc/nginx/conf.d/default.conf:rw \
  -v /nginxproxy/logs:/var/log/nginx:rw \
  -v /etc/letsencrypt:/etc/letsencrypt:rw \
  -d nginx
```

server {
  listen       80;
  listen 443 ssl;
  server_name  steemconnect.huaren.news;
  #ssl on;
  ssl_certificate  /etc/letsencrypt/live/huaren.news/fullchain.pem;
  ssl_certificate_key  /etc/letsencrypt/live/huaren.news/privkey.pem;
  if ( $schema == http){
    #return 301 https://$server_name$request_uri;
    return 301 https://$host$request_uri;
  }
  location / {
    proxy_pass http://steemconnect.huaren.news:8180;
    proxy_set_header   Host    $host;
    proxy_set_header   X-Real-IP   $remote_addr;
    proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
  }
}
server {
    listen       80;
    listen 443 ssl;
    server_name  steemconnect.huaren.news;
    ssl_certificate  /etc/letsencrypt/live/huaren.news/fullchain.pem;
    ssl_certificate_key  /etc/letsencrypt/live/huaren.news/privkey.pem;
    location / {
        proxy_pass http://steemconnect.huaren.news:8180;
        proxy_set_header   Host    $host;
        proxy_set_header   X-Real-IP   $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
    }
}

# 访问网站
访问nginx01：http://w1.test.com 或 http://wn.test.com/w1/
访问nginx02：http://w2.test.com 或 http://wn.test.com/w2/
随机访问：http://wx.test.com