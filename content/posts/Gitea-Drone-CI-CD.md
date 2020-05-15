---
title: Gitea + Drone CI/CD
date: 2020-03-27T20:38:51.000Z
tags:
  - Gitea
  - Drone
  - CI/CD
---
最近想实践一下 DevOps，所以准备搭建一套代码托管和CI/CD 系统。

## 技术选型

### 代码托管

代码托管系统的选择其实并不多：

- Gitea
- Gogs
- GitLab

由于 `Gitlab` 资源占用过大，所以可以直接去除（毕竟这个系统只有我一个人在用，而且只有一台1核2G的服务器）。

`Gitea`是脱胎于`Gogs`的，在`Gogs`上做了较多的扩展，而且迭代的也毕竟快。`Gitea`对现有的代码托管做了[横向对比](https://docs.gitea.io/zh-cn/comparison/),
我们可以看出来`Gitea`几乎是最优选择。

`Gitea`有一个比较显著的缺点，它没有像`Gitlab`一样内置了`CI/CD`，所以我们必须搭另外一套`CI/CD`系统。

### CI/CD

对现有的 CI/CD 进行了一下调研:

- Jenkins
  - 优点：最为流行，出现坑的容易找到解决方案
  - 缺点：用 Java 编写，过于笨重
- GitLab CI
  - 优点：据说很好用
  - 缺点：笨重
- Drone
  - 优点：轻量级，支持`Gitea`
  - 缺点：生态不够丰富，文档差

在这里我们选择`Drone`作为`CI/CD`，主要原因当然是因为只有它轻量级啊。

## Gitea

在安装`Gitea`和`Drone`时，我们都选择使用`docker-compose`来管理，因此需要先安装`docker`和`docker-compose`。

创建一个`gitea`文件夹，并在该文件夹下创建`docker-compose.yml`文件：

```yml
version: "2"

networks:
  gitea:
    external: false

services:
  server:
    image: gitea/gitea:1.11
    environment:
      - USER_UID=1000
      - USER_GID=1000
      - RUN_MODE=prod
      - SSH_PORT= 3022 #SSH端口
      - SSH_DOMAIN= #IP地址或URL
      - DISABLE_REGISTRATION=False #取消注册
    restart: always
    networks:
      - gitea
    volumes:
      - ./gitea:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - "3000:3000"
      - "3022:3022"
```

这里面需要注意的是，设置`SSH_PORT`和`SSH_DOMAIN`，这样 gitea 生成的 repo SSH 链接才是能直接使用的形式。

填写完后，直接`docker-compose up -d`开启服务即可，第一次登陆时，会跳出一个安装页面，可以设置所使用的数据库和管理员账号，同时要记得检查一下 SSH 端口和域名是否正确。

## Drone

`Drone`的安装比`Gitea`复杂的多，同时需要先在`Gitea`中创建`OAuth2`应用程序：

打开`Gitea`的页面 -> 个人信息 -> 应用 -> 管理 OAuth2 应用程序

![Gitea-Drone-CI-CD-20200327211442-2020-03-27](http://imagehosting.wuxiaobai24.fun/blogGitea-Drone-CI-CD-20200327211442-2020-03-27)

应用名称填什么都无所谓，但是重定向 URL 比较重要，要填 `Drone`服务的地址（虽然现在还没启动），比如说，你的 Drone 的 `ip` 地址为`1.2.3.4`，`Drone`端口的为`8000`，
那么就可以填`http://1.2.3.4:8000`。

创建后会得到一个客户端ID和客户端密钥。这时，`Gitea`的设置就已经完成了。

为了让`Drone Server`和`Drone Runer`能够通过`RPC`连接，我们需要生成`RPC`密钥，可以在 shell 中使用该命令来生成随机数，用该随机数作为 RPC 的密钥
```bash
$ openssl rand -hex 16
```

上面的操作中可以得到：

- 客户端 ID
- 客户端密钥
- RPC 密钥

创建一个`drone`文件夹并在其中创建一个`docker-compose.yml`文件：

```yml
version: "3.5"

networks:
  drone:
    name: drone_network

services: 
  drone-server:
    image: drone/drone:1
    ports:
      - 8000:80
      - 443:443
    networks:
      - drone
    volumes:
      - ./drone-data:/var/lib/drone
      - /var/run/docker.sock:/var/run/docker.sock
    restart: always
    environment: 
      - DRONE_GITEA_CLIENT_ID= # Gitea 客户端ID
      - DRONE_GITEA_CLIENT_SECRET= # Gitea 客户端密钥
      - DRONE_GITEA_SERVER= # Gitea URL 地址
      - DRONE_GITEA=true
      - DRONE_RPC_SECRET= # Drone RPC 密钥
      - DRONE_SERVER_HOST= # Drone URL,可以填域名或 ip:port
	  - DRONE_SERVER_PROTO=http # Drone 所使用的协议 http 或者 https
	  # 由于我的 Gitea 的设置是只允许登陆用户访问代码的，所以 Git 需要 Auth
      - DRONE_GIT_ALWAYS_AUTH=true
      - DRONE_GIT_USERNAME= # Gitea 用户名
      - DRONE_GIT_PASSWORD= # Gitea 密码
  drone-agent:
    image: drone/drone-runner-docker:1
    restart: always
    depends_on: 
      - drone-server
    networks:
      - drone
    volumes: 
      - /var/run/docker.sock:/var/run/docker.sock
    environment: 
      - DRONE_RPC_SECRET= # 这里的密钥要和 Server 一样
      - DRONE_RPC_PROTO=http
      - DRONE_RPC_HOST= # 和上面的 DRONE_SERVER_HOST
```

和`Gitea`同理，我们只需要在`docker-compose up -d`即可。

第一次打开 Drone 会先跳到 Gitea 进行验证。由于打开 Drone 会验证 Gitea 是否登陆，所以不用担心 Drone 的页面直接暴露到公网。

### 测试 Drone 和 Gitea

1. 在 Gitea 中创建一个 repo
2. 在 Drone 激活该 repo
3. 创建公钥并加入到 gitea 中（这一步和 Github 类似）
4. 将 repo clone 到本地
5. 创建一个`.drone.yml`文件：
6. git commit and push

`.drone.yml`的样例如下：

```yml
kind: pipeline
type: docker
name: default

steps:
- name: greeting
  image: alpine
  commands:
  - echo hello
  - echo world
```

关于`.drone.yml`的信息可以查看[官方文档](https://docs.drone.io/)。

之后估计也会写一篇 blog 对 Drone 的使用进行下总结。