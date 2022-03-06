# 自定义热更类型运行时面板序列化

运行时，我们经常会在Inspector上操作或查看脚本的值，但当我们想要查看热更类型的这些字段的值的时候，我们就需要自己去针对每种类型都写一个序列化方法。

无独有偶，JEngine Pro将运行时对热更对象的序列化方法解耦并独立了出来，可以自行扩展，任何创建到GameObject上的类型（MonoBehaviour和JBehaviour，或ClassBind挂上去的纯热更类型）都可以进行序列化来显示到面板上。

## 运行时面板

运行时面板泛指Unity运行时某gameObject的Inspector面板上的界面内容。

<img src="https://z3.ax1x.com/2021/08/06/fu96R1.png" alt="WxBqVf.png" style="zoom: 67%;" />


## 编写扩展序列化方法

使用共以下几步：

1. 在主工程进入```Editor/SerializeILTypeInstanceMethods```目录

2. 复制黏贴该文件夹内现成的任意一个文件，同时给复制出来的改名

   1. 命名规范：SerializeXXXType.cs，XXX是你希望扩展出来的序列化的类型的名字

3. 打开复制出来的文件

4. 命名空间和类名不需要改，需要改的只有标签和方法

   1. ```[SerializeTypeMethod(1)]```是JEngine用来识别方法的标签，标签里的数字代表该序列化方法的权重，数字越大，权重越高，权重高的方法优先进行调用（不建议定义重复的权重，后果尚未验证）
   2. 方法名改成文件名，SerializeXXXType
   3. 方法需要返回bool，当序列化成功时返回true，当序列化失败（如不是自己想要扩展的类型）的时候返回false

5. 该方法有以下参数：

   1. AnimBool fadeGroup，这个是Unity的收缩框，可以用这个创建可收缩界面
   2. Type cType，这个是一个字段的真实类型（例如JsonData，UnityEngine.Object等）
   3.  IType type，这个是字段的热更类型（如果该字段是热更类型的话）
   4. ILTypeInstance instance，拥有参数字段的实例对象
   6. string name，该字段的名字
   6. object val，该字段的值，可以对其覆盖来修改热更实例
   
6. 这里用序列化JsonData的例子来讲解

   ```c#
   [SerializeTypeMethod(4)]
   public static bool SerializeJsonDataType(AnimBool fadeGroup, Type cType, IType type, ILTypeInstance instance, string name, object val)
   {
     if (cType == typeof(JsonData)) //可以折叠显示Json数据
     {
       if (val != null)
       {
         fadeGroup.target = EditorGUILayout.Foldout(fadeGroup.target, name, true);
         if (EditorGUILayout.BeginFadeGroup(fadeGroup.faded))
         {
           val = EditorGUILayout.TextArea(
             ((JsonData) val).ToString()
           );
         }
   
         EditorGUILayout.EndFadeGroup();
         EditorGUILayout.Space();
       }
       else
       {
         EditorGUILayout.LabelField(name, "暂无值的JsonData");
       }
   
       return true;
     }
   
     return false;
   }
   ```
   
7. 这里序列化JsonData的权重是4，也就是说这个方法会在倒数第四次尝试序列化的时候被调用（就是说如果有个权重为5的方法成功序列化了该字段，那么就不会继续尝试序列化，意味着这个权重为4的方法不会被执行到）

8. 方法内部做了个if判断，如果是JsonData再继续尝试，否则返回false，代表不是想要处理的类型，让框架底层继续尝试调用下一个序列化方法

9. 然后类似第五步提到的方法获取了字段的真实值

10. 做了个空判断，如果是空就显示Label，反之创建一个可折叠区域，内部创建TextArea，并保存到实例

11. 最后返回true，代表告诉框架底层这个字段序列化了，不需要往后尝试了



## 忠告

- 要是不会Unity序列化，不会EditorGUILayout的就别接触这个功能了，扩展写起来需要Unity编辑器编写经验。
- 建议对ILRuntime有一定了解，知道如何获取真实类型，如何对一些类型进行特定处理
