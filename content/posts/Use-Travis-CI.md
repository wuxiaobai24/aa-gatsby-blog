---
title: Use Travis CI
date: 2019-08-20T00:30:27.000Z
tags:
  - CI/CD
  - Hexo
---
今天简单使用了一下[Travis CI](https://travis-ci.org)。

## 起因

因为搭建[Django-blog](https://github.com/wuxiaobai24/django-blog)时，每次更新一次代码，就需要手动登陆到服务器上进行一系列操作来重启服务，感觉过于麻烦且容易出错，因此想使用 CI/CD 工具来自动化这一过程。

所以这里就简单了解了一下 CI/CD，并尝试使用 [Travis CI](https://travis-ci.org) 来实现 Hexo 的自动化部署。

但考虑到 Travis CI 是一个 SaaS 服务，需要开发服务器的权限来完成部署，所以后面应该会先将`Django-blog`的部署方式转换成`Docker`的方式，然后在搭建`Drone`或`Jenkins`来完成 CI/CD

## CI/CD

- CI(Continuous Integration)即**持续集成**，个人理解是在提交代码后进行一些了测试来确保代码的正确性，保证每个开发者每次提交都会进行测试。
- CD(Continuous Deploy)即**自动部署**，个人理解是在完成了测试后将代码自动化的部署到服务器上，这样就不需要开发者或运维来手动进行代码拉取，设置配置，重启服务等操作了，而是将其自动化。**这个东西其实就是我想要的**

## Travis CI

要使用`Travis CI`来完成自动化部署`hexo`可以分为以下几个步骤：

- 在`Travis CI`网站上将 repo 加入构建
- 在Github生成`Github Access Token`并将其加入到`Travis CI`的环境变量中，这里使用的变量名是`GITHUB_TOKEN`
- 在repo上添加一个`Travis CI`的配置文件：

下面是`.travis.yml`配置文件

```yaml
langaue: node_js
node_js: stable

branches:
    only:
        - save

before_install:
    - npm install -g hexo-cli
    - git clone https://github.com/smduan/next.git themes/next

install:
    - npm install
    - npm install hexo-deployer-git --save
    
script:
    - mv _next_config.yml themes/next/_config.yml
    - hexo clean
    - hexo generate

after_script:
    - git config user.name "wuxiaobai24"
    - git config user.email "wuxiaobai24@foxmail.com"
    - sed -i "s/GITHUB_TOKEN/${GITHUB_TOKEN}/g" ./_config.yml
    - hexo deploy
```

