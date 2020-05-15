---
title: Flutter 安装记录
date: 2020-02-10T17:42:33.000Z
tags:
  - Flutter
  - 踩坑记录
---
## 起因

最近想开始写日记了，但是找了一圈发现好像好用又安全的App几乎没有，主要是怕不安全。很多App是不支持导出什么的,而且存在别人的服务器上总感觉不好，要是公司倒闭了，我们的日记岂不是全没有，就算有导出功能，要迁移到另一个App上好像也是很麻烦的样子。而那些支持保存到Webdev上基本是不加密的，也很危险啊。Whatever，我现在有点想做一个移动端的东西，也就是日记本。

调研了一圈，移动端基本上有三种选择：

- Java + Android
- React Native
- Flutter 

三者之中，Java + Android 应该是最稳的，毕竟有点 Java 基础；React Native 应该是最理想的，因为很容易就迁移到网页上啊；Flutter 应该算是一个比较激进的做法了，比较新技术，有许多坑，不过现在应该还是算挺多人在用了。作为一个有志向的开发者，踩坑才是最好玩的事情啊。whatever，我觉得用 Flutter 来实现这个东西了。BTW，写这篇东西一方面是为了记录安装中遇到的坑，另一方面也是立Flag（捂脸）。

## 安装 Flutter

我使用的环境是 Manjaro Linux，所以可以不按照官网上的方法下载包然后安装，直接：

```bash
sudo pacman -S flutter
```

安装完后显示下面这个东西，只需要按照他这里说明的进行一些配置即可。有一点要注意的是，这些命令全部都需要 root 权限，即在命令前面加 sudo 即可。

![安装Flutter后的输出](http://imagehosting.wuxiaobai24.fun/blogFlutter-安装记录-20200210175913-2020-2-10)


基本上就安装成功了，可以按照`flutter.cn`中给出的安装教程一步步走即可。

## 国情带来的坑

在第一次运行`flutter doctor`之前记得把镜像源配置好，这里可以参考![官方文档](https://flutter.dev/community/china)：

```bash
export FLUTTER_STORAGE_BASE_URL=https://mirrors.tuna.tsinghua.edu.cn/flutter
export PUB_HOSTED_URL=https://mirrors.tuna.tsinghua.edu.cn/dart-pub
```

然后`Gradle`也有一个镜像源需要配置：

一个是项目中`android/gradle/build.gradle`:

```gradle
buildscript {
    ext.kotlin_version = '1.3.50'
    repositories {
        // google()
        // jcenter()
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }

    }

    dependencies {
        classpath 'com.android.tools.build:gradle:3.5.0'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}

allprojects {
    repositories {
        // google()
        // jcenter()
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
    }
}
```

还是有`/opt/flutter/packags/flutter_tools/gradle/flutter.gradle`

```gradle
buildscript {
    repositories {
        // google()
        // jcenter()
        
        maven { url 'https://plugins.gradle.org/m2/' }
        maven { url 'http://maven.aliyun.com/nexus/content/repositories/google' }
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public/' }
        maven { url 'http://maven.aliyun.com/nexus/content/repositories/jcenter'}
    }
```