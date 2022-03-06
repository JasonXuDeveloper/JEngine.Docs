# 打包热更资源

热更管理模块基于[Bundle Master](https://github.com/mister91jiao/BundleMaster_IntegrateETTask)，可以在其官网找到相关视频/文档，

JEngine修改了Bundle Master的代码，使其变得更简单易用，



[[toc]]



### 开始之前

- Main分包配置不建议修改
- Main分包指向了```Assets/HotUpdateResources```下除了```AddOns```下全部的目录
- 在```Assets/HotUpdateResources/AddOns```内创建新文件夹，用来存放新分包内容，需要创建分包后配置资源路径
- 热更DLL会被加密，加密密钥在JEngine面板配置，同时Init场景下InitJEngine的加密密钥记得与打包时加密DLL的密码一致
- 加密DLL的秘钥和加密热更包的秘钥可以不一样



### 创建分包

1. 进入```Assets/Dependencies/BundleMaster/Editor/BundleMasterEditor/BuildSettings/```
2. 右键，```Create/BuildAssets/创建分包配置文件```
3. 改个名
4. 在Unity的Inspector下进行配置
5. 基础使用只需要配置分包名，资源路径和场景资源即可，参考Main分包和AddOn1分包的配置
6. 建议启用hash，压缩模式建议```Chunk Based Compression```
7. 如果需要加密，则需要勾上加密资源，并输入秘钥（长度不限）



### 配置分包

::: tip

只有编辑器下才需要配置，该操作不影响真机

:::

1. 进入```Assets/Dependencies/BundleMaster/Editor/BundleMasterEditor/BuildSettings/```
2. 找到```AssetLoadTable```，在Unity的Inspector下开始配置
3. 将所有需要打包的分包写入```Assets Load Setting```即可
4. 建议不要使用绝对路径，建议生成路径代码，不建议修改除了步骤3提到的字段以外的内容



### 打包资源

请在Unity菜单栏选择：

```Tools/BuildAsset/构建AssetBundle```



### 其他工具

- ```Copy资源到StreamingAssets```，用于离线模式
- ```View/Built Bundles```，打开生成的热更资源的目录
- ```View/Caches```，用于打开运行时下载的缓存的目录
