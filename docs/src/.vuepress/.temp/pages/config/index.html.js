export const data = {
  "key": "v-ba934fd8",
  "path": "/config/",
  "title": "Config",
  "lang": "en-US",
  "frontmatter": {
    "sidebar": "auto"
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "foo",
      "slug": "foo",
      "children": []
    },
    {
      "level": 2,
      "title": "bar",
      "slug": "bar",
      "children": []
    }
  ],
  "git": {
    "updatedTime": 1646433425000,
    "contributors": [
      {
        "name": "root",
        "email": "root@vps-023bdc5d.vps.ovh.ca",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "config/README.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
