# 编辑器下热更Toggle

JEngine Pro对Toggle做了扩充，使其支持在编辑器下添加热更事件，不需要通过代码注册。

## 切换至热更Toggle

1. Unity编辑器下选中带有Dropdown的GameObject
2. 顶部菜单栏，```Component/Change To Hot Toggle```，或者用快捷键```Shift Alt/Option L```
3. 完成

## 给GameObject添加热更Toggle

照常在AddComponent的地方添加Toggle即可



## 编辑器截图

![1](https://s1.ax1x.com/2022/07/16/j42ku9.png)

## 使用 

- 非热更的按钮点击事件与常规Toggle一样，在OnValueChanged下添加事件即可
- 若要添加热更对象的方法作为事件，需要在下方HotEvents内新增一个元素，然后进行赋值
  - ClassBind参数为创建热更对象的ClassBind脚本，想要给按钮添加热更对象的点击事件，该对象必须使用ClassBind创建
  - ClassName为热更对象的类型，当为ClassBind参数赋值后，会弹出该ClassBind会创建的全部热更类型，选择需要进行调用方法的热更类型即可
  - MethodName为该热更类型下的全部可以调用的方法，选择需要添加到点击事件的即可（Toggle的OnValueChanged事件仅支持第一个参数为bool的方法）



## 注意事项

- 获取热更按钮可以使用```gameObject.GetComponent<Toggle>()```，这里的```Toggle```可以是```UnityEngine.UI.Toggle```也可以是```JEngine.Pro.Runtime.UI.Toggle```，没有区别