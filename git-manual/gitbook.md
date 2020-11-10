<h1>基于 Gitbook 制作 Github pages 上的Markdown电子书</h1>

GitBook 是一个使用 GitHub/Git 和 Markdown 来制作电子书的命令行工具 (Node.js 库)。Gitbook是一个命令行工，可以把Markdown文件汇集成电子书，并提供PDF等多种格式输出。

把Gitbook生成的HTML发布出来，就形成了一个简单的静态网站。 网站 http://gitbook.com 可以帮助用户更好的使用 Gitbook。同时 http://gitbook.com 还提供了一个桌面编辑器，帮助用户编辑电子书。

Gitbook 与 http://gitbook.com 的关系类似 Git 和 GitHub，一个是工具，另一个是基于工具创建的网站。

涉及如下知识点：
Markdown 书写
Git 使用
Gitbook 基本操作
Github pages

# 创建工作目录
$ cd Code
$ mkdir mygitbook
$ cd mygitbook
文件夹 mygitbook 作为工作目录，之后所有的操作都在这个目录下执行。

#  Gitbook 安装
Gitbook 的安装和准备大概需要几分钟。

目前有两种方式可以而让你使用 Gitbook 来编辑、发布和管理电子书：
1. 本地编辑，然后发布到类似 GitHub pages 的第三方平台；
2. 直接使用已有的 http://gitbook.com 网站。

## 本地安装
本地安装 Gitbook 需要 NodeJS 支持：
sudo npm install -g gitbook-cli
sudo npm install -g gitbook
安装完之后，检验下是否安装成功：gitbook -V

# 编辑书籍
安装好 Gitbook 之后，就可以创建图书了。

Gitbook 的基本用法非常简单，基本上就只有两步:

使用 gitbook init 初始化书籍目录
使用 gitbook serve 编译书籍
首先，进入一个目录，例如之前创建好的 gitbook，执行初始化命令：

sudo gitbook init
然后的 gitbook 空目录会多出两个文件：

mygitbook/
├── README.md
└── SUMMARY.md
README.md 和 SUMMARY.md 是两个必须文件，README.md 是对书籍的简单介绍。SUMMARY.md 是书籍的目录结构。

REAMDE.md:
```
# Introduction
```
SUMMARY.md:
```
# Summary

* [Introduction](README.md)
```

编辑这两个文件之后，再次执行：

gitbook init
它会为创建 SUMMARY.md 中的目录结构。


书籍目录结构创建完成以后，就可以使用 gitbook serve 来编译和预览书籍了：

sudo gitbook serve

gitbook serve 命令实际上会首先调用 gitbook build 编译书籍，完成以后会打开一个 web 服务器，监听在本地的 4000 端口。

现在，可以用浏览器打开 http://localhost:4000 查看书籍的效果：


现在，Gitbook 为创建了书籍目录结构后，就可以向其中添加真正的内容了，文件的编写使用 Markdown 语法，在文件修改过程中，每一次保存文件，gitbook serve 都会自动重新编译，所以可以持续通过浏览器来查看最新的书籍效果！

# 发布到 GitHub

可以在 GitHub 上创建一个仓库，来管理书籍源码。

之前在 http://gitbook.com 新建了一本电子书，并且把电子书的源码存放在了 GitHub 上。现在，可以将 http://gitbook.com 上的这本电子书与 GitHub 的远程仓库关联起来，可以通过向书籍的 GitHub 仓库提交内容来更新书籍。