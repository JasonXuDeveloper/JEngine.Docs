# 打包热更资源

热更管理模块基于[Bundle Master](https://github.com/mister91jiao/BundleMaster_IntegrateETTask)，可以在其官网找到相关视频/文档，

JEngine修改了Bundle Master的代码，使其变得更简单易用，



[[toc]]



### 开始之前

- Main分包配置不建议修改
- Main分包指向了```Assets/HotUpdateResources```下除了```AddOns```之外全部的已存在的子目录（自己在```Assets/HotUpdateResources```下新建的目录需要自行配置到Main分包的资源路径内
- 在```Assets/HotUpdateResources/AddOns```内可以创建新文件夹，用来存放新分包内容，同时创建分包配置后将其资源路径指向创建到AddOns下的新分包资源目录
- 热更DLL会被加密，**首次打AB包会有个弹窗要求输入16位DLL加密密钥**，后续打包时的加密密钥可以在JEngine面板配置，同时Init场景下InitJEngine的加密密钥记得与打包时加密DLL的密码一致
- **加密DLL的秘钥和加密热更包的秘钥可以不一样**
- 首包开启加密后，首包加密秘钥请输入到Updater，参考[Updater使用](./Updater.md)
- 创建分包后，加载该分包资源时，需要传入资源全路径以及分包名（如果是主包资源，不需要填分包名，或者填写主包名称都可以）



### 创建分包

1. 进入```Assets/Dependencies/BundleMaster/Editor/BundleMasterEditor/BuildSettings/```
2. 右键，```Create/BuildAssets/创建分包配置文件```
3. 给新建的文件改个名
4. 在Unity的Inspector下进行配置
5. 基础使用只需要配置分包名，资源路径和场景资源即可，参考Main分包和AddOn1分包的配置
6. 建议启用hash，压缩模式建议```Chunk Based Compression```
7. 如果需要加密，则需要勾上加密资源，并输入秘钥（长度不限）



### 配置打包

::: tip

只有编辑器下才需要配置，该操作不影响真机
只有创建了新分包才需要对打包进行配置

:::

1. 进入```Assets/Dependencies/BundleMaster/Editor/BundleMasterEditor/BuildSettings/```
2. 找到```AssetLoadTable```，在Unity的Inspector下开始配置
3. 将所有需要打包的分包写入```Assets Load Setting```即可
4. 建议不要使用绝对路径，建议生成路径代码，不建议修改除了步骤3提到的字段以外的内容



### 场景资源

::: tip

需要在```Assets/Dependencies/BundleMaster/Editor/BundleMasterEditor/BuildSettings```内找到```AssetLoadSetting```进行配置

:::

1. 把需要自动收集的场景的根目录配进去就好，打热更包时会自动查找根目录内全部场景资源





### 黑名单

::: tip

需要在```Assets/Dependencies/BundleMaster/Editor/BundleMasterEditor/BuildSettings```内找到```AssetLoadSetting```进行配置

:::

1. 黑名单文件是一个列表，可以把需要屏蔽的文件名写进去，打热更包时会自动忽略这些文件
2. 黑名单后缀是一个列表，可以把需要屏蔽的后缀名写进去，打热更包时会自动忽略这些后缀的文件





### 打包资源

请在Unity菜单栏选择：

```Tools/BuildAsset/构建AssetBundle```



### 其他工具

- ```Copy资源到StreamingAssets```，用于离线模式
- ```View/Built Bundles```，打开生成的热更资源的目录
- ```View/Caches```，用于打开运行时下载的缓存的目录
