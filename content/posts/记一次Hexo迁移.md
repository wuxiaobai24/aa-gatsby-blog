---
title: 记一次Hexo迁移
date: 2019-02-14T09:08:44.000Z
tags:
  - Hexo
  - blog
---
> 很久没有写过Blog了, 而且也把系统换成了Manjaro, 所以又要再配置一次Hexo的环境等等, 为了下次迁移的时候, 能更快的搞定, 所以记录一下这次迁移的过程.

## 获取源文件

Hexo如果需要迁移的话, 只需要保留以下几个文件即可:

- _config.yml
- theme/
- source/
- scaffold/
- package.json
- .gitignore

因为之前已经迁移过一次了, 所以我的源文件都已经保存在github上了, 在[wuxiaobai24.github.io](https://github.com/wuxiaobai24/wuxiaobai24.github.io)起了一个`save`分支来保存文件.

所以获取源文件, 我只需要:

```shell
$ git clone git@github.com:wuxiaobai24/wuxiaobai24.github.io.git
```

## 安装Hexo

这一步网上大多教程都写的很清楚了, 这里简略提一下, 主要是以下几个步骤:

1. 安装npm
2. 用npm安装hexo
3. hexo init blog
4. 把上面提到的源文件全部拷贝到blog文件夹中

**注意:这里的blog文件最好放在wuxiaobai24.github.io目录下**, 这样利用backups.sh可以很快的把源文件拷贝到blog文件夹中, 但是**记得把backups.sh里面最后三行关于git的删去或注释掉**

## 安装依赖

1. 首先先把主题安装下来先, 之前因为忘记了这个, 导致`hexo generate`失败

    ```shell
    $ git clone git@github.com:litten/hexo-theme-yilia.git themes/yilia
    ```

2. npm install

3. 检测是否成功

    ```shell
    $ hexo g
    $ hexo s
    ```

## 构建快速的写作环境

1. 将blog移到任何你想要放的位置, 然后把之前的`wuxiaobai24.github.io`文件夹删去
2. 在blog目录下, `git clone git@github.com:wuxiaobai24/wuxiaobai24.github.io.git`
3. 在vscode中安装`vscode-hexo`插件

主要的工作流为:

1. vscode中`> hexo new`生成新的文章
2. 写文章, 并`> hexo generate`
3. vscode中`> hexo deplot`部署
4. 最后在命令行下切换到`blog/wuxiaobai24.github.io`中, 执行`backups.sh`备份源文件.

PS: 个人建议把主题的config.yml也备份一下.
