---
title: quickSort效率分析以及改进
date: 2017-10-01T14:02:37.000Z
tags:
  - sort
  - 算法
---
终于找到时间来写这个了。

上半个月一直在做算法课的实验，实验的大概内容是实现几个基本的排序算法，分别用不同的规模去测试然后进行分析。

恩，当然现在我只想扯扯快排。

先放段代码：

```c++
void quicksort(int a[], int first, int last) {  //注意待排序列为: a[first,last]
    if (first < last) {                         //递归结束条件：first >= last
        int mid = partition(a,first,last);      //找出枢点
        quicksort(a, first, q1 - 1);
        quicksort(a, q2 + 1, last);
    }
}

int partition(int a[], int first, int last) {                //O(last-first + 1)

    int key = a[first];
    while (first < last) {
        //在两个循环中，当last在动时，first所指向的元素是多余的，反之亦然。
        //所以当first和last指向同一个元素时，这个元素显然是多余的，而这个位置就是key最后的位置。

        while (first < last && a[last] >= key) last--;      //注意要满足的是x <= k <= y
        a[first] = a[last];
        while (first < last && a[first] <= key) first++;    //如果内层循环中的条件缺少=，会出现死循环。
        a[last] = a[first];
    }
    a[first] = key;
    return first;
}
```

首先是测出的数据和利用比值的方法（基准是n=100000）计算的出来的理论值（单位是ms):

![mark](http://olrv1mriz.bkt.clouddn.com/blog/171001/Hac36HaC9h.png?imageslim)

画成散点图：

![mark](http://olrv1mriz.bkt.clouddn.com/blog/171001/l346eJD289.png?imageslim)

由于n的差距过大，导致大部分点看不清，所以进行对数化在进行绘图：

![mark](http://olrv1mriz.bkt.clouddn.com/blog/171001/lLhkC8K650.png?imageslim)

从前面的数据我们可以发现快排时间复杂度是`O(nlogn)`，但是他其实是不稳定的。

我们向排序算法喂入一些比较极端的数据：

![mark](http://olrv1mriz.bkt.clouddn.com/blog/171001/F37kHbFCK4.png?imageslim)

![mark](http://olrv1mriz.bkt.clouddn.com/blog/171001/F0DIkchF6E.png?imageslim)

快排有一个比较奇葩的特性就是序列越乱越快。

我们对原来的算法进行一些改进：

```c++
int partition(int a[], int first, int last) {                //O(last-first + 1)

    swap(a[first],a[ rand() % (last - first + 1) ]);        //让key的选取随机化
    int key = a[first];
    while (first < last) {
        //在两个循环中，当last在动时，first所指向的元素是多余的，反之亦然。
        //所以当first和last指向同一个元素时，这个元素显然是多余的，而这个位置就是key最后的位置。

        while (first < last && a[last] >= key) last--;      //注意要满足的是x <= k <= y
        a[first] = a[last];
        while (first < last && a[first] <= key) first++;    //如果内层循环中的条件缺少=，会出现死循环。
        a[last] = a[first];
    }
    a[first] = key;
    return first;
}
```

改进后，快排的在遇到顺序和倒序的序列时就不会出现最坏情况了：

![mark](http://olrv1mriz.bkt.clouddn.com/blog/171001/ebBLA1FIk4.png?imageslim)

但是对于重复序列，这个算法仍然不能很好的解决。

在《算法导论》快排那一章的习题中有提到一个算法去解决这种情况，大概的想法是每次`分`的时候把序列分成三个区域，第一个区域是小于key的值，第二个区域是等于key的值，第三个区域是大于key的值，这样遇到大量重复元素的时候，partition能够很好处理这种情况。

但是看完这个算法就想着实现以下：

```c++
void partition(int a[], int first, int last, int &q1, int &q2) {
    swap(a[first], a[first + rand() % (last - first + 1)]);//使得轴点的选取随机化，减少最坏情况的出现的概率
    q1 = first;
    q2 = last;
    int key = a[first];
    while (q1 < q2) {
        //在两个循环中，当last在动时，first所指向的元素是多余的，反之亦然。
        //所以当first和last指向同一个元素时，这个元素显然是多余的，而这个位置就是key最后的位置。

        while (q1 < q2 && a[q2] >= key) q2--;   //注意要满足的是x <= k <= y
        a[q1] = a[q2];
        while (q1 < q2 && a[q1] <= key) q1++;   //如果内层循环中的条件缺少=，会出现死循环。
        a[q2] = a[q1];
    }
    a[q1] = key;
    while (q1 >= first && a[q1 - 1] == key) q1--;   //解决重复元素
    while (q2 <= last  && a[q2 + 1] == key) q2++;
}

void quicksort(int a[], int first, int last) {      //注意待排序列为: a[first,last]
    if (first < last) {                             //递归结束条件：first >= last
        int q1, q2;
        partition(a, first, last,q1,q2);            //找出轴点的位置
        //q1 = q2 = partition(a, first, last);
        quicksort(a, first, q1 - 1);
        quicksort(a, q2 + 1, last);
        int *b = new int[last - first + 1];
        for (int i = first; i <= last; i++)
            b[i - first] = a[i];
        delete[] b;
    }
}

```

其实仔细看的话，我这样写是没能达到三分的，不过他在处理大量重复数据的时候也能很好工作。

然后是真正实现三分的算法：

```c++
void quickSort3Way(int a[], int lo, int hi) {

    if (lo < hi) return;
    int lt = lo;
    int i = lo + 1;
    int gt = hi;
    swap(a[lo], a[rand() % (hi - lo + 1)]);
    int v = a[lo];
    while (i <= gt) {
        if (a[i] < v)
            swap(a[lt++], a[i++]);
        else if (a[i] > v)
            swap(a[i], a[gt--]);
        else
            i++;
    }
    quickSort3Way(a,lo, lt - 1);
    quickSort3Way(a,gt + 1, hi);

}
```