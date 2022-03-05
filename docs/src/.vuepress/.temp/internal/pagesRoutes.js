import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"JEngine - The solution that allows unity games update in runtime."},["/index.html","/README.md"]],
  ["v-ba934fd8","/config/",{"title":"Config"},["/config/index.html","/config/README.md"]],
  ["v-c0f957a0","/documents/",{"title":"Overview"},["/documents/index.html","/documents/README.md"]],
  ["v-2d0ad528","/zh/",{"title":"JEngine - 使Unity开发的游戏支持热更新的解决方案。"},["/zh/index.html","/zh/README.md"]],
  ["v-6f177d70","/documents/0.5/",{"title":"V0.5.x"},["/documents/0.5/index.html","/documents/0.5/README.md"]],
  ["v-39ed57da","/documents/0.5/bindable.html",{"title":"可绑定数据（v0.5）"},["/documents/0.5/bindable","/documents/0.5/bindable.md"]],
  ["v-31131b8c","/documents/0.5/classbind.html",{"title":"挂载代码（v0.5）"},["/documents/0.5/classbind","/documents/0.5/classbind.md"]],
  ["v-7bd53a60","/documents/0.5/crypto-struct.html",{"title":"内存加密结构（v0.5）"},["/documents/0.5/crypto-struct","/documents/0.5/crypto-struct.md"]],
  ["v-8b4c6ab6","/documents/0.5/guide.html",{"title":"开发须知（v0.5）"},["/documents/0.5/guide","/documents/0.5/guide.md"]],
  ["v-6da72a8b","/documents/0.5/hotupdate.html",{"title":"游戏热更（v0.5）"},["/documents/0.5/hotupdate","/documents/0.5/hotupdate.md"]],
  ["v-8707b6c4","/documents/0.5/ilruntime-tools.html",{"title":"ILRuntime工具（v0.5）"},["/documents/0.5/ilruntime-tools","/documents/0.5/ilruntime-tools.md"]],
  ["v-c19d79fe","/documents/0.5/jaction.html",{"title":"JAction（v0.5）"},["/documents/0.5/jaction","/documents/0.5/jaction.md"]],
  ["v-1a92ca44","/documents/0.5/jbehaviour.html",{"title":"JBehaviour（v0.5）"},["/documents/0.5/jbehaviour","/documents/0.5/jbehaviour.md"]],
  ["v-6fa41f1a","/documents/0.5/jprefab.html",{"title":"热更预制体解决方案 JPrefab（v0.5）"},["/documents/0.5/jprefab","/documents/0.5/jprefab.md"]],
  ["v-b2b496ae","/documents/0.5/jresource.html",{"title":"JResource（v0.5）"},["/documents/0.5/jresource","/documents/0.5/jresource.md"]],
  ["v-f90165f4","/documents/0.5/jsaver.html",{"title":"JSaver（v0.5）"},["/documents/0.5/jsaver","/documents/0.5/jsaver.md"]],
  ["v-0e3e3c63","/documents/0.5/jui.html",{"title":"JEngine.UI (JUI)（v0.5）"},["/documents/0.5/jui","/documents/0.5/jui.md"]],
  ["v-2b3af50e","/documents/0.5/limits.html",{"title":"ILRuntime限制"},["/documents/0.5/limits","/documents/0.5/limits.md"]],
  ["v-1e43acd0","/documents/0.5/localization.html",{"title":"Localization（v0.5）"},["/documents/0.5/localization","/documents/0.5/localization.md"]],
  ["v-f0e00baa","/documents/0.5/proto-tools.html",{"title":"Protobuf 工具（v0.5）"},["/documents/0.5/proto-tools","/documents/0.5/proto-tools.md"]],
  ["v-d06ccc78","/documents/0.5/startup.html",{"title":"开始使用（v0.5）"},["/documents/0.5/startup","/documents/0.5/startup.md"]],
  ["v-4bb1e68e","/documents/0.5/structure.html",{"title":"目录结构（v0.5）"},["/documents/0.5/structure","/documents/0.5/structure.md"]],
  ["v-6f177d32","/documents/0.6/",{"title":"V0.6.x"},["/documents/0.6/index.html","/documents/0.6/README.md"]],
  ["v-7fc668f2","/documents/0.6/bindable-v0-6.html",{"title":"可绑定数据（v0.6）"},["/documents/0.6/bindable-v0-6","/documents/0.6/bindable-v0-6.md"]],
  ["v-e462b392","/documents/0.6/classbind-v0-6.html",{"title":"挂载代码（v0.6）"},["/documents/0.6/classbind-v0-6","/documents/0.6/classbind-v0-6.md"]],
  ["v-81ebf93a","/documents/0.6/crypto-struct-v0-6.html",{"title":"内存加密结构（v0.6）"},["/documents/0.6/crypto-struct-v0-6","/documents/0.6/crypto-struct-v0-6.md"]],
  ["v-21d13184","/documents/0.6/guide-v0-6.html",{"title":"开发须知（v0.6）"},["/documents/0.6/guide-v0-6","/documents/0.6/guide-v0-6.md"]],
  ["v-b691c2d0","/documents/0.6/hotupdate-v0-6.html",{"title":"游戏热更（v0.6）"},["/documents/0.6/hotupdate-v0-6","/documents/0.6/hotupdate-v0-6.md"]],
  ["v-631293a5","/documents/0.6/ilruntime-tools-v0-6.html",{"title":"ILRuntime工具（v0.6）"},["/documents/0.6/ilruntime-tools-v0-6","/documents/0.6/ilruntime-tools-v0-6.md"]],
  ["v-58294c22","/documents/0.6/jaction-v0-6.html",{"title":"JAction（v0.6）"},["/documents/0.6/jaction-v0-6","/documents/0.6/jaction-v0-6.md"]],
  ["v-175caf43","/documents/0.6/jbehaviour-v0-6.html",{"title":"JBehaviour（v0.6）"},["/documents/0.6/jbehaviour-v0-6","/documents/0.6/jbehaviour-v0-6.md"]],
  ["v-1a39eea5","/documents/0.6/jengine-panel-v0-6.html",{"title":"JEngine面板（v0.6）"},["/documents/0.6/jengine-panel-v0-6","/documents/0.6/jengine-panel-v0-6.md"]],
  ["v-3a07bf60","/documents/0.6/jevent-v0-6.html",{"title":"JEvent（v0.6）"},["/documents/0.6/jevent-v0-6","/documents/0.6/jevent-v0-6.md"]],
  ["v-659935f0","/documents/0.6/jprefab-v0-6.html",{"title":"热更预制体解决方案 JPrefab（v0.6）"},["/documents/0.6/jprefab-v0-6","/documents/0.6/jprefab-v0-6.md"]],
  ["v-0a70373a","/documents/0.6/jresource-v0-6.html",{"title":"JResource（v0.6）"},["/documents/0.6/jresource-v0-6","/documents/0.6/jresource-v0-6.md"]],
  ["v-04813d9b","/documents/0.6/jsaver-v0-6.html",{"title":"JSaver（v0.6）"},["/documents/0.6/jsaver-v0-6","/documents/0.6/jsaver-v0-6.md"]],
  ["v-ea882f00","/documents/0.6/jui-v0-6.html",{"title":"JEngine.UI (JUI)（v0.6）"},["/documents/0.6/jui-v0-6","/documents/0.6/jui-v0-6.md"]],
  ["v-230d6dcd","/documents/0.6/jwebsocket-v0-6.html",{"title":"JWebSocket（v0.6）"},["/documents/0.6/jwebsocket-v0-6","/documents/0.6/jwebsocket-v0-6.md"]],
  ["v-46c1cdee","/documents/0.6/localization-v0-6.html",{"title":"Localization（v0.6）"},["/documents/0.6/localization-v0-6","/documents/0.6/localization-v0-6.md"]],
  ["v-0597b6b8","/documents/0.6/proto-tools-v0-6.html",{"title":"Protobuf 工具（v0.6）"},["/documents/0.6/proto-tools-v0-6","/documents/0.6/proto-tools-v0-6.md"]],
  ["v-0c17b73f","/documents/0.6/startup-v0-6.html",{"title":"开始使用 （v0.6）"},["/documents/0.6/startup-v0-6","/documents/0.6/startup-v0-6.md"]],
  ["v-5dbf2716","/documents/0.6/structure-v0-6.html",{"title":"目录结构（v0.6）"},["/documents/0.6/structure-v0-6","/documents/0.6/structure-v0-6.md"]],
  ["v-1221b575","/documents/0.6/ui-framework-v0-6.html",{"title":"JEngine.UI（By L-Fone）（v0.6）"},["/documents/0.6/ui-framework-v0-6","/documents/0.6/ui-framework-v0-6.md"]],
  ["v-6f177cf4","/documents/0.7/",{"title":"V0.7.x"},["/documents/0.7/index.html","/documents/0.7/README.md"]],
  ["v-446d879f","/zh/documents/",{"title":"概述"},["/zh/documents/index.html","/zh/documents/README.md"]],
  ["v-85adb592","/zh/documents/0.5/",{"title":"V0.5.x"},["/zh/documents/0.5/index.html","/zh/documents/0.5/README.md"]],
  ["v-85adb554","/zh/documents/0.6/",{"title":"V0.6.x"},["/zh/documents/0.6/index.html","/zh/documents/0.6/README.md"]],
  ["v-85adb516","/zh/documents/0.7/",{"title":"V0.7.x"},["/zh/documents/0.7/index.html","/zh/documents/0.7/README.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
