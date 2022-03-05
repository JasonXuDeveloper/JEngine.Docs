import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"JEngine - The solution that allows unity games update in runtime."},["/index.html","/README.md"]],
  ["v-ba934fd8","/config/",{"title":"Config"},["/config/index.html","/config/README.md"]],
  ["v-c0f957a0","/documents/",{"title":"Overview"},["/documents/index.html","/documents/README.md"]],
  ["v-2d0ad528","/zh/",{"title":"JEngine - 使Unity开发的游戏支持热更新的解决方案。"},["/zh/index.html","/zh/README.md"]],
  ["v-6f177d70","/documents/0.5/",{"title":"V0.5.x"},["/documents/0.5/index.html","/documents/0.5/README.md"]],
  ["v-6f177d32","/documents/0.6/",{"title":"V0.6.x"},["/documents/0.6/index.html","/documents/0.6/README.md"]],
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
