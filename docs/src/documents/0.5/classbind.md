# 挂载代码（v0.5）
有的时候，我们会将代码挂到GameObject上，然而，如果一个GameObject会包含很多热更脚本，一个个手动AddComponent太浪费时间，于是就有了自动绑定工具

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
    - ```v0.5.2```开始，```Field Type```为```GameObject```或```Unity Component```的时候，此处```Value```写什么都不会发生效果
    - **```v0.5.2```和```v0.5.1```版本注意事项**
       > 如果是**GameObject**，请写**完整路径**，**如果是一个GameObject的子物体，父物体要Active**；**如果不是子物体，本身要Active**，例如：**路径，Canvas/Text，其中Text可以不Active，Canvas必须Active；路径，Demo，其中Demo必须Active**，可以指向自己，指向自己，输入 **${this}** ，**右键可直接复制GameObject全路径**

       > 如果是**Unity Component**，即不可热更的挂载脚本，和GameObject一样，输入全路径即可（参考GameObject做法）
    - **```v0.5.0```及以下版本注意事项**
       > 如果是**GameObject**，请写**完整路径**，**如果是一个GameObject的子物体，父物体要Active**；**如果不是子物体，本身要Active**，例如：**路径，Canvas/Text，其中Text可以不Active，Canvas必须Active；路径，Demo，其中Demo必须Active**，可以指向自己，指向自己，输入 **${this}** ，**右键可直接复制GameObject全路径**

       > 如果是 **```Unity Component```**，或需要输入**完整路径，参考GameObject**，**加上"."，最后加上脚本名称**，**例如：Canvas/Text.Outline，即获取这个Canvas/Text的Outline组件**，可以指向自己身上的组件，输入 **${this}.xxx** ，xxx为组件名，**右键可直接复制GameObject全路径**，**然后再加.绑定的脚本名称，即可提高效率**

- ```GameObject```（```v0.5.2```及以上）
    - 如果```Field Type```是```GameObject```或```Unity Component```，直接将那个场景中的GameObject拖拽到这里即可


## 小工具
> Inspector中，ClassBind脚本的右上角有个小工具，用于老版本，手动写GameObject路径的项目
1. ClassBind右上角 -> Convert Path to GameObject
2. 可以把老项目中的路径变可拖拽可视化的场景GameObject，且无需关系路径变更

## 代码绑定面板示例

<img src="https://s1.ax1x.com/2020/09/08/wQk0aj.png" alt="guide1" style="width:50%;margin-left:25%" />


> 下一步，[开发须知](guide.html)
