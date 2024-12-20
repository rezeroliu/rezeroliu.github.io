---
icon: pen-to-square
date: 2020-6-03
category:
  - 刷题笔记
tag:
  - 贪心算法

permalink: /code/leetcode/leetcode-55.html
---

# Leetcode.45 跳跃游戏II
> 给定一个非负整数数组，你最初位于数组的第一个位置。数组中的每个元素代表你在该位置可以跳跃的最大长度。你的目标是使用最少的跳跃次数到达数组的最后一个位置。
  **示例**
&emsp;输入: [2,3,1,1,4]
&emsp;输出: 2
&emsp;解释: 跳到最后一个位置的最小跳跃数是 2。
     &emsp;&emsp;从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
## 思路：还是贪心算法

对于每个位置，维护当前可以到达的最远位置(边界)，保存这个边界位置并继续遍历数组并更新每个位置可以到达的最远位置，如果遍历到了边界，则更新边界为当前可以到达的最远位置，并且步数+1。注意到只需要遍历到倒数第二个位置，因为如果最后一个位置可以到达，那么在倒数第二个位置的时候，边界一定是大于等于最后一个位置的。
这里就需要考虑**末尾是否可以到达**这个问题了，虽然题目说了假设总可以到达最后一个位置，但是多考虑一点肯定没坏处。代码中注释的很清楚了，如果遍历到某个边界位置，并且边界位置就是更新后的最远可到达位置，那么最远只能到达当前位置。

```java
class Solution {
    public int jump(int[] nums) {
        int steps = 0;
        int maxPos = 0, end = 0;
        for(int i = 0; i < nums.length - 1; i++){
            maxPos = Math.max(maxPos, i + nums[i]);   // 更新可以到达的最远位置
            if(i == end){                     // 到达边界则更新边界，跳跃步数+1
                if(end == maxPos) return -1;    // 已经到达边界处，并且发现边界处就是最远可以到达的位置，那么肯定无法到达最后一个位置
                end = maxPos;
                steps++;
            }
        }
        return steps;
    }
}

```
