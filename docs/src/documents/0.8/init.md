# 热更代码配置

该文章将告诉您如何使用JEngine初始化框架功能

[[toc]]



## 前言

上一篇文章，我们成功的对热更资源进行了使用，本文我们将配置热更代码



## 在哪配置

- 打开**Unity项目**
- 进入**Init场景**
- 选择**InitJEngine对象**
- 在**Inspector**上，选择**InitJEngine脚本**





## 配置信息

- `Key`，在快速开始的地方，第一次编译了热更工程代码后输入的**Dll加密密码**（可以在JEngine面板找到）
- `Use JIT`，是否使用寄存器，开启后性能更好，可能会有Bug，可以参考ILRuntime文档使用
- `Use Pdb`，是否使用Pdb文件，开启后可以追踪异常堆栈
- `Debug`，是否开启调试，会有些额外的JEngine的Debug信息
