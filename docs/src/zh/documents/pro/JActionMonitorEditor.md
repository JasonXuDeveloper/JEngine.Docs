# JAction运行时监控面板

该工具用于查看运行时全部创建的JAction的情况



[[toc]]



## 打开面板

- 在菜单栏选择JEngine/Pro/JAction分析面板



## 面板界面

![preview](https://s1.ax1x.com/2022/05/28/XuTYKf.jpg)





## 功能介绍

### 左侧

- 刷新按钮

  > 点击后会手动刷新面板
  >
  > 不点击面板也会每帧自动刷新

- 对象池内可复用对象总数

  > 若总数大于0，下一次```new JAction()```的时候会从池子中取出来对象复用

- 执行中的JAction

  > 正在执行的JAction的列表

- 在后台的JAction

  > 创建出来的没有在执行的JAction的列表（可能是没Execute或执行完毕的）

- 已释放的JAction

  > 调用了Dispose方法的JAction的列表

### 右侧

- 选中的JAction

  > 选中的JAction的名字

- JAction状态

  > 执行中/后台中/已释放

- JAction是否为从对象池中复用的

  > 勾选时代表该JAction是复用的

- JAction是否在主线程执行

  > 勾选时代表该JAction将在主线程执行

- JAction的任务进度

  > JAction的任务进度，当前进度/任务总数

- JAction执行的任务描述

  > JAction的任务描述，如等待n秒，执行Do的任务等

- 释放该JAction

  > 该按钮只会在后台中的JAction详情界面里显示
  >
  > 点击后会调用该JAction的Dispose方法
  >
  > 点击后该JAction不可在再使用



## 注意事项

若某个JAction以Parallel的方式同时多次执行，会导致面板上数据异常