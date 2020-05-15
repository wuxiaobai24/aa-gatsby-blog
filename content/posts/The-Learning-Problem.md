---
title: The-Learning-Problem
date: 2017-11-26T15:17:47.000Z
tags:
  - Machine-Learning
---
最近看完了`Machine-Learning-Foundations`的第一个单元，做一个下总结吧。

* humman learning
  * acquiring skill with experience accumulated from observation
    即 observation -> learning -> skill
* machine learning:
  * auquiring skill with experience accumulated/computed from data

skill <=> improve some performance measure
so
`Machine Learning`: improving some performance measure with experience computed from data.

The key essence of Machine Learning:

1. exists some `underlying pattern` can be improved
1. but no programmable (easy) definition
1. somehow there is data about pattern.

形式化机器学习：

* Input: $x \in X$
* Output: $y \in Y$
* target-func: $X->Y$

the target-func <=> unknown pattern to be learned.

data <=> traning example <=> $D = \{ (x_1,y_1),(x_2,y_2),... \}$

hypothesis <=> skill with hopefully good example.

![mark](http://olrv1mriz.bkt.clouddn.com/blog/171126/0hG24B2BCJ.png?imageslim)

Machine Learning:

use data to compute hypothesis g that approximates target f.