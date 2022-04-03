# ClassBind

有的时候，我们会将代码挂到GameObject上（包括Prefab），然而，如果一个GameObject会包含很多热更脚本，一个个手动AddComponent再去赋值太浪费时间，于是就有了自动绑定工具

> Pro版本ClassBind进行了大幅度升级优化，请参考[这里](../pro/ClassBind.md)

[[toc]]



## 强大之处

- 可以将**任意热更类型**实例**绑定到GameObject上**
- **自动调用**绑定的热更类型的**构造函数**
- 可以对**绑定的**任意热更类型**实例**的**字段**进行**赋值**
- 可选**调用**绑定的任意热更**类型实例**的**Awake方法**
- **字段赋值**时**支持**其他用**ClassBind创建的热更类型**



## 应用场景

- UI预制体可以使用ClassBind挂上热更的面板类型，然后对其中的字段（例如Text组件、Button组件等）进行赋值
- 场景内可以使用ClassBind给GameObject挂上热更的Manager并激活，例如实现个AudioMgr来管理热更的AudioClip的播放，并通过ClassBind创建并激活
- 有A、B、C、D四个非单例热更类型，D类内部new了A和B类型的实例，C有分别是A和B类型的字段，创建C后需要对A和B赋值，而A和B的实例在D内，C无法访问，这个时候可以在游戏场景下创建3个GameObject，然后使用ClassBind分别创建A、B与C类型，同时对C实例的字段进行赋值（拖拽使用ClassBind挂A和B类型实例的GameObject到ClassBind挂C的地方的字段里即可）然后D的A和B字段指向```gameObject.GetHotClass<A>()```和```gameObject.GetHotClass<B>()```即可

> 简单来说，ClassBind打破了传统的使用lua和ILRuntime进行热更的开发思路，即主工程（非热更环境）和热更工程必须分离
>
> ClassBind的存在使得在非热更环境下也能创建热更环境的类型实例，并对热更实例进行赋值，不像在标准Unity环境下只能给GameObject挂载MonoBehaviour脚本，ClassBind甚至支持挂载任意类型的热更实例
>
> 也就是说，哪怕你觉得MonoBehaviour性能差，不想使用，你也可以使用ClassBind去挂载非MonoBehaviour派生类的类型，去进行实例化和赋值，彻底打破了热更工程和Unity工程的次元壁，建立了一条道路使得能在Unity工程使用热更工程
>
> 这也意味着，开发时完全可以安排一个人去写热更工程，另外一个人去编辑Unity的场景或预制体，然后只需要挂个ClassBind，再问开发热更工程的人要个热更工程DLL，另一个人就可以在Unity场景或预制体上创建热更类型实例了，不需要让另一个人写什么代码去创建类型实例并赋值之类的乱七八糟的





## 使用方法

1. 给GameObject或预制体**添加Class Bind脚本**
2. ClassBind脚本的**ScriptsToBind数组**中每一个元素代表了一个热更类的实例（不支持同时挂多个ClassBind到同GameObject）
3. **Namespace写命名空间 (默认HotUpdateScripts，即热更命名空间，也可以留空)，Class写脚本类名**
4. **Fields**是需要给该热更类型实例赋值的字段，可以添加多个，需要选择该字段的类型，填写字段名，以及赋值
5. **运行**后会**自动创建热更实例并赋值**，可以勾选Active After自动调用该实例的```Awake```方法（不管该实例是什么类型，有定义这个方法就会被调用 ）
6. **不勾选自动调用的话需要参考下面的步骤**，如果勾选了自动调用可以忽略下面的步骤
7. 代码里获取ClassBind创建的对象，比如```gameObject.GetComponent<ClassBind挂的类型>()```，或```gameObject.GetJBehaviour<ClassBind挂的类型>()```
8. 继承**MonoBehaviour**的脚本，**激活需要enabled = true 以及 调用Awake()**，
9. 继承**JBehabviour**的脚本，直接调用**Activate()**

## 参数介绍

- ```ScriptsToBind```

  - 要添加**多少个**热更DLL里的**脚本**

- ```Namespace```

  - 热更脚本的**命名空间**，**默认HotUpdateScripts**

- ```Class```

  - 热更脚本的**类名**

- ```Active After```

  - **勾选后**，会在绑定后，或绑定+赋值后，只要该类具有```Active()```方法，就会**自动调用激活**
  - **没勾选**，需手动，**参考使用方法**

- ```Fields```

  - **自动赋值**该脚本**多少个值**

- ```Field Type```

  - 该值的**类型**（支持**数字类型**，**布尔值类型**，**字符串类型**，**GameObject**和**挂在GameObject上面的脚本**）

- ```Field Name```

  - 该值在热更脚本里的名字

    ![name](https://s1.ax1x.com/2020/09/05/wEyk9K.png)

- ```Value```

  - 如果```Field Type```不是```GameObject```或```Unity Component```的时候，这里是该Field的数值
    - 如果是**数字或字符串**，直接写进去
    - 如果是**布尔值**，写true或false
    - 如果是**热更资源**，输入资源**完整路径**
    - ```Field Type```为```GameObject```或```Unity Component```或```其他ClassBind创建的类型```的时候，此处```Value```写什么都不会发生效果

- ```GameObject```

  - 如果```Field Type```是```GameObject```或```Unity Component```或```其他ClassBind创建的类型```，直接将那个场景中的GameObject拖拽到这里即可


## 小工具

#### 自动获取全部Field

一个类里面可能有很多Field和Property，一个个去写太费劲，在Unity编辑器下可以点击按钮一键获取

#### 自动矫正field的type

如果全部field一个个去设置type太费劲，在Unity编辑器下可以点击按钮一键匹配每个字段的类型，需要注意的是有的时候无法正确判断，例如GameObject类型的字段，可能是个热更资源，也可能是个场景内GameObject或预制体的子GameObject，这种时候会给个提示，需要自己判断

#### 重新排序全部fields

如果热更工程对某个ClassBind挂载的类型的字段进行了删减，可以使用该功能自动删除不存在的字段，同时该功能还会根据字段的名字对每个字段的位置进行排序



## 注意事项

- 主工程Instantiate一个带有ClassBind的prefab的时候一定要去手动调用该prefab上的ClassBind的BindSelf方法，否则ClassBind无法激活