import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { useConfigInject } from '@basic-components/hooks';
import customTable from './customTable';
import customPagination from './pagination.vue';
import { CellType } from './type';
import { tableProps } from './type';

export default defineComponent({
  name: 'BcTable',
  emits: ['update:modelValue'],
  components: {
    customTable,
    customPagination,
  },
  props: tableProps,
  setup(props, context) {
    const { arrayName, pageSizeName, pageName, response, table } = useConfigInject('bcTable', props);

    const arrayData = ref([]);
    const arrayTotal = ref(0)
    const simpleTable = reactive({ page: 1, rows: 5 });
    const loading = ref(false);
    // const tableDataName = ref(arrayName || '');
    const tableConfig = ref<Record<string, unknown>[]>([{}]);

    const customTableRef = ref();

    const configProviderTable = computed(() => table.value);
    const responseWrap = computed(() => response.value?.data ?? 'data')
    const tableDataName = computed(() => (props.arrayName || arrayName.value) ?? '')
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
        const { [pageName.value]: page, [pageSizeName.value]: rows, ...params } = props.modelValue;
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

    watch(() => props.config, (config: Record<string, unknown>[]) => {
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
      const wrap = responseWrap.value;
      const array = tableDataName.value;
      /* global ApiResponseType */
      return props.api?.().then((data: ApiResponseType) => {
        arrayData.value = (array ? data[wrap][array] : data[wrap]) || [];
        loading.value = false;
        arrayTotal.value = data[wrap][table.value?.totalName ?? 'total'] || 0;
        return Promise.resolve(arrayData.value);
      }).catch(() => {
        loading.value = false;
        arrayData.value = [];
        arrayTotal.value = 0;
      })
    }
    function updateParams(params: Record<string, unknown>) {
      const pageName = configProviderTable.value?.pageName ?? 'page';
      const pageSizeName = configProviderTable.value?.pageSizeName ?? 'rows';
      const { page, rows, ...args } = params;
      context.emit('update:modelValue', { ...args, [pageName]: page, [pageSizeName]: rows});
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
    function handlePageChange(page: number) {
      searchModel.value.page = page;
      updateParams(searchModel.value)
      props.custom ? props.api?.() : getList();
    }
    function handleRowsChange(rows: number) {
      searchModel.value.rows = rows;
      handlePageChange(1);
    }
    function handleSimplePageChange(page: number) {
      simpleTable.page = page;
    }
    function handleSimpleRowsChange(rows: number) {
      simpleTable.rows = rows;
    }

    const pagination = () => {
      if (!props.pagination) {
        return null;
      }
      return props.simple
        ? (<custom-pagination
            v-models={[
              [simpleTable.page, 'currentPage'],
              [simpleTable.rows, 'pageSize'],
            ]}
            {...{
              'onUpdate:currentPage': handleSimplePageChange,
              'onUpdate:pageSize': handleSimpleRowsChange,
            }}
            total={tableData.value.length}
            layout="prev, pager, next"
          />)
        : (<custom-pagination
            v-models={[
              [searchModel.value.page, 'currentPage'],
              [searchModel.value.rows, 'pageSize'],
            ]}
            {...{
              'onUpdate:currentPage': handlePageChange,
              'onUpdate:pageSize': handleRowsChange,
            }}
            {...context.attrs}
            total={props.custom ? props.total: arrayTotal.value}
          />)
    }
    context.expose({
      getList,
      clearSelection: () => customTableRef.value.clearSelection(),
      getRef: () => customTableRef.value.getRef()
    })
    return () => (
      <section class="bc-table-wrap">
        <custom-table
          class="bc-table"
          ref={customTableRef}
          config={tableConfig.value}
          data={props.simple ? simpleData.value : tableData.value}
          span-method={props.colspanOptions ? spanMethod : null}
          hidden-current={!!props.colspanOptions}
          body-border={!!props.colspanOptions}
          v-slots={context.slots}
          {...context.attrs}
        >
        </custom-table>
        {pagination()}
      </section>
    )
    
  },
})
