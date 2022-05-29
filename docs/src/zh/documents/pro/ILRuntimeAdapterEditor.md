# ILRuntime适配器生成面板

该工具用于生成跨域继承适配器，支持生成泛型适配器



[[toc]]



## 打开面板

- 在菜单栏选择JEngine/ILRuntime/Generate/Cross bind adapter
- 或者打开JEngine/Pro/Pro工具面板后选择ILRutnime适配器生成面板



## 面板界面

<img src="https://s1.ax1x.com/2022/05/29/XMFbDO.jpg" alt="img1" style="zoom:33%;" />

<img src="https://s1.ax1x.com/2022/05/29/XMFOVe.jpg" alt="img2" style="zoom:33%;" />

<img src="https://s1.ax1x.com/2022/05/29/XMFz8I.jpg" alt="img3" style="zoom:33%;" />



## 与开源版的差异

- 可以直接选择类型并实时预览所属程序集等信息，而开源版必须手动输入类名，且很难匹配到对应类型
- 可以指定泛型类型，并附带泛型参数



## 功能介绍

- 需要生成适配器的类型

  当跨域继承时，需要生成适配器，在这个选项里选择需要生成适配器（也就是需要在热更工程继承）的类型即可

- 泛型参数

  当需要跨域继承的类型是泛型类型（如List）时，需要选择泛型参数，例如跨域继承```List<int>```就如上面示例的图片一样选择即可

- 生成泛型类型

  当需要继承泛型类型，且指定了泛型参数后，需要点击该按钮生成泛型类型，若无法生成则会在控制台输出错误信息

- 生成适配器

  点击此按钮后会根据当前选择的类型生成适配器，如果是MonoBehaviour类型，还会生成编辑器面板和Mono周期脚本



## 注意事项

如果生成出来的适配器报错有重复方法，请从Scripts/Adapters/适配器类Adapter.cs内删除这些重复的方法