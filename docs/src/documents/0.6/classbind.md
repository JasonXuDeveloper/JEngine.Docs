# 挂载代码
有的时候，我们会将代码挂到GameObject上，然而，如果一个GameObject会包含很多热更脚本，一个个手动AddComponent太浪费时间，于是就有了自动绑定工具

> 注意，主工程Instantiate一个带有ClassBind的prefab的时候一定要去手动调用该prefab上的ClassBind的BindSelf方法，否则ClassBind无法激活

## 挂载步骤
1. 给GameObject或预制体**添加Class Bind脚本**
2. 想给该GameObject加几个热更脚本，**就把ScriptsToBind数组添加几次**
3. **Namespace写命名空间 (默认HotUpdateScripts，即热更命名空间)，Class写脚本类名**
4. **运行**后会**自动绑定**，可以勾选Active After自动激活
5. 继承**MonoBehaviour**的脚本，**激活需要enabled = true 以及 调用Awake()**，
6. 继承**JBehabviour**的脚本，直接调用**Activate()**
7. 如果希望使用构造函数，在```use constructor```一栏打勾即可

## 参数介绍

- ```ScriptsToBind```

  - 要添加**多少个**热更DLL里的**脚本**

- ```Namespace```

  - 热更脚本的**命名空间**，**默认HotUpdateScripts**

- ```Class```

  - 热更脚本的**类名**

- ```Active After```

  - **勾选后**，会在绑定后，或绑定+赋值后，只要该类具有```Active()```方法，就会**自动调用激活**
  - **没勾选**，需手动，**参考指南第5和第6条**

- ```Require Bind Fields```

  - **勾选后**，**会根据Fields里的数据自动赋值**
  - **没勾选**，**哪怕Fields里有东西也不赋值**

- ```Use Constructor```

  - **勾选后**，**会使用该类的构造函数进行初始化赋值**

- ```Fields```

  - **自动赋值**该脚本**多少个值**

- ```Field Type```

  - 该值的**类型**（支持**数字类型**，**布尔值类型**，**字符串类型**，**GameObject**和**挂在GameObject上面的不可热更的脚本**）

- ```Field Name```

  - 该值在热更脚本里的名字

    ![name](https://s1.ax1x.com/2020/09/05/wEyk9K.png)

- ```Value```

  - 如果```Field Type```不是```GameObject```或```Unity Component```的时候，这里是该Field的数值
    - 如果是**数字或字符串**，直接写进去
    - 如果是**布尔值**，写true或false
    - 如果是**热更资源**，输入资源**完整路径**或XAsset**可检测到的短路径**
    - ```Field Type```为```GameObject```或```Unity Component```的时候，此处```Value```写什么都不会发生效果
- ```GameObject```
    - 如果```Field Type```是```GameObject```或```Unity Component```，直接将那个场景中的GameObject拖拽到这里即可


## 小工具

### 自动获取全部Field
一个类里面可能有很多Field和Property，一个个去写太费劲，在Unity编辑器下可以点击按钮一键获取

### 自动匹配FieldType
如果全部field一个个去设置type太费劲，在Unity编辑器下可以点击按钮一键匹配

### 路径转GameObject
> Inspector中，ClassBind脚本的右上角有个小工具，用于老版本，手动写GameObject路径的项目
1. ClassBind右上角 -> Convert Path to GameObject
2. 可以把老项目中的路径变可拖拽可视化的场景GameObject，且无需关系路径变更


> 下一步，[开发须知](guide)
