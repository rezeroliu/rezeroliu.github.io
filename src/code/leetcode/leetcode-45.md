---
icon: pen-to-square
date: 2020-6-02
category:
  - 刷题笔记
tag:
  - 贪心算法

permalink: /code/leetcode/leetcode-45.html
# star: true
# footer: false
# editLink: false
---

# Leetcode.55 跳跃游戏
> 给定一个非负整数数组，你最初位于数组的第一个位置。数组中的每个元素代表你在该位置可以跳跃的最大长度。判断你是否能够到达最后一个位置。
  **示例1**：
   &emsp;输入**: [2,3,1,1,4]
      &emsp;输出: true
      &emsp;解释: 位置0 -> 位置1 -> 末尾
  **示例2**：
    &emsp;输入: [3,2,1,0,4]
    &emsp;输出: false
    &emsp;解释: 最远到达位置3，之后再无法向后跳
## 思路一：贪心法
贪心算法的思路跟简单，从前向后遍历每个位置，若当前位置能达到，则更新可以到达的最远的位置，最后若能到达最后一个位置返回true。
```java
class Solution {
    public boolean canJump(int[] nums) {
        int maxposition = 0;
        for(int i = 0; i < nums.length; i++){
            if(maxposition >= i){  // 能到达当前位置则更新可以到达的最远位置
                maxposition = maxposition > (i + nums[i]) ? maxposition : i + nums[i];
            }
            else{   //当前位置不可到达，返回false
                return false;
            }
        }
        return true;
    }
}
```
## 思路二：从后往前遍历（不知道叫什么方法好）
如果最后一个位置可以到达，那在它的前面一定存在位置i,i到最后一个位置的距离小于等于nums[i]。这么讲好像不是很清楚，先看代码吧
```java
class Solution {
    public boolean canJump(int[] nums) {
        int n = 1;  //到达后一个位置需要的步数
        for(int i = nums.length - 2; i >= 0; i--){
            if(nums[i] >= n){ // 当前位置可跳跃的距离大于到后一个需要到达位置的距离，那么它前一个位置只要能到达自己就可以
                n = 1;
            }
            else{    // 如果当前位置无法到达后一个需要到达的位置，则需要跳跃的距离+1
                n++;
            }
        }
        return n == 1;
    }
}
```
具体来说，每个位置都希望找到它前面最近(n=1)的一个可以到达自己的位置，如果找到这个位置pos，那继续往前找到可以到达pos的位置，直到搜索到起始位置。
以[2,3,1,1,4]为例，首先n=1，接下来：nums[3] >= n=1可以到达位置4（n更新为1）-> nums[2] >= n=1可以到达位置3（n更新为1）-> nums[1] >= n=1可以到达位置2（n更新为1）-> nums[0] >= n=1可以到达位置1（n更新为1）
但是对于[3,2,1,0,4]，初始n=1，nums[3] < n=1无法到达位置4（n更新为2）-> nums[2] < n=2无法到达位置4（n更新为3）-> nums[1] < n=3无法到达位置4（n更新为4）-> nums[0] < n=1无法到达位置4（n更新为2）
