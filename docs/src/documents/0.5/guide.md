# 开发须知（v0.5）
本文章包含开发过程中需要注意的地方

## 开发模式
开发模式可以大量提高开发效率，开发时无需一有修改就重新打Bundles

### 步骤
1. 进入**Init场景**

2. 选择**Updater**

3. 勾选**Development Mode**即可开启开发模式，提高开发效率

   <img src="https://s1.ax1x.com/2020/07/16/UBC5uD.png" alt="guide1" style="width:50%;margin-left:25%" />


## 开发指南

- 默认热更场景的**Title对象**，包含一个```LocalizationText```脚本，会导致该组件的```Text```无法被修改，移除```LocalizationText```脚本即可

- 进行**building bundle**时，会弹出一个弹窗要求输入加密密码，共**16位**，用于**加密DLL**
<img src="https://s1.ax1x.com/2020/07/26/apuoHs.png" alt="guide2" style="width:50%;margin-left:25%" />

- **Init场景中**，找到**HotFixCode**，Inspector中Init方法里的Key为DLL加密密码

<img src="https://s1.ax1x.com/2020/07/26/apu7En.png" alt="guide3" style="width:50%;margin-left:25%" />

- 生成项目的时候，**为了避免冗余，请手动删除热更场景**（开发模式会自动将热更场景加入Build Settings）

<img src="https://s1.ax1x.com/2020/07/20/Uhxcuj.jpg" alt="guide4" style="width:50%;margin-left:25%" />

  
## 常见问题

- 热更工程部分Unity类型不存在

  热更工程中需要引用不同的Unity Module，在Unity安装目录，例如JEngine提供的UnityCoreModule等

- Cannot find Delegate Adapter for: **XXX**:

  根据报错，在**Assets/Scripts/Helpers/目录下，打开不同的Helper，往```Register(Appdomain appdomain)``` 方法**中添加报错信息里要求添加的东西即可
  
  <img src="https://s1.ax1x.com/2020/07/14/Ut2RoD.png" alt="guide5" style="width:50%;margin-left:25%" />

- 不存在语言**xx-yy**，自动替换为**xx-zz**
  多语言本地化的错误，多语言配置表格里不存在xx-yy这个语言
  
  JEngine会自动匹配，相似的语种xx-zz，作为当前语言
  
  该Bug可忽略，只需要在多语言表格里配置即可
   
   <img src="https://s1.ax1x.com/2020/09/27/0kAtL4.png" alt="guide6" style="width:50%;margin-left:25%" />


## 如何更新

更新的方法有2种，建议第一种

### 方法一（推荐）
  - 双击使用项目目录/Packages/Core.unitypackage，导入Unity内资源
    > v0.5.5开始，JEngine完成了代码热更底层和业务层分离，这代表了您可以将自己项目中的适配器、注册委托、JSON转换注册、热更加载后事件等，写入Scripts/Helpers目录中的不同文件。这代表了您可以放心导入该整合包，可以放心替换Init.cs和InitILrt.cs，因为您自己的逻辑已被分离，您只需要确保，导入该整合包的时候，如果您的项目已有Scripts/Helper目录，请勿覆盖导入
  - 覆盖更新UnityProject/HotUpdateScripts/JEngine和UnityProject/HotUpdateScripts/Examples目录
### 方法二 
  - 覆盖更新UnityProject/Assets/Dependencies，UnityProject/Assets/Scripts/Init.cs，UnityProject/Assets/Scripts/InitILrt.cs，Init场景，手动对比HotUpdateResources的差异
  - 覆盖更新UnityProject/HotUpdateScripts/JEngine和UnityProject/HotUpdateScripts/Examples目录
  - 对比Scripts/Helpers目录中的文件进行删减

> 注意，覆盖更新热更工程后，需要重新添加JEngine目录的文件至解决方案

   <img src="https://s1.ax1x.com/2020/10/18/0jZToR.png" alt="guide6" style="width:50%;margin-left:25%" />

## 游戏热更新注意事项  By 清行

### 1. 资源热更

Updater 的 `development` 选项 表示 是否是开发环境   
打上对号加载的是`HotUpdateResources`资源   
去掉`对号`加载热更新资源


### 2. 代码热更

#### 1. `.Net Framework4.6.1` 安装不上

>解决方法
>
>右键 -> 解决方案 -> 属性 -> 应用程序 : 目标框架 选择对应的版本，需要```4.x```版本

#### 2. 生成解决方案`DLL`跳过

> 解决方法
>
> 方法一：菜单栏 -> 工具 -> 配置管理器   `生成`的对勾 重新勾一下
>
> 方法二：删除```Assets/HotUpdateResources/Dlls/Hidden~```文件夹，然后再进一下Unity，会自动重新生成文件夹，然后再生成解决方案


## 接入DoTween By L-Fone

> 前言：因DoTween插件的广泛使用，应部分JEngine用户要求，特写本篇教程教大家如何接入DoTween，如有不正确之处，还请留言指正。本人邮箱：275757115@qq.com

**1、导入DoTween**

[![BINzo6.png](https://s1.ax1x.com/2020/11/07/BINzo6.png)](https://imgchr.com/i/BINzo6)

**2、拷贝Dll文件到HotFix的Dlls目录下**

[![BIwh1U.png](https://s1.ax1x.com/2020/11/07/BIwh1U.png)](https://imgchr.com/i/BIwh1U)

[![BIwonJ.png](https://s1.ax1x.com/2020/11/07/BIwonJ.png)](https://imgchr.com/i/BIwonJ)

[![BIwLh6.png](https://s1.ax1x.com/2020/11/07/BIwLh6.png)](https://imgchr.com/i/BIwLh6)

[![BIwX9K.png](https://s1.ax1x.com/2020/11/07/BIwX9K.png)](https://imgchr.com/i/BIwX9K)

[![BIwj1O.png](https://s1.ax1x.com/2020/11/07/BIwj1O.png)](https://imgchr.com/i/BIwj1O)

[![BIwvcD.png](https://s1.ax1x.com/2020/11/07/BIwvcD.png)](https://imgchr.com/i/BIwvcD)

**3、引入dll文件到HotFix工程中**

[![BIwTB9.png](https://s1.ax1x.com/2020/11/07/BIwTB9.png)](https://imgchr.com/i/BIwTB9)

[![BIwqtx.png](https://s1.ax1x.com/2020/11/07/BIwqtx.png)](https://imgchr.com/i/BIwqtx)

[![BI0SnH.png](https://s1.ax1x.com/2020/11/07/BI0SnH.png)](https://imgchr.com/i/BI0SnH)

[![BIwxje.png](https://s1.ax1x.com/2020/11/07/BIwxje.png)](https://imgchr.com/i/BIwxje)

[![BI0pBd.png](https://s1.ax1x.com/2020/11/07/BI0pBd.png)](https://imgchr.com/i/BI0pBd)

**4、使用DoTween**

[![BI09HA.png](https://s1.ax1x.com/2020/11/07/BI09HA.png)](https://imgchr.com/i/BI09HA)

[![BI0PAI.png](https://s1.ax1x.com/2020/11/07/BI0PAI.png)](https://imgchr.com/i/BI0PAI)


> 如果还有其他特殊情况，可以在JEngine群里求助，也可以联系QQ：275757115（L-Fone）







> 下一步，[ILRuntime限制](limits.html)
