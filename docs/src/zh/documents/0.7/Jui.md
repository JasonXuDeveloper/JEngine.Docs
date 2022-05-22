# UI数值绑定方案

## JUI

JEngine已推出提高UI开发效率的功能(支持操作任何UGUI组件, 例如：Button, Text, Slider,等)

::: tip

为什么使用JUI？

- 链式编程
- 数据绑定
- 循环更新
- 精简强大
- 基类使用JBehaviour，低GC高性能

:::

[[toc]]



### 流程图

<img src="https://s1.ax1x.com/2020/07/19/URWIwq.png" alt="JUI" style="zoom:50%;" />

### 接口

```csharp
/// <summary>
/// Calls when UI has been inited
/// UI被初始化的时候调用
/// </summary>
/// <param name="init"></param>
/// <returns></returns>
public JUI onInit(Action<JUI> init)
```

```csharp
/// <summary>
/// Calls when UI runs at the first time
/// UI第一次被使用的时候调用
/// </summary>
/// <param name="run"></param>
/// <returns></returns>
public JUI onRun(Action<JUI> run)
```

```csharp
/// <summary>
/// Calls on loop
/// 循环的时候被调用
/// </summary>
/// <param name="loop"></param>
/// <returns></returns>
public JUI onLoop(Action<JUI> loop)
```

```csharp
/// <summary>
/// Calls on destruction
/// 销毁时调用
/// </summary>
/// <param name="end"></param>
/// <returns></returns>
public JUI onEnd(Action<JUI> end)
```

```csharp
/// <summary>
/// Binds a data
/// 绑定数据
/// </summary>
/// <typeparam name="T"></typeparam>
/// <param name="val"></param>
/// <returns></returns>
public JUI Bind<T>(BindableProperty<T> val)
```

```csharp
/// <summary>
/// Unbinds a data
/// 取消绑定数据
/// </summary>
/// <typeparam name="T"></typeparam>
/// <param name="val"></param>
/// <returns></returns>
public JUI Unbind<T>(BindableProperty<T> val)
```

```csharp
/// <summary>
/// Calls on message
/// 通知时调用
/// </summary>
/// <param name="message"></param>
/// <returns></returns>
public JUI onMessage<T>(Action<JUI, T> message)
```

```csharp
/// <summary>
/// Calls on message
/// 通知时调用（如果要有老参数的话）
/// Action的参数分别是JUI本身，OldVal，NewVal
/// </summary>
/// <param name="message"></param>
/// <returns></returns>
public JUI onMessageWithOldVal<T>(Action<JUI, T, T> message)
```

```csharp
/// <summary>
/// Get Generic of UnityEngine.UI
/// 获取UnityEngine.UI的泛型
/// </summary>
/// <typeparam name="T"></typeparam>
/// <returns></returns>
public T Element<T>() where T : UIBehaviour
```

```csharp
/// <summary>
/// Activates an UI
/// 激活UI
/// </summary>
/// <returns></returns>
public new JUI Activate()
```

```csharp
/// <summary>
/// Create JUI on a gameObject
/// 在游戏对象上创建JUI
/// </summary>
/// <param name="gameObject"></param>
/// <returns></returns>
public static JUI CreateOn(GameObject gameObject)
```







### 如何使用

1. 引入以下命名空间

   ```csharp
   using JEngine.UI;
   ```

2. 用```JUI.CreateOn(GameObject gameObject)```方法创建JUI（也可以参考[扩展方法](./Extension.md)）

   ```csharp
   //Here it is an example of adding JUI
   JUI t = JUI.CreateOn(GameObject.Find("Canvas/AnyGameObject"));
   ```

3. 可以对JUI的生命周期进行分配：

   ```csharp
       //To Init it
       t.onInit(t =>
                {
                  
                });
      //To Run it
       t.onRun(t =>
                {
                  
                });
      //When it has ended
       t.onEnd(t =>
                {
                  
                });
      //To Loop it
       t.onLoop(t =>
                {
                  
                });
      // To Bind a Data
      BindableProperty<int> i = new BindableProperty<int>(0);
      t.Bind(i);//Bind JUI to an data
      //What to do when data has updated
      t.onMessage<int>((t,value) =>
                  {
                    
                  });
   ```

4. **激活JUI（必备）**:

   ```csharp
   t.Activate();
   ```

5. **恭喜！成功使用** （记住第四步激活JUI）

6. 删除，可以直接删GameObject，或使用JBehaviour的销毁方法：```JBehaviour.RemoveJBehaviour(jui);```

### 扩展

#### 链式编程

   ```csharp
JUIText t = JUI.CreateOn(GameObject.Find("Canvas/Text"))
                .onInit(t1 =>
                {
                
                })
                .onRun(t2 =>
                {
                })
                .onLoop(t3 =>
                {
                })
                .onEnd(t4 =>
                {
                })
                .Activate();
   ```

### 使用示范

::: tip

也可以直接参考JEngine自带的JUI Demo

