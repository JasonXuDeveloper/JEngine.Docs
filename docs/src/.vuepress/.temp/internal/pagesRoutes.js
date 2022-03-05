import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":12345},["/index.html","/README.md"]],
  ["v-ba934fd8","/config/",{"title":"Config"},["/config/index.html","/config/README.md"]],
  ["v-fffb8e28","/guide/",{"title":"Introduction"},["/guide/index.html","/guide/README.md"]],
  ["v-79e93bb0","/guide/using-vue.html",{"title":"Using Vue in Markdown"},["/guide/using-vue","/guide/using-vue.md"]],
  ["v-2d0ad528","/zh/",{"title":"页面的标题"},["/zh/index.html","/zh/README.md"]],
  ["v-47357bdb","/zh/guide/",{"title":"介绍"},["/zh/guide/index.html","/zh/guide/README.md"]],
  ["v-2b895252","/zh/guide/using-vue.html",{"title":"使用"},["/zh/guide/using-vue","/zh/guide/using-vue.md"]],
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
