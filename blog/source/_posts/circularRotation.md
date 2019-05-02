---
title: 回环变位(Circular Rotation)
date: 2017-08-13 13:21:24
tags: java
---



**回环变位**：如果字符串s中的字符循环移动任意位置之后能够得到另一个字符串 t，那么 s 称为 t 的回环变位(Circular Rotation)。例如，"ACTGACG" 就是 "TGACGAC" 的一个回环变位。

### 一般的实现思想
>利用循环的方式遍历字符串t,从循环次数i处将字符串t分成两个字串后交换顺序拼接成一个新的字符串，比较新的s和新的字符串是否相等。


```java
public static boolean isCircularRotation1(String s, String t)
{
	if(s.length() != t.length())   //字符串长度不等则没必要再比较，直接返回false
		return false;
	else
	{
		int N = s.length();
		System.out.println(N);
	for(int i=0; i<=N; i++)
		{
			String subT1 = t.substring(0, i);     //在索引i处分割字符串t
			String subT2 = t.substring(i, N);
			if(s.equals(subT2 + subT1))    //交换顺序连接分割后的字串
				return true;
		}
		return false;
	}
}
```
### 让代码简单点
《算法》(Algorithms)这本书的习题中关于回环变位给了这么一行提示：答案只需要一行用到 indexOf()、length() 和字符串连接的代码。
>怎么实现呢？——将 t 和 t 自身连接，这样如果 t 是 s 的回环变位，那么s肯定是 "t+t" 的一个子串！


方法如下：
``` java
public static boolean isCircularRotation(String s, String t)
{
	return (s.length() == t.length()) && ((t + t).indexOf(s) > 0);
}
```

其中关于字符串对象的方法的具体使用可以参考 javaAPI文档，里面介绍的很详细。