:::

   #### 使用循环来实现倒计时

   ```csharp
public class Example
{
  public void Start()
  {
    /*
             * ========================================================================
             * 10 seconds countdown demo
             * 10秒倒计时例子
             * ========================================================================
             */

    int i = 10;

    JUI t = JUI.CreateOn(GameObject.Find("Canvas/Text"))//给一个GameObject绑定JUI，该GameObject可以不包含任何UI控件
      .onInit(t1 =>
              {
                var text = t1.Element<Text>();
                text.text = "I have been Inited!";
                Debug.Log(text.text);
              })
      .onRun(t2 =>
             {
               var text = t2.Element<Text>();
               text.text = "I am Running!";
               Debug.Log(text.text);

               //Set the loop mode and frequency
               t2.FrameMode = false;//Run in milliseconds
               t2.Frequency = 1000;//Run in every 1000 ms (1 second)

               UnityEngine.Object.Destroy(t2.gameObject, 10);
             })
      .onLoop(t3 =>
              {
                i--;
                var text = t3.Element<Text>();
                text.text = "I will be destroyed in " + i +" seconds!";
              })
      .onEnd(t4 =>
             {
               Debug.Log("My lifecycle has been ended!");
             })
      .Activate();
  }
}
   ```

   #### 数据绑定

   ```csharp
[Serializable]
public class Data
{
  public int a = 0;
  public BindableProperty<int> b = new BindableProperty<int>(0);
}

/// <summary>
/// This showcase shows how JUI works if an UI needs to update frequently
/// </summary>
public class Demo :MonoBehaviour
{
  public static Demo Instance;

  public Data data;

  public void Awake()
  {
    Instance = this;
    data = new Data();//Create data
  }

  //You need Start here in ILRuntime so that it leads to update
  //If you dont have Start method when you inherit MonoBehaviour, ILRuntime will not call Update (It is an unknown bug and i will fix it soon as possible)
  public void Start()
  {

  }

  float seconds = 0;
  //pretends to modify data every second
  public void Update()
  {
    seconds += Time.deltaTime;

    if (seconds >= 1)
    {
      data.a++;//Pretending modifing data
      data.b.Value++;//Pretending modifing data
      seconds -= 1;
    }
  }
}



public class JUIShowcase : MonoBehaviour
{
  GameObject a;
  GameObject b;

  #region NORMAL WAY TO UPDATE UI
    public void Awake()
  {
    //Add showcase data
    new GameObject("BindShowcase").AddComponent<Demo>();
    a = GameObject.Find("Canvas/A");//Bind the gameobject which has the UI element
  }
  //In normal way you need to update your UI in every frame so that you can make your text acurately present your data
  int times = 0;
  public void Update()
  {
    a.GetComponent<Text>().text = "(Without JUI)a="+Demo.Instance.data.a.ToString()+"\n<size=20>I have been run for "+times+" times</size>";//Update UI
    times++;
  }
  #endregion

    #region USE JUI TO UPDATE UI(With Bind)
    /*
         * ========================================================================
         * JUI bind demo
         * JUI绑定数据例子
         * ========================================================================
        */
    public void Start()
  {
    b = GameObject.Find("Canvas/B");//Bind gameobject to show data

    //In JUI it is easy to bind data with text
    int times2 = 0;
    var JUI = JUI.CreateOn(b)//Add JUI to an gameobject
      .Bind(Demo.Instance.data.b)//Bind data.b to this gameobject
      .onMessage<int>((t1,intVal) =>//Tells JUI what to do when the binded data has updated
                      {
                        //EG. we have update UI here
                        t1.Element<Text>().text = "(With JUI)b=" + intVal.ToString() + "\n<size=20>I have been run for " + times2 + " times</size>";
                        //You can convert bindable properties easily and get their values
                        times2++;
                      })
      .Activate();//Activate the UI
  }
  #endregion
   ```

   

### 控制循环频率 *(如果你想要UI循环更新的话)*

   **JUI**继承自**JUIBehaviour**，可以控制循环模式和频率。

   - ```FrameMode```: ```bool```，如果为true，**帧循环**；反之，**毫秒循环** ，默认为```true```
   - ```Frequency```: ```int```，代表循环的**间隔时间**，代表毫秒或帧数，默认为```1```


### 如何绑定数据到JUI

   ```csharp
void MyJUIExample()
{
  MyData data;//Create a data
  JUI jui = JUI.CreateOn(GameObject.Find("Canvas/MyUIElement"))//Add JUI to an UI element
    .Bind(data.b)//Bind a data
    .onMessage<int>((t,intVal) =>		//Tell what to do when data has changed
    {
      Debug.Log("b has changed!");
    })
    .Activate();	//Activate JUI
}
   ```

### 如何获得JUI组件上的其他UI组件

   ```csharp
JUI jui = JUI.CreateOn(GameObject.Find("Canvas/MyUIElement"));//Add JUI to an UI element
Button btn = jui.Element<Button>();//It is a generic method to get an UI element
//If you dont have this component on the element, JUI will automatically add one
   ```

### 注意事项

- 重要：数据绑定和频率循环，只能二选一

