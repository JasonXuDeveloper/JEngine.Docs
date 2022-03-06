# ClassBind依赖编辑器

该工具用于查看ClassBind在当前场景中被依赖的情况

## 打开面板

#### 方法一：

- 在Hierarchy中选择带有ClassBind的对象，然后右键JEngine/分析ClassBind依赖即可

  [![H7SVQf.png](https://s4.ax1x.com/2022/02/18/H7SVQf.png)](https://imgtu.com/i/H7SVQf)



#### 方法二：

- 选中GameObject后按下option(alt)- shift-c；或者：
- 在菜单栏选择JEngine/Pro/ClassBind依赖面板，然后对ClassBind赋值（拖拽或用下拉框赋值都可以）





## 分析依赖

[![H7Svhn.png](https://s4.ax1x.com/2022/02/18/H7Svhn.png)](https://imgtu.com/i/H7Svhn)

- 选好ClassBind后，选择该ClassBind挂的类型
- 会自动在该场景内搜索全部引用该类型的字段
- 会自动在该场景内搜索全部引用给类型的热更按钮事件
- 可以点击查看此ClassBind的引用关系，打开对应ClassBind的依赖关系
- 可以点击查看此Button，打开对应按钮的Inspector面板