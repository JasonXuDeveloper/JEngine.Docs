# 编辑器下Button添加热更事件

ClassBind是JEngine的核心功能之一，在Pro版本内，框架对该功能做了巨大优化。

## 编辑器

与开源版本的该功能进行对比，新的面板更加简洁便捷，大幅度提高了开发效率

[<img src="https://z3.ax1x.com/2021/08/01/WxBqVf.png" alt="WxBqVf.png" style="zoom: 67%;" />](https://imgtu.com/i/WxBqVf)



## 支持类型

新的ClassBind，不仅包含了开源版所支持的类型，还包含了数组类型：

- **Primitive Type List** 是基元类型的数组（或列表），泛指数字类型、字符串类型和布尔值类型
- **Unity Object Type List** 是Unity类型的数组（或列表），泛指GameObject、Transform、主工程的MonoBehaviour脚本等基于UnityEngine.Object的类型实例。但与此同时，该类型也支持往其中拖拽使用ClassBind创建的非UnityEngine.Object的实例，拖入对应ClassBind的gameObject即可，底层会自动进行获取处理

与此同时，需要注意的是Unity Component类型也可以获取ClassBind创建的非UnityEngine.Object的实例，底层会自动处理



## 自动匹配gameObject

在Pro版本内，当fieldType为GameObject或UnityComponent时，可以一键自动匹配字段名所对应的gameObject，而无需手动拖拽。

需要注意以下几点：

- 只能自动匹配挂了ClassBind脚本的这个gameObject的子对象
- 默认的正则匹配规则是_，例如Canvas挂了ClassBind，字段名是a_b，那么会自动匹配Canvas/a/b这个gameObject，该正则规则可以更改，在JEngine面板内可以进行更改
- 框架提供了下划线和驼峰的匹配模式正则，只需要在面板对应部分进行填写即可，需要匹配规则和替换规则（不懂的就老老实实用框架提供的）
- 如果正则匹配不成功，没有匹配到东西，就会进行递归子对象，若是匹配到与fieldName相等的子对象名称，则结束递归，给这个字段赋值该子对象

该功能可以在2个地方调用：

- ClassBind面板最底部
- JEngine面板的ClassBind工具处



## 运行时

对比开源版，运行时现在也支持序列化数组（或列表）了。

但需要注意的是，热更类型的数组（或列表），只支持序列化到面板，但不能通过拖拽等方式对其值进行修改（以后可能会支持拖拽用ClassBind创建热更实例的热更实例来更新数组/列表）

[![WxDhwV.jpg](https://z3.ax1x.com/2021/08/01/WxDhwV.jpg)](https://imgtu.com/i/WxDhwV)
