import { watch, shallowRef } from 'vue'
import type { Ref } from 'vue'
export default function useLazyStore(
  dataRef: Ref<readonly Record<string, any>[]>,
  getRowKeyFn: Ref<Function>
) {
  const cacheRef = shallowRef<any>({})
  watch([dataRef], () => {
    const store = new Map<string, Record<string, any>>()
    dataRef.value.forEach(record => {
      const rowKey = getRowKeyFn.value(record)
      store.set(rowKey, record)
    })
    cacheRef.value = {
      store
    }
  }, { immediate: true, deep: true })
  function getRecordByKey(key: string): Record<string, any> {
    return cacheRef.value.store!.get(key)!
  }
  return [getRecordByKey];
}