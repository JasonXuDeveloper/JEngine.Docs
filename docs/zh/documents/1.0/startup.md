# 开始使用 

该文章将告诉您如何初步使用JEngine




## 版本要求

Unity2022.3及以上



## 下载JEngine

请[在此](https://github.com/JasonXuDeveloper/JEngine/tree/master)下载JEngine后解压并在Unity Hub内使用符合版本要求的Unity打开`UnityProject`



## 项目主要结构

下面会描述JEngine相关的目录和文件，一般**不建议**删除下面提到的文件/目录

**JEngine**：下载下来的目录

- **UnityProject**：Unity工程

  - **Bundles**：打包的热更资源的目录

    - **{Platform}**：打包出来的热更资源对应的平台（如Android, WebGL等）
      - **main**：打包出来的主分包
        - **{PackageVersion}**：打包出来的主分包的版本
      - **{OtherPackage}**：打包出来的其他分包
        - **{PackageVersion}**：打包出来的其他分包的版本

  - **HybridCLRData**：HybridCLR所需的用来编译的目录（需要在Unity内自己安装，后续会提到）

  - **Packages**：使用的第三方库

    - **com.code-philosophy.hybridclr@8.5.1**：HybridCLR，因为需要兼容Obfuz所以自己复制了一份到这个目录，如需更新HybridCLR的话可以[参考这里](https://www.obfuz.com/docs/beginner/work-with-hybridclr)
    - **com.jasonxudeveloper.jengine.core**：JEngine核心代码（热更相关运行时和编辑器代码）
    - **manifest.json**：清单文件，包含其他JEngine依赖的库（UniTask、YooAsset、Obfuz、Nino等）

  - **ProjectSettings**：包含各种项目配置，只推荐在Unity（Project Settings面板）下按需修改

  - **yoo**：编辑器下模拟运行模式下载并使用热更资源时用来缓存已下载热更资源的目录，删掉后则需要在运行时重新下载

  - **Assets**：Unity项目资源目录

    - **Samples**：包含YooAsset的插件（UniTask插件、小游戏插件）

    - **StreamingAssets**：首包资源，打包主包热更资源时会自动复制文件到该目录，用于App Store等应用市场审核

    - **HybridCLRGenerate**：包含编译热更代码时生成的桥接函数和防Unity裁剪文件，可以删（但没意义），编译热更代码时会自动生成

    - **Obfuz**：混淆相关的生成代码，包含生成的垃圾代码和用于[还原被混淆堆栈](https://www.obfuz.com/docs/manual/deobfuscate-stacktrace)的文件

    - **TextMesh Pro**：一般项目现在都用这个来实现UI文本了，JEngine顺手把这个安装了（同时JEngine的Demo会用这个）

    - **Resources**：非热更资源目录，存放了一些配置和预制体，**更改这里面的东西需要重新出包（指打包应用出来提交到平台）**

      - **EncryptConfigs**：各种热更资源加密方式对应的配置文件，可以在里面配置不同加密方式所用到的密钥
      - **Obfuz**：解密混淆代码的静态密钥
      - **Animations/Shaders/UI/Prefabs**：JEngine的弹窗功能（**MessageBox**）用到的动画/特效/图片/预制体，可以修改，但`MessageBox.prefab`里面的控件的结构和名字不能改

    - **Editor**：编辑器工具配置（YooAsset、JEngine）存放在这里，通常不需要去管里面的东西

    - **HotUpdate**：热更资源（含代码）目录

      - **Compiled**：编译并混淆后的热更代码和用于[补充AOT泛型的DLL](https://www.hybridclr.cn/docs/basic/aotgeneric)存放在这里，不用管，编译热更代码的时候会自动把文件写入这个目录
      - **Obfuz**：解密混淆代码的动态密钥（可修改Obfuz配置后重新生成改密钥然后热更）
      - **Main**：主热更资源包
      - **AddOn1**：热更资源分包测试（可删，[需在YooAsset配置移除该分包](https://www.yooasset.com/docs/guide-editor/AssetBundleCollector)）
      - **Raw**：热更原生包测试（可删，[需在YooAsset配置移除该分包](https://www.yooasset.com/docs/guide-editor/AssetBundleCollector)）
      - **Code**：热更代码
        - **EntryPoint.cs**热更代码的函数入口

      ::: tip

      你可以在`HotUpdate/{分包}`里随意根据你的规范去放置热更资源，但如果有添加新的目录或没在现有的目录里添加文件（例如在`HotUpdate/Main/`添加了文件或新目录）， 需要参考[YooAsset文档](https://www.yooasset.com/docs/guide-editor/AssetBundleCollector)去配置新添加的`文件/目录`到对应的热更资源包

      :::

      

      ::: danger

      热更代码里不能使用Unity项目里非Plugin、非Packages、非dll、非asmdef的代码，即Assembly-CSharp工程内的代码无法在热更工程使用。

      

      如果想要在热更代码里使用任何主工程的代码，对应的主工程代码必须使用[`asmdef`](https://docs.unity3d.com/6000.2/Documentation/Manual/cus-asmdef.html)去分离出来一个工程，然后再到`HotUpdate/Code/HotUpdate.Code.asmdef`里添加对另一个主工程asmdef的引用，大部分Unity插件应该都有做这个（例如YooAsset, UniTask, ZLinq, LitMotion等）；如果某些Unity插件是提供的`dll`，例如Nino，则不需要做任何操作。

      

      这一段非常重要，如果是新手或者不懂这一块机制，可以把这一段话复制到LLM（DeepSeek、GPT等）里让AI进行解释和举例

      :::



## 安装HybridCLR

用正确的Unity版本打开`UnityProject`后，在顶部菜单栏，点击`HybridCLR/Installer..`，然后点击`Install`即可，会卡一会，后续安装完了的话面板会显示`Installed Version: xxxx`，就代表安装完成（同时`UnityProject/HybridCLRData`目录会被生成，里面会有很多文件）

> 这一步遇到错误可以看[这里](https://www.hybridclr.cn/docs/help/commonerrors)





## 模拟运行项目

这一步我们可以在编辑器下使用JEngine的开发模式去模拟热更流程：

1. 进入`Init`场景
2. 在`Hierarchy`点击`Bootstrap`对象
3. 在`Inspector`的`Development Settings`区域内看`Editor Mode`是否为`Editor Dev Mode`（红色），如果不是就点一下按钮
4. 编辑器下运行游戏
5. 点`Start`会加载热更代码并进入主热更场景
6. 点`AddOnDemo`后会加载`AddOn1`分包并进入该分包内的场景



> Init场景有个`IngameDebugConsole`对象，用于在运行环境（比如Windows/iOS/Android）下**不使用额外工具获取日志**，如果用不到的话可以直接删除该对象



## 通用开发流程

1. 修改热更代码/热更资源
2. 打开JEngine面板（顶部菜单栏，点击`JEngine Panel`）
3. 面板内的`Package Settings`下，`Package Name`选择需要打包热更资源的分包（通常是主分包`main`），`Build Target`点`Set to Current Active Target`
4. 面板内的`Build Options`下选择需要的加密模式，通常推荐`XOR`（速度快），但`AES`和`ChaCha20`安全性更高
5. 如果修改了热更代码或Obfuz配置，点`Build All Hot Update Res (Code + Assets)`（只有主分包需要点这个），然后等待即可，如果出现错误可以结合控制台错误查阅[YooAsset文档](https://www.yooasset.com/docs/FAQ)、[HybridCLR文档](https://www.hybridclr.cn/docs/help/commonerrors)和[Obfuz文档](https://www.obfuz.com/docs/help/faq)
6. 如果修改了热更资源（如场景），且没有执行上一步，则点击`Build Hot Update Assets Only`，然后等待即可
7. 做了前两个步骤的任意一步之后，如果打包成功，则会有个日志提到版本号，进入到`UnityProject/Bundles/{第四步设置的平台}/{第三步选择的分包}/{版本号}`目录，这个就是打包好的热更资源
8. 在服务器/资源桶里，创建`{第四步设置的平台}/{第三步选择的分包}`目录，将上一步目录里的东西复制进来，例如在`https://cdn.domain.com/WebGL/main/`目录下存放你上一步打包出来的全部资源（前提是你也是WebGL平台）
9. 进入`Init`场景
10. 点击`Hierarchy`下的`Bootstrap`对象
11. `Inspector`里的`Editor Mode`切换到`Host Play Mode`
12. `Inspector`里的`Server Settings`区域的`Default Host Server`输入你第八步部署资源的地址，例如`https://cdn.domain.com`或`http://127.0.0.1`，注意不要包平台或分包写进链接里，如果你把资源目录放到了某个其他路径内，则该地址需要包含其他路径，例如你把资源放到了`wwwroot/cdn.domain.com/something/`下，那你的地址就填`https://cdn.domain.com/something`
13. `Inspector`里的`Security Settings`内的`Encryption Option`选你对**主包**加密的模式
14. `Inspector`里的`Asset Settings`内的`Target Platform`选择对应平台，`Regular`是常规平台，其他是对应的小游戏的平台
15. 运行游戏，然后和模拟运行体验应该类似，但这次会有弹窗让你下载资源（主包不一定有因为会把资源拷贝到`Streaming Assets`），还会显示下载进度之类的
16. 常规开发基本就是这么个`修改代码/资源->打包热更资源->上传热更资源->测试`的流程，更详细的框架功能会在后续的文章里具体介绍





## 代码混淆

上面提到了，我们会对大部分代码（含热更代码）进行混淆，需要注意的是，如果`Assets/Obfuz`目录下的代码（`GeneratedEncryptionVirtualMachine.cs`或垃圾代码）或`Assets/Resources/Obfuz/StaticSecretKey.bytes`发生了变动，则需要重新打包项目并提交到不同的平台做版本更新，推荐使用`git`或`svn`工具去判断有没有遇到这个问题。

通常不修改Obfuz配置或不重新生成垃圾代码的话，不会遇到这个问题。

具体的Obfuz配置需要[查看Obfuz文档](https://www.obfuz.com/docs/intro)，**强烈推荐大家看一下这个文档然后修改各种用来混淆的密钥**，**用默认的密钥不安全**

