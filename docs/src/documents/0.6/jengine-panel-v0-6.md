# JEngine面板（v0.6）
JEngine为Unity开发设计的面板

## 功能
JEngine面板支持双语且包含实用功能

### 启动场景
Unity编辑器运行游戏后，会自动跳转至启动场景

### 运行后跳转启动场景
默认勾选，勾选后，启动场景才会奏效

### 上次处理热更DLL实际
该栏只读，为上次热更DLL编译时间

### 热更场景快捷操作
此处可以快捷处理热更场景，可以进行筛选

#### 打开
可以打开选中的热更场景

#### 加载
在当前场景中，加载选中的热更场景（Additive模式）

#### 卸载
若当前场景中包含选中的热更场景，点击后会卸载（卸载Additive添加的场景）

### ClassBind助手
批量处理全部ClassBind

#### 自动获取全部field
自动获取场景内全部ClassBind对应的类型的field

#### 自动获取全部fieldType
自动获取场景内全部ClassBind，对其Field自动分析Type

### 错误修复工具

#### 程序集不存在错误
比如出现类似```Cannot find Type or Namespace of ILRuntime```的错误，点击按钮可一键修复


## 面板截图
<img src="https://s3.ax1x.com/2020/12/11/rkNP1O.png" alt="rkNP1O.png" border="0" style="width: 50%;margin-left: 25%">

> 恭喜，JEngine框架核心篇已完成！