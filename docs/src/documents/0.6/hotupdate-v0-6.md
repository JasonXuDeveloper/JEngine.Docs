{% import "views/_data.njk" as data %}

# 游戏热更（v0.6）

该文章将告诉您如何使用JEngine热更游戏

## 资源热更
> 参考[目录结构](structure-v0-6.html)
在```HotUpdateResources```目录下，根据热更资源的类别，存放热更文件即可


## 代码热更

1. 找到并打开**Project/HotUpdateScripts/HotUpdateScripts.sln**
2. 选择**Program.cs** 并打开
3. 更改但 **不要删除RunGame()** 方法
4. **生成解决方案**（就是生成DLL，开发的时候Debug生成，发行的时候换Release，GC更少）
5. 回到Unity，进行[开始使用](startup-v0-6.html)的**第4和第5步**
6. 开启开发模式，运行游戏
7. 您会发现热更代码能够完美运行，恭喜！

> 下一步，[挂载代码](classbind-v0-6.html)
