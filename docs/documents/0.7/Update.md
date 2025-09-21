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

::: tip

有可能需要重新解压Dependencies目录内的zip文件

:::



### 启动代码

建议把```JEngine/UnityProject/Assets/Scripts/```目录下除了```Helpers```以外的子目录和文件替换为最新的同路径目录和同路径文件

> 注意，0.7.3开始，InitJEngine/Updater/LoadILRuntime文件全部进入了Assets/Scripts/Core目录内，老版本升级后请把Scripts目录下的这三个文件删了，只保留Scripts/Core内的文件
>
> 从0.7.5开始，只需要更新```Scripts```目录下的```Adapters/LoadILRuntime.cs```、```Adapters/LoadILRuntime.cs```，以及```Core```目录了，Helpers目录不需要更新（前提是先同步到0.7.5的Helpers目录内的文件结构），以后只需要把自己项目需要注册的代码注册到Helpers目录的对应文件就好，更新框架的时候也不会有手滑把这个目录覆盖了的风险了



### CLR重定向代码

建议把```JEngine/UnityProject/Assets/Scripts/Helpers/RegisterCLRMethodRedirctionHelper.cs```替换为最新的同路径文件

> 注意，从0.7.5开始就不用管这个了



### 热更代码

建议直接把```JEngine/UnityProject/HotUpdateScripts/JEngine/```目录替换为最新的同路径目录

