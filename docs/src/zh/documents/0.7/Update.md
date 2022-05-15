# 更新框架

### 注意事项

::: danger

记得做好备份再更新，以便出现问题的时候还原

如果修改过框架源码，推荐使用GitHub之类的来管理，可以直接看到文件差异

:::



建议从```master```分支或```release```下载最新源码，

更新框架需要替换不少文件，主要有：



[[toc]]





### 框架源码

建议直接把```JEngine/UnityProject/Assets/Dependencies/```内全部子目录替换为同路径目录



### 启动代码

建议把```JEngine/UnityProject/Assets/Scripts/```目录下除了```Helpers```以外的子目录和文件替换为最新的同路径目录和同路径文件



### CLR重定向代码

建议把```JEngine/UnityProject/Assets/Scripts/Helpers/RegisterCLRMethodRedirctionHelper.cs```替换为最新的同路径文件



### 热更代码

建议直接把```JEngine/UnityProject/HotUpdateScripts/JEngine/```目录替换为最新的同路径目录

