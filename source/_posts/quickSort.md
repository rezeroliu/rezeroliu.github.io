---
title: 快速排序算法——python实现
mathjax: true
date: 2018-05-10 17:11:36
tags: python
---

**快速排序的思想**
 
首先在数组中任意选取一个数（通常选第一个数）作为标志数据，通过比较将有比它小的数全放到它前面，比它大的数全放到它后面，这样完成一趟排序。

一趟排序的流程为：
1. 初始时i=0, j=N-1。其中N为数组长度；
2. 选择标志数据key，通常设置key = Array[0]；
3. 从数组尾部向前遍历（j --），找到第一个比key小的数A[j]，交换A[i]和A[j]的位置；
4. 从数组首部向后遍历（i ++），找到第一个比key大的数A[i]，交换A[i]和A[j]的位置；
5. 重复步骤3和4直到i=j。

一趟排序之后标志数据将数组分成了左右两部分，左边的数应当都小于它而右边的数都比它大。再利用递归的思想，对左右两部分分别进行同样的操作，最终实现对数组的排序。

``` python
#快速排序的递归实现

def quickSort(arr, low, high):
    i = low
    j = high
    if i >= j:
        return arr
    key = arr[i]       #设置标志数据
    while i < j:
	    #从尾部向前遍历，找到第一个比key小的数
        while arr[j] >= key and i < j:   
            j = j - 1
        arr[i] = arr[j] 
        #从首部部向前遍历，找到第一个比key大的数  
        while arr[i] <= key and j > i:
            i = i + 1
        arr[j] = arr[i]
    arr[i] = key
    #一轮之后数组分成了左右两部分，用同样的思想分别进行递归
    quickSort(arr, low, i-1)
    quickSort(arr, i+1, high)

#测试函数
def test():
    Arr = [7, 5, 4, 80, 3, 2, 19, 8, 11, 23, 4, 6, 1, 53, 27, 9, 20]
    quickSort(Arr, 0, len(Arr) - 1)
    print(Arr)

if __name__ == '__main__':
    test()
```

快速排序算法的平均时间复杂度为O(nlgn)，标志数据的位置选择会影响算法的效率，最坏情况下时间复杂度可能为O(N^2)。
