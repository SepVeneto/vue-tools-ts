import { RowType } from './customTable'
import { computed, Ref, shallowRef, watchEffect } from 'vue'
export function useSelection(
  rowSelectionRef: Ref<any>,
  configRef: {
    getRowKey: (row: Record<string, any>) => string,
    pageData: Record<string, any>,
    getRecordByKey: (key: string) => Record<string, any>
  }
): [(data: RowType, config: Record<string, any>) => JSX.Element, () => JSX.Element] {
  const { getRowKey, pageData } = configRef
  const mergedRowSelection = computed(() => {
    const tmp = rowSelectionRef.value ?? {}
    return { ...tmp }
  })

  const mergedSelectedKeys = computed(() => {
    return mergedRowSelection.value.selectedRowKeys
  })

  const selectKeysState = computed(() => {
    return mergedSelectedKeys.value
  })

  const derivedSelectedKey = computed(() => selectKeysState.value)

  const derivedSelectedKeySet = computed(() => {
    const keys = derivedSelectedKey.value
    return new Set(keys)
  })
  const preserveRecords = shallowRef(new Map<any, Record<string, any>>())

  const rowKeys = computed(() => {
    return pageData.value.map(item => getRowKey(item)).filter(item => !!item)
  })

  watchEffect(() => {
    updateRecordsCache(mergedSelectedKeys.value)
  })

  function updateRecordsCache(keys: any[]) {
    if (mergedRowSelection.value.preserveRowKeys) {
      const newCache = new Map<any, Record<string, any>>()
      keys.forEach(key => {
        let record = configRef.getRecordByKey(key)
        if (!record && preserveRecords.value.has(key)) {
          record = preserveRecords.value.get(key)!
        }
        newCache.set(key, record)
      })
      preserveRecords.value = newCache;
    }
  }

  function setSelectedKeys(keys: any[], record?: RowType) {
    let avaliableKeys: any[] = [];
    let records: Record<string, any>[] = []
    updateRecordsCache(keys)
    const { preserveRowKeys, onChange: onSelectionChange } = mergedRowSelection.value
    if (preserveRowKeys) {
      avaliableKeys = keys
      records = keys.map(key => preserveRecords.value.get(key)!)
    } else {
      keys.forEach(key => {
        const record = configRef.getRecordByKey(key)
        if (record !== undefined) {
          avaliableKeys.push(key)
          records.push(record)
        }
      })
    }
    onSelectionChange?.(avaliableKeys, records, record)
  }

  function renderCell({ row }: RowType, config: Record<string, any>) {
    const keySet = new Set(derivedSelectedKeySet.value)
    const key = getRowKey(row)

    function onRowSelect() {
      const rowkey = getRowKey(row)
      if (keySet.has(rowkey)) {
        keySet.delete(rowkey)
      } else {
        keySet.add(rowkey)
      }
      setSelectedKeys(Array.from(keySet), row)
    }

    return (
      <el-checkbox
        model-value={keySet.has(key)}
        onClick={(e: MouseEvent) => e.stopPropagation()}
        onChange={() => onRowSelect()}
      />
    )
  }
  function renderTop() {
    const keySet = new Set(derivedSelectedKeySet.value)
    const disabledChecked = computed(() => rowKeys.value.length === 0)
    const checkedCurrentAll = computed(() => rowKeys.value.every((key: string) => keySet.has(key)))
    const checkedCurrentSome = computed(() => rowKeys.value.some((key: string) => keySet.has(key)))
    function onSelectAllChange() {
      if (checkedCurrentAll.value) {
        rowKeys.value.forEach(key => {
          keySet.delete(key)
        })
      } else {
        rowKeys.value.forEach(key => {
          if (!keySet.has(key)) {
            keySet.add(key)
          }
        })
      }
      setSelectedKeys(Array.from(keySet))
    }
    return (
      <el-checkbox
        model-value={checkedCurrentAll.value && !disabledChecked.value}
        indeterminate={!checkedCurrentAll.value && checkedCurrentSome.value}
        onChange={onSelectAllChange}
        disabled={disabledChecked.value}
      />
    )
  }
  return [renderCell, renderTop]
}