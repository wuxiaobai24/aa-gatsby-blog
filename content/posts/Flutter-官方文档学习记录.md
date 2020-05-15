---
title: Flutter 官方文档学习记录
date: 2020-02-10T19:39:54.000Z
tags:
  - Flutter
  - 学习记录
---
## 编写第一个 Flutter 应用

> [Get Start](https://flutter.cn/docs/get-started/codelab)

- 在 Flutter 中，几乎所有都是 widget，包括对齐 (alignment)、填充 (padding) 和布局 (layout)。
- 一个 widget 的主要工作是提供一个 build() 方法来描述如何根据其他较低级别的 widgets 来显示自己。
- `pubspec.yml`文件管理 Flutter 应用的资源（assests），如图片或 package。
- `flutter pub get`可以按照`pubspec.yml`安装包，BTW，在你一保存该文件时，vscode 会自动帮你执行该命令。
- 每次 MaterialApp（或者说 组件）需要渲染时，或者在 Flutter inspector 中切换平台时 build 方法都会执行
- `Stateless Widgets`是不可变的，即所有值都是`final`的
- Stateful widgets 持有的状态可能在 widget 生命周期中发生变化，实现一个 stateful widget 至少需要两个类： 1）一个 StatefulWidget 类；2）一个 State 类，StatefulWidget 类本身是不变的，但是 State 类在 widget 生命周期中始终存在。
- 在 Dart 语言中使用下划线前缀标识符，会强制其变成私有。

## Dart 开发语言概览

> [https://dart.cn/guides/language/language-tour](https://dart.cn/guides/language/language-tour)

- 所有变量引用都是**对象**，每个对象都是一个**类**的实例，包括数字，函数和null。所有类都继承与 Object 类。所有变量的初始值都是`null`
- Dart 是强类型语言，但是支持类型推断，并且可以用`dynamic`声明不确定的类型。
- Dart中用以 `_` 开头的标识符来标识 私有。
- 建议通过`var`来声明局部变量而非指定其类型，如`var i = 1;`
- `final`关键词修饰变量表示该变量只能被初始化一次，而`const`关键词修饰变量表示该变量是编译时常量。如果用`const`修改类中的变量，则必须为其加上`static`关键字，即`static const`。
- 可以将构造函数声明为 const，这种构造函数创建的对象是不可变的。
- Dart 内置类型`numbers`,`strings`,`booleans`,`lists`,`sets`, `maps`, `runes`, `symbols`。
-  

