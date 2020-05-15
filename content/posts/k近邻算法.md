---
title: k近邻算法
date: 2018-02-13T22:21:27.000Z
tags:
  - 机器学习
---
刚看了有关`kNN`的东西，总结一下：

kNN算法（k-近邻算法）是一种可用于分类和回归的非参数统计方法。
- 分类算法：最近的k个邻居进行投票得到类别
- 回归算法：最近的k个邻居的平均数

这里只讨论分类算法。

先给个直观的理解，比如现在我们要判断一个人是男生还是女生，我们只考虑身高、体重这两个特征。显然如何两个人的身高体重越相近，那么他们的性别就越相近。kNN就是基于这个直观的想法来做的，如果我们要判断`x`是什么类别，我们就在`train data`中找出与`x`最相邻的`k`个数据，然后通过投票机制来觉得最后的分类。

这里我们就需要定义距离了：

简单的就用欧几里得距离（即`L2`距离）
$\sqrt((x_1 - y_1)^2 + ... + (x_2 - y_2)^2)$


给出demo代码（参考机器学习实战）：

```python
def classify0(inX, dataSet, labels, k):
    dataSetSize = dataSet.shape[0]
    # 欧式距离计算
    diffMat = np.tile(inX, (dataSetSize,1)) - dataSet
    sqDiffMat = diffMat**2
    sqDistance = sqDiffMat.sum(axis=1)
    distances = sqDistance**0.5
    #找出前k个距离最小的sample
    sortedDistIndicies = distances.argsort() # 这里返回的是indicies
    classCount = {}
    for i in range(k):
        voteIlabel = labels[sortedDistIndicies[i]]
        classCount[voteIlabel] = classCount.get(voteIlabel, 0) + 1
    sortedClassCount = sorted(classCount.items(), 
                              key=operator.itemgetter(1), reverse=True)
    return sortedClassCount[0][0]
```