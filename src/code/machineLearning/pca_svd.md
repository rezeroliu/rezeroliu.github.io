---
icon: pen-to-square
date: 2020-5-15
category:
  - AI
tag:
  - 机器学习
  - 降维
star: true
footer: false
editLink: false
---

# PCA和SVD的区别与联系理解

SVD和PCA是两种常用的降维方法，在机器学习学习领域有很重要的应用例如数据压缩、去噪等，并且面试的时候可能时不时会被面试官问到，最近在补课的时候也顺便查资料总结了一下。
## 主成分分析PCA
对于样本集$X_{m\times n}=\left \{x_{1};x_{2};\dots ;x_{m}\right \}$，每一行表示一个n维样本。PCA将$n$维样本$x_i$投影到一个低维空间中去从而实现降维。具体来说，可以从两个角度来约束投影：**最大化方差**和**最小化投影误差**。有意思的是，从这两个方向推导最后会得到相同的结果。

从最大化方差的角度理解，假设投影的方向为$v$，数据的均值为$\bar{x}=\frac{1}{m}\sum_{i=1}^{m}x_i$,那么使得$X$在方向$v$上的投影方差最大也就是
$$\underset{v}{max}\frac{1}{m}\sum_{i=1}^{m}(x_iv-\bar{x})^2=\underset{v}{max}\,v^TSv  \tag{1}$$
$S$为协方差矩阵，若提前对数据进行零均值化处理，则$S=\frac{1}{m}\sum_{i=1}^{m} x_i^Tx_i =\frac{1}{m}X^TX$，由于$S$是实对称矩阵，因此可以对其进行对角化处理
$$S=VLV^T\tag{2}$$
其中$V_{n\times n}$为正交矩阵，即$V^TV=I$，$V$的每一列都是$S$的一个特征向量。$L_{n\times n}$为对角矩阵，对角线上的值为特征值，和$V$的每一列一一对应并且按值递减排列。将$S$代入目标函数（1）中去，可得
$$v^TSv=v^TVLV^Tv=\lambda\tag{3}$$
所以方差最大值就是最大的特征值。也就是说当投影方向是最大特征值对应的特征向量时，数据在投影方向上的方差最大。因此，主成分分析选取较大的$k$个特征值对应的特征向量进行。投影后的数据为$\widetilde{X}=XV_k$，$V_k$为最大的$k$个特征值对应的特征矩阵。这样就将$X$从$n$维空间压缩到了$k$维。

## 奇异值分解SVD
再说奇异值分解。对于$X$进行奇异值分解可得
$$X=U\Sigma V^T \tag{4}$$
其中，$U_{m \times m}$、$V_{n \times n}$均为单位正交矩阵，$\Sigma$仅在主对角线上有非零值，就是奇异值。

经过奇异值分解可以得到$X$的另一种表达形式，此时再计算$X$的协方差矩阵可得(这里依旧假设$X$已经预先进行了零均值化处理)：
$$S=\frac{1}{m}X^TX=\frac{1}{m}V\Sigma^TU^TU\Sigma V^T=V\frac{\Sigma^2}{m}V^T \tag{5}$$
现在对比式（5）和式（2）就会发现，$X$的奇异值和$S$的特征值存在一一对应关系: $\lambda_i=\frac {\Sigma_i^2}{m}$。
此时再将$X$投影到前$k$个主成分的方向上，可得
$$\widetilde{X}=XV_k=U\Sigma V^TV_k=U_k \Sigma_k\tag{6}$$
其中，$U_k$为$U$的前$k$列，$\Sigma_k$为 $\Sigma$左上角的$k\times k$部分。

## PCA和SVD区别与联系
1. 对$X$进行奇异值分解后，$V$的每一列(特征向量)都是一个主成分的方向，$U_k \Sigma_k$构成了主成分；
2. $X$的奇异值和其协方差矩阵$S$的特征值存在一一对应关系: $\lambda_i=\frac {\Sigma_i^2}{m}$。且特征值$\lambda_i$也是对应主成分的方差；
3. PCA只能获取单个方向上的主成分，而SVD可以获取两个方向上的主成分(行压缩，可以用来去除冗余样本)：
$$S=\frac{1}{n}XX^T=\frac{1}{n}U\Sigma V^TV\Sigma^T U^T=U\frac{\Sigma^2}{n}U^T$$
4. 通过SVD也可以计算PCA，并且通常式更好的选择。因为PCA需要计算$X^TX$，在$X$维数很大的时候计算量很大，并且某些情况下可能会丢失数据精度。

### 参考资料：
https://blog.csdn.net/wangjian1204/article/details/50642732
https://stats.stackexchange.com/questions/134282/relationship-between-svd-and-pca-how-to-use-svd-to-perform-pca
