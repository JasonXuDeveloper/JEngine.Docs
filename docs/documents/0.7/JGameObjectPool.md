# 对象池解决方案

## JGameObject对象池

JGameObjectPool是一个GameObject对象池

::: tip

JGameObjectPool能干什么？

- 创建GameObject
- 从池内取GameObject
- 灵活使用优化性能

:::



[[toc]]



## 概括

JGameObjectPool可以在大量复用GameObject的时候起到奇效（例如无限滚动列表）

只需要请求PoolObject获取对象，将其active设置为true就是取出，将其active设置为false就是还入池子内



## 命名空间

- ```csharp
  using JEngine.Core;
  ```

## API

- ```csharp
  public GameObject PoolObject; //从对象池内获取对象
  ```



## 使用

1. 在Unity编辑器下，进入一个场景
2. 选中一个要挂载对象池的GameObject
3. 挂上ClassBind
4. 命名空间写```JEngine.Core```，类名写```JGameObjectPool```
5. 点击ClassBind内的自动匹配字段
6. 给字段赋值
   1. ```OriginalObj```是池的对象的原对象，可以是Prefab或场景内的GameObject（Prefab要选HotUpdateResource并填路径）
   2. ```Parent```是对象池生成```OriginalObj```后生成出来的东西的父Transform
   3. ```pooledAmount```是池子初始化时的总数（即初始化是生成几次```OriginalObj```）
   4. ```lockPool```是是否需要锁池子，如果池子被锁了，且没有空余的对象去返回，就会返回null，而如果没锁池子，如果没空余的对象去返回就会生成新的，并给池子扩容
   5. 除此之外的字段可以删了
7. 代码里获取到```JGameObjectPool```后调用其```PoolObject```即可
8. 使用完毕后将gameObject的active设为false自动释放，否则不会释放