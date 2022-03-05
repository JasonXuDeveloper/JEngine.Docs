import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"JEngine - The solution that allows unity games update in runtime."},["/index.html","/README.md"]],
  ["v-ba934fd8","/config/",{"title":"Config"},["/config/index.html","/config/README.md"]],
  ["v-c0f957a0","/documents/",{"title":"Overview"},["/documents/index.html","/documents/README.md"]],
  ["v-2d0ad528","/zh/",{"title":"JEngine - 使Unity开发的游戏支持热更新的解决方案。"},["/zh/index.html","/zh/README.md"]],
  ["v-6f177d70","/documents/0.5/",{"title":"V0.5.x"},["/documents/0.5/index.html","/documents/0.5/README.md"]],
  ["v-39ed57da","/documents/0.5/bindable.html",{"title":"可绑定数据"},["/documents/0.5/bindable","/documents/0.5/bindable.md"]],
  ["v-31131b8c","/documents/0.5/classbind.html",{"title":"挂载代码"},["/documents/0.5/classbind","/documents/0.5/classbind.md"]],
  ["v-7bd53a60","/documents/0.5/crypto-struct.html",{"title":"内存加密结构"},["/documents/0.5/crypto-struct","/documents/0.5/crypto-struct.md"]],
  ["v-8b4c6ab6","/documents/0.5/guide.html",{"title":"开发须知"},["/documents/0.5/guide","/documents/0.5/guide.md"]],
  ["v-6da72a8b","/documents/0.5/hotupdate.html",{"title":"游戏热更"},["/documents/0.5/hotupdate","/documents/0.5/hotupdate.md"]],
  ["v-8707b6c4","/documents/0.5/ilruntime-tools.html",{"title":"ILRuntime工具"},["/documents/0.5/ilruntime-tools","/documents/0.5/ilruntime-tools.md"]],
  ["v-c19d79fe","/documents/0.5/jaction.html",{"title":"JAction"},["/documents/0.5/jaction","/documents/0.5/jaction.md"]],
  ["v-1a92ca44","/documents/0.5/jbehaviour.html",{"title":"JBehaviour"},["/documents/0.5/jbehaviour","/documents/0.5/jbehaviour.md"]],
  ["v-6fa41f1a","/documents/0.5/jprefab.html",{"title":"热更预制体解决方案 JPrefab"},["/documents/0.5/jprefab","/documents/0.5/jprefab.md"]],
  ["v-b2b496ae","/documents/0.5/jresource.html",{"title":"JResource"},["/documents/0.5/jresource","/documents/0.5/jresource.md"]],
  ["v-f90165f4","/documents/0.5/jsaver.html",{"title":"JSaver"},["/documents/0.5/jsaver","/documents/0.5/jsaver.md"]],
  ["v-0e3e3c63","/documents/0.5/jui.html",{"title":"JEngine.UI (JUI)"},["/documents/0.5/jui","/documents/0.5/jui.md"]],
  ["v-1e43acd0","/documents/0.5/localization.html",{"title":"Localization"},["/documents/0.5/localization","/documents/0.5/localization.md"]],
  ["v-f0e00baa","/documents/0.5/proto-tools.html",{"title":"Protobuf 工具"},["/documents/0.5/proto-tools","/documents/0.5/proto-tools.md"]],
  ["v-d06ccc78","/documents/0.5/startup.html",{"title":"开始使用"},["/documents/0.5/startup","/documents/0.5/startup.md"]],
  ["v-4bb1e68e","/documents/0.5/structure.html",{"title":"目录结构"},["/documents/0.5/structure","/documents/0.5/structure.md"]],
  ["v-6f177d32","/documents/0.6/",{"title":"V0.6.x"},["/documents/0.6/index.html","/documents/0.6/README.md"]],
  ["v-d86e7bca","/documents/0.6/bindable.html",{"title":"可绑定数据"},["/documents/0.6/bindable","/documents/0.6/bindable.md"]],
  ["v-12a4f96b","/documents/0.6/classbind.html",{"title":"挂载代码"},["/documents/0.6/classbind","/documents/0.6/classbind.md"]],
  ["v-637710bf","/documents/0.6/crypto-struct.html",{"title":"内存加密结构"},["/documents/0.6/crypto-struct","/documents/0.6/crypto-struct.md"]],
  ["v-7be91ff8","/documents/0.6/guide.html",{"title":"开发须知"},["/documents/0.6/guide","/documents/0.6/guide.md"]],
  ["v-4f39086a","/documents/0.6/hotupdate.html",{"title":"游戏热更"},["/documents/0.6/hotupdate","/documents/0.6/hotupdate.md"]],
  ["v-4301df3d","/documents/0.6/ilruntime-tools.html",{"title":"ILRuntime工具"},["/documents/0.6/ilruntime-tools","/documents/0.6/ilruntime-tools.md"]],
  ["v-fde1e6c0","/documents/0.6/jaction.html",{"title":"JAction"},["/documents/0.6/jaction","/documents/0.6/jaction.md"]],
  ["v-436078df","/documents/0.6/jbehaviour.html",{"title":"JBehaviour"},["/documents/0.6/jbehaviour","/documents/0.6/jbehaviour.md"]],
  ["v-016da43d","/documents/0.6/jengine-panel.html",{"title":"JEngine面板"},["/documents/0.6/jengine-panel","/documents/0.6/jengine-panel.md"]],
  ["v-39290aa2","/documents/0.6/jevent.html",{"title":"JEvent"},["/documents/0.6/jevent","/documents/0.6/jevent.md"]],
  ["v-abe88bdc","/documents/0.6/jprefab.html",{"title":"热更预制体解决方案 JPrefab"},["/documents/0.6/jprefab","/documents/0.6/jprefab.md"]],
  ["v-ef90daf0","/documents/0.6/jresource.html",{"title":"JResource"},["/documents/0.6/jresource","/documents/0.6/jresource.md"]],
  ["v-72025387","/documents/0.6/jsaver.html",{"title":"JSaver"},["/documents/0.6/jsaver","/documents/0.6/jsaver.md"]],
  ["v-0287ad82","/documents/0.6/jui.html",{"title":"JEngine.UI (JUI)"},["/documents/0.6/jui","/documents/0.6/jui.md"]],
  ["v-02614c15","/documents/0.6/jwebsocket.html",{"title":"JWebSocket"},["/documents/0.6/jwebsocket","/documents/0.6/jwebsocket.md"]],
  ["v-4e34e80c","/documents/0.6/limits.html",{"title":"ILRuntime限制"},["/documents/0.6/limits","/documents/0.6/limits.md"]],
  ["v-82eee94e","/documents/0.6/localization.html",{"title":"Localization"},["/documents/0.6/localization","/documents/0.6/localization.md"]],
  ["v-4c21dc4a","/documents/0.6/proto-tools.html",{"title":"Protobuf 工具"},["/documents/0.6/proto-tools","/documents/0.6/proto-tools.md"]],
  ["v-79a76363","/documents/0.6/startup.html",{"title":"开始使用"},["/documents/0.6/startup","/documents/0.6/startup.md"]],
  ["v-2d43c46d","/documents/0.6/structure.html",{"title":"目录结构"},["/documents/0.6/structure","/documents/0.6/structure.md"]],
  ["v-20d8db6d","/documents/0.6/ui-framework.html",{"title":"JEngine.UI（By L-Fone）"},["/documents/0.6/ui-framework","/documents/0.6/ui-framework.md"]],
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
