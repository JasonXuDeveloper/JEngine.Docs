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



### 创建分包（普通AssetBundle分包）

1. 进入```Assets/Dependencies/BundleMaster/Editor/BundleMasterEditor/BuildSettings/```
2. 右键，```Create/BuildAssets/创建分包配置文件```
3. 给新建的文件改个名（不然下次没办法继续创建）
4. 在Unity的Inspector下进行配置
5. 基础使用只需要配置分包名，资源路径和场景资源即可，参考Main分包和AddOn1分包的配置
6. 建议启用hash，压缩模式建议```Chunk Based Compression```
7. 如果需要加密，则需要勾上加密资源，并输入秘钥（长度不限）





### 粒度管理

::: tip

合理的粒度管理可以减少生成出来的文件的数量

粒度管理的意思就是把指定目录内的全部资源生成为一个AssetBundle，而不是每个文件单独一个AssetBundle

JEngine默认将整个UI目录变为了”一组资源“，即全部UI目录下的资源进入一个AssetBundle，同理，若是这个目录内有资源发生了变动，用户需要更新完整UI目录大小的资源

组路径资源的路径必须被包含在所有资源的路径里，建议所有资源里配置一下分组资源路径的根目录路径，或者至少把分组资源路径也填到所有资源的路径内

:::

1. 找到创建的普通AssetBundle分包
2. 在一组资源路径里，写入你想要打为一个AssetBundle的资源（注意，该路径不能和资源路径内的路径重复，同时该路径可以是资源路径和一组资源路径内某个路径的子目录）



### 创建原生资源分包

1. 进入```Assets/Dependencies/BundleMaster/Editor/BundleMasterEditor/BuildSettings/```
2. 右键，```Create/BuildAssets/创建原生资源分包配置文件```
3. 给新建的文件改个名（不然下次没办法继续创建）
4. 在Unity的Inspector下进行配置
5. 基本就是配置个不重复的分包名，然后配置一下这个分包收集哪个目录下的资源即可，该目录下的资源会原封不动的被打包（不会变成AssetBundle，就是文件的原格式）



### 配置打包

::: tip

只有编辑器下才需要配置，该操作不影响真机
只有创建了新分包才需要对打包进行配置

:::

1. 进入```Assets/Dependencies/BundleMaster/Editor/BundleMasterEditor/BuildSettings/```
2. 找到```AssetLoadTable```，在Unity的Inspector下开始配置
3. 将所有需要打包的分包写入```Assets Settings```即可，可以包含正常的分包以及原生资源分包
4. 建议不要使用绝对路径，建议生成路径代码，不建议修改除了步骤3提到的字段以外的内容



### 场景资源

::: tip

需要在```Assets/Dependencies/BundleMaster/Editor/BundleMasterEditor/BuildSettings```内找到```AssetLoadSetting```（普通分包配置文件）进行配置

:::

1. 把需要自动收集的场景的根目录配进去就好，打热更包时会自动查找根目录内全部场景资源





### 黑名单

::: tip

需要在```Assets/Dependencies/BundleMaster/Editor/BundleMasterEditor/BuildSettings```内找到```AssetLoadSetting```（普通分包配置文件）进行配置

:::

1. 黑名单文件是一个列表，可以把需要屏蔽的文件名写进去，打热更包时会自动忽略这些文件
2. 黑名单后缀是一个列表，可以把需要屏蔽的后缀名写进去，打热更包时会自动忽略这些后缀的文件






### 注意事项

- 热更场景若被打入游戏包（如APK）内，则该场景无法被热更，所以打游戏包时在BuildSetting内切勿勾选热更场景
- 文本文件建议改.txt后缀打入热更包，不然unity可能会屏蔽（.json是可以的，其他的自己试试）
- 二进制文件建议改.bytes后缀打入热更包，不然unity可能会屏蔽（.mp3，.wav是可以的，其他的自己试试）



### 打包资源

请在Unity菜单栏选择：

```Tools/BuildAsset/构建AssetBundle```



### 其他工具

- ```Copy资源到StreamingAssets```，用于离线模式
- ```View/Built Bundles```，打开生成的热更资源的目录
- ```View/Caches```，用于打开运行时下载的缓存的目录
