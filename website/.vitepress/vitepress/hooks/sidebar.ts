import { useRoute, useData } from 'vitepress'

interface IConfig {
  name: string,
  link: string,
}

export const useSidebar = () => {
  const route = useRoute();
  const { site } = useData()
  const menus: Record<string, IConfig[]> = site.value.themeConfig.sidebar;
  const baseUrl = site.value.base ?? '/';
  const sidebar = Object.entries(menus).map(([path, menu]) => {
    return menu.map(item => ({
      ...item,
      link: `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}${path}/${item.link}`
    }))
  })
  return {
    sidebar: sidebar.reduce((res, curr) => {
      console.log(curr)
      res.push(...curr)
      return res;
    }, [])
  }
  // return {
  //   sidebar: site.value.themeConfig.sidebar.list.map((item: IConfig) => {
  //     return {
  //       ...item,
  //       link: '/components/' + item.link,
  //     }
  //   })
  // }
}