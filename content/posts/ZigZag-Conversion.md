---
title: ZigZag Conversion
date: 2019-02-15 17:42:54
tags:
- LeetCode
categories:
- LeetCode
- tags
---

> 第二天。今天AC掉了一道之前没AC掉的题目。。。

今天的题目是[6. ZigZag Conversion](https://leetcode.com/problems/zigzag-conversion/)

题目描述：

The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

```
P   A   H   N
A P L S I I G
Y   I   R
```

And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

```cpp
string convert(string s, int numRows);
```

Example 1:

```
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
```

```
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:

P     I    N
A   L S  I G
Y A   H R
P     I
```

恩，又是一道“编程题“， 并不涉及到什么算法，静下心来仔细想想还是能做出来的。做这道题的思路就是**一点一点跑例子**，找出其中的规律就好了。

我们先以输入为`s = "PAYPALISHIRING", numRows = 3`为例子，这是题目给出的例子，正确答案已经有了。

先把Z字型画出来（不难发现，题目在最开始其实已经给出了答案）：

```
P   A   H   N
A P L S I I G
Y   I   R
```

观察上面的例子我们可以发现：

- 第一行中的元素在原来的字符串中下标相差4个。
- 第二行中的元素在原来字符串中下标相差2个。

ok，看起来好像找到了一些规律，继续跑一个例子验证一下，这次的输入是`s = "PAYPALISHIRING", numRows = 3`，把Z字型画出来：

```
P     I    N
A   L S  I G
Y A   H R
P     I
```

可以看到第一行的元素在原来字符串中的下标相差6个，但是第二行却出现了一些不一样的情况：

- `A`与`L`相差4个，`L`与`S`却相差2个
- `S`与`I`相差4个，`I`与`G`却相差2个

看起来`offset`是有规律的，而且好像需要分成两种情况，继续看看第3行：

- `Y`与`A`相差2个，`A`与`H`相差4个
- `H`与`R`相差4个，如果还有元素的话，下一个元素与`R`之间显然相差2个。

从上面的例子来看显然是要分成两种情况的，某一行中下标之间的`offset`是不断在两个数字间不断变换的。

我们尝试用两个数组来保存这些`offset`，我们把这两个数组定义为`skipDown`和`skipUp`。其中`skipDown`表示下标在z字型中经过了一个向下的剪头，如第二个例子中，第一行的`P`移动到`I`时，`P`经过了`AYPAl`组成的向下的剪头。`skipUp`同理可推。

如果我们继续跑例子的话，应该是比较容易找出规律的：

- 第`i`行的`skipDown`为`2*(i-1)`，而第一行和最后一行的`skipDown`都应该为`2*(numRows)`。
- `skipDown`与`skipUp`是逆序的关系。

综上，我们可以写出下面的代码：

```cpp
string convert(string s, int numRows) {
    if (numRows < 2) return s;
    vector<int> skipDown(numRows);
    vector<int> skipUp(numRows);
    
    skipDown[0] = 2*(numRows-1);
    skipUp[0] = 0;
    for(int i = 1;i < numRows; i++) {
        skipDown[i] = skipDown[i-1] - 2;
        skipUp[i] = skipUp[i-1] + 2;
    }
    
    skipDown[numRows-1] = skipDown[0];
    skipUp[0] = skipUp[numRows-1];
    
    string res(s.size(), ' ');
    
    int index = 0;
    for(int i = 0;i < numRows; i++) {
        bool flag = true;
        for(int j = i;j < s.size();index++) {
            res[index] = s[j];

            if (flag) { j += skipDown[i]; }
            else { j += skipUp[i]; }
            
            flag = !flag;
        }
    }
    return res;
}
```

当然这肯定不是最优的代码，比如其实我们可以不用两个数组，甚至不用数组来保存的`offset`，但是这样写会比较容易理解，代码会比较简单点。