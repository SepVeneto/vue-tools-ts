import { useData } from 'vitepress'
import { computed } from 'vue'
import type { PageData, Header } from 'vitepress'

type EnhanceArrayElement<T, P> = T extends Array<infer U> ? (U & P)[]: never;

// type Headers = EnhanceArrayElement<
//   PageData['headers'],
//   {
//     children?: Headers
//   }
// >

export const useCatalog = () => {
  const { page } = useData();
  console.log(page.value)
  return computed(() => resolveHeaders(page.value.headers))
}
function resolveHeaders(headers: PageData['headers']) {
  return headers.map(item => {
    return {
      text: item.title,
      link: `#${item.slug}`,
    }
  })
}
