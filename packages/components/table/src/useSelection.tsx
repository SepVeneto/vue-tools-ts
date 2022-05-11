import { RowType } from './customTable'
import { computed, Ref } from 'vue'
export function useSelection(
  rowSelectionRef: Ref<any>,
  configRef: any
): [(data: RowType, config: Record<string, any>) => JSX.Element, () => JSX.Element] {
  const { getRowKey, pageData, getRowByKey } = configRef
  const mergedRowSelection = computed(() => {
    const tmp = rowSelectionRef.value ?? {}
    console.log(tmp)
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

  const rowKeys = computed(() => {
    return pageData.map(item => getRowKey(item)).filter(item => !!item)
  })

  function setSelectedKeys(keys: any[]) {
    // let availableKeys: any[] = [];
    // let rows = []
    const { preserved, onChange: onSelectionChange } = mergedRowSelection.value
    // availableKeys = keys;
    // keys.forEach(key => {
    //   const row = getRowByKey(key)
    //   if (row != null) {
    //     rows.push(row)
    //   }
    // })
    onSelectionChange?.(keys)
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
      setSelectedKeys(Array.from(keySet))
    }

    return (
      <el-checkbox
        model-value={keySet.has(key)}
        onClick={(e) => e.stopPropagation()}
        onChange={() => onRowSelect()}
      />
    )
  }
  function renderTop() {
    const keySet = new Set(derivedSelectedKeySet.value)
    const checkedCurrentAll = computed(() => rowKeys.value.every(key => keySet.has(key)))
    const checkedCurrentSome = computed(() => rowKeys.value.some(key => keySet.has(key)))
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
        model-value={checkedCurrentAll.value}
        indeterminate={!checkedCurrentAll.value && checkedCurrentSome.value}
        onChange={onSelectAllChange}
      />
    )
  }
  return [renderCell, renderTop]
}