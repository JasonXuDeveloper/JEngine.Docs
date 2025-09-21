# 编辑器下热更Button

JEngine Pro对Button做了扩充，使其支持在编辑器下添加热更事件，不需要通过代码注册。

## 切换至热更按钮

1. Unity编辑器下选中带有Button的GameObject
2. 顶部菜单栏，```Component/Change To Hot Button```，或者用快捷键```Shift Alt/Option R```
3. 完成

## 给GameObject添加热更按钮

照常在AddComponent的地方添加Button即可



## 编辑器截图

[![qvJCa4.png](https://s1.ax1x.com/2022/04/06/qvJCa4.png)](https://imgtu.com/i/qvJCa4)



## 使用 

- 非热更的按钮点击事件与常规Button一样，在OnClick下添加事件即可
- 若要添加热更对象的方法作为点击事件，需要在下方HotEvents内新增一个元素，然后进行赋值
  - ClassBind参数为创建热更对象的ClassBind脚本，想要给按钮添加热更对象的点击事件，该对象必须使用ClassBind创建
  - ClassName为热更对象的类型，当为ClassBind参数赋值后，会弹出该ClassBind会创建的全部热更类型，选择需要进行调用方法的热更类型即可
  - MethodName为该热更类型下的全部可以调用的方法，选择需要添加到点击事件的即可
  - Parameters为调用该方法时传的参数（支持传多个），不支持数组、字典、枚举、自定义热更类型

## 参数类型

- 数字类型直接写数字
- 字符串类型直接写字符串
- 布尔值写true或其他（不是true的情况下都当做false）
- UnityObject类型直接拖拽场景内对象（不可以是热更资源）
- Vector等类型有独立界面进行赋值



## 注意事项

- 获取热更按钮可以使用```gameObject.GetComponent<Button>()```，这里的```Button```可以是```UnityEngine.UI.Button```也可以是```JEngine.Pro.Runtime.UI.Button```，没有区别
- 同步参数按钮是指从Pro v1.2升级到Pro v1.3后将老版本数据同步至新版本的按钮，有老版本数据的情况下该按钮会自动显示
- 重置参数按钮是指清空参数数值
- 同步参数会在每次编译热更工程切回Unity工程后自动触发一次（会应用于场景内全部热更按钮）
