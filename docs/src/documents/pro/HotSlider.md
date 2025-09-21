# 编辑器下热更Slider

JEngine Pro对Slider做了扩充，使其支持在编辑器下添加热更事件，不需要通过代码注册。

## 切换至热更Slider

1. Unity编辑器下选中带有Slider的GameObject
2. 顶部菜单栏，```Component/Change To Hot Slider```，或者用快捷键```Shift Alt/Option S```
3. 完成

## 给GameObject添加热更Slider

照常在AddComponent的地方添加Slider即可



## 编辑器截图

![1](https://s1.ax1x.com/2022/07/16/j4gDk6.png)

## 使用 

- 非热更的按钮点击事件与常规Slider一样，在OnValueChanged下添加事件即可
- 若要添加热更对象的方法作为事件，需要在下方HotEvents内新增一个元素，然后进行赋值
  - ClassBind参数为创建热更对象的ClassBind脚本，想要给按钮添加热更对象的点击事件，该对象必须使用ClassBind创建
  - ClassName为热更对象的类型，当为ClassBind参数赋值后，会弹出该ClassBind会创建的全部热更类型，选择需要进行调用方法的热更类型即可
  - MethodName为该热更类型下的全部可以调用的方法，选择需要添加到点击事件的即可（Slider的OnValueChanged事件仅支持第一个参数为float的方法）



## 注意事项

- 获取热更按钮可以使用```gameObject.GetComponent<Slider>()```，这里的```Slider```可以是```UnityEngine.UI.Slider```也可以是```JEngine.Pro.Runtime.UI.Slider```，没有区别