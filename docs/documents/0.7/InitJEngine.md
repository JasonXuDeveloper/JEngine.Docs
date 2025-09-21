# 代码热更工具

## InitJEngine使用

::: tip

JEngine在Init场景下有2个脚本决定了游戏的热更新，分别是**Updater**和**InitJEngine**，本文将讲述```InitJEngine```的用法

:::

### 编辑器配置

InitJEngine有4个字段需要在编辑器下配置（Init场景），分别是：

- Key，即热更代码的加密秘钥，16位，应该与打包热更资源时给热更DLL配置的密码一样，可以在JEngine面板（菜单栏里找）内设置
- Use JIT，即代码热更模块ILRuntime加载热更代码时使用的模式，默认使用```JIT On Demand```，即一个代码被多次使用后开启寄存器提高性能，相关部分请自行从ILRuntime文档了解
- Use Pdb，即是否使用pdb调试，勾选后才能在Windows的Visual Studio下开启断点调试（需下载安装ILRuntime Debugger并运行游戏进入热更代码后开始调试），该字段仅在编辑器下的开发模式下生效
- Debug，即是否输出调试信息，JEngine有个分块解密热更代码模块会频繁输出相关信息



### 使用

无需关注InitJEngine如何使用，若有了解InitJEngine的想法，请参考[框架原理](./Principle.md)
