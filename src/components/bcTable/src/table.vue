<script lang="tsx">
import { computed, defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue'
import useConfigInject from '@/components/_util/hooks/useConfigInject';
import customTable from './customTable';
import { TableColumnCtx } from 'element-plus/lib/components/table/src/table-column/defaults';

export type CellType = {
  row: Record<string, unknown>,
  rowIndex: number,
  column: TableColumnCtx<unknown>,
  columnIndex: number,
};

export type Colspanoptions = {
  includes: string[],
  parentProp: string,
}

export default defineComponent({
  name: 'BcTable',
  components: {
    customTable,
  },
  props: {
    arrayName: {
      type: String,
      default: '',
    },
    colspanOptions: {
      type: Object as PropType<Colspanoptions>,
      default: () => ({}),
    },
    padding: {
      type: Boolean,
      default: true,
    },
    custom: Boolean,
    data: Array,
    filter: Function,
    immediate: {
      type: Boolean,
      default: true,
    },
    pagination: Boolean,
    api: Function,
    params: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => ({ page: 1, rows: 20 })
    },
    config: {
      type: Array as PropType<Record<string, unknown>[]>,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    fixXScroll: Boolean,
    simple: Boolean,
    load: {
      type: Boolean,
      default: true,
    }
  },
  setup(props, context) {
    onMounted(() => {
      console.log(context.slots)
    })
    const { arrayName, pageSizeName, pageName } = useConfigInject('bcTable', props);

    const arrayData = ref([]);
    const arrayTotal = ref(0)
    const simpleTable = reactive({ page: 1, rows: 5 });
    const loading = ref(false);
    const configProviderTable = ref<Record<string, unknown>>({});
    const tableDataName = ref(arrayName || '');
    const tableConfig = ref<Record<string, unknown>[]>([{}]);

    const customTableRef = ref();

    const tableData = computed<Record<string, unknown>[]>(() => {
      if (props.data && props.data.length > 0) {
        return [...props.data || []];
      } else {
        return props.filter ? props.filter(arrayData.value) : [...arrayData.value];
      }
    });

    const totalColumn = computed(() => {
      const { includes = [], parentProp = null } = props.colspanOptions;
      const totalColumn: Record<string, { index: number, num: number }> = {};
      const whiteList: Record<string, number> = {};
      includes.forEach(item => {
        whiteList[item] = 0;
      })
      tableData.value.forEach((row: Record<string, unknown>) => {
        Object.keys(row).forEach(key => {
          if (!Object.keys(whiteList).includes(key)) {
            return;
          }
          const spanKey = parentProp
            ? `${row[parentProp]}_${key}_${row[key]}`
            : `${key}_${row[key]}`;
          const column = totalColumn[spanKey];
          if (!row[key]) {
            whiteList[key] += 1;
            return;
          }
          if (column != null) {
            Object.assign(totalColumn[spanKey], { num: column.num + 1 });
          } else {
            totalColumn[spanKey] = {
              index: whiteList[key],
              num: 1,
            };
          }
          whiteList[key] += 1;
        })
      })
      return totalColumn;
    });
    const searchModel = computed({
      get() {
        const pageName = configProviderTable.value.pageName as string;
        const pageSizeName = configProviderTable.value.pageSizeName as string;
        const { [pageName]: page, [pageSizeName]: rows, ...params } = props.params;
        return { page, rows, ...params };
      },
      set(obj: Record<string, unknown>) {
        updateParams(obj)
      }
    });
    const simpleData = computed(() => {
      const { page, rows} = simpleTable;
      const start = (page - 1) * rows;
      const end = page * rows;
      return props.data?.slice(start, end);
    })

    watch(props.config, (config: Record<string, unknown>[]) => {
      config && (tableConfig.value = [...config]);
    }, { deep: true, immediate: true})

    if (props.custom) {
      props.api && props.immediate && props.api();
    } else {
      if (props.load && props.immediate && props.api) {
        loading.value = true;
      }
      props.api && props.immediate && getList();
    }

    function getList() {
      if (!props.custom && props.load) {
        loading.value = true;
      }
      /* global ApiResponseType */
      return props.api?.().then((data: ApiResponseType) => {
        arrayData.value = (tableDataName.value ? data.data[tableDataName.value] : data.data) || [];
        // loading.value = false;
        arrayTotal.value = data.data.total || 0;
        return Promise.resolve(arrayData.value);
      }).catch(() => {
        loading.value = false;
        arrayData.value = [];
        arrayTotal.value = 0;
      })
    }
    function updateParams(params: Record<string, unknown>) {
      const pageName = configProviderTable.value.pageName as string;
      const pageSizeName = configProviderTable.value.pageSizeName as string;
      const { page, rows, ...args } = params;
      context.emit('update:params', { ...args, [pageName]: page, [pageSizeName]: rows});
    }
    function spanMethod({ row, column, rowIndex }: CellType ) {
      const { includes = [], parentProp = null } = props.colspanOptions;
      const key = column.property;
      const spanKey = parentProp
        ? `${row[parentProp]}_${key}_${row[key]}`
        : `${key}_${row[key]}`;
      if (!includes.includes(key) || row[key] == null) {
        return {
          colspan: 1,
          rowspan: 1,
        };
      }
      if (rowIndex === totalColumn.value[spanKey].index) {
        return {
          colspan: 1,
          rowspan: totalColumn.value[spanKey].num,
        }
      } else {
        return [0, 0];
      }
    }
    return () => (
      <custom-table
        ref={customTableRef}
        v-loading={loading.value}
        config={tableConfig.value}
        data={props.simple ? simpleData : tableData.value}
        span-method={props.colspanOptions ? spanMethod : null}
        hidden-current={!!props.colspanOptions}
        body-border={!!props.colspanOptions}
        v-slots={context.slots}
        {...context.attrs}
      >
      </custom-table>
    )
    
  },
})
</script>
