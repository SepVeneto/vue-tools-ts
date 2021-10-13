import { defineComponent, getCurrentInstance, onMounted, ref, watch, PropType } from 'vue';
import { TableColumnCtx } from 'element-plus/lib/components/table/src/table-column/defaults';
import { getValue, setValue } from '../../_util/tools';
import cellEdit from './cellEdit';

export type RowType = {
  row: any,
  column: TableColumnCtx<unknown>,
  $index: number,
}

export default defineComponent({
  name: 'CustomTable',
  emits: ['save', 'radio', 'select'],
  components: {
    cellEdit,
  },
  props: {
    disableTravel: Boolean,
    bodyBorder: Boolean,
    wrapHeader: Boolean,
    showOverflowTooltip: Boolean,
    hiddenCurrent: Boolean,
    rowEdit: Boolean,
    banSelectAll: Boolean,
    refs: String,
    customIcon: Boolean,
    data: {
      type: Array,
      default: () => [],
    },
    config: {
      type: Array as PropType<Record<string, unknown>[]>,
      default: () => [],
    },
    htmlContent: Boolean,
  },
  setup(props, context) {
    const tableConfig = ref<Record<string, unknown>[]>([]);
    const radio = ref('');
    const instance = getCurrentInstance();

    const tableRef = ref();

    watch(() => props.config, (config) => {
      tableConfig.value = [...config] ;
    }, { immediate: true, deep: true });

    function getRowKey(row: any, rowKey: string | ((row: any) => string), index: number) {
      if (typeof rowKey === 'function') {
        return rowKey(row);
      } else if (row[rowKey]) {
        return row[rowKey];
      } else {
        console.warn('不推荐使用index作为key')
        return index;
      }
    }

    onMounted(() => {
      if (props.banSelectAll) {
        const node = tableRef.value.$el.querySelector('.custom-header');
        const checkbox = node.querySelector('.el-checkbox');
        checkbox?.remove();
      }
    })
    const renderRadio = (row: any, index: number, config: any) => (
      <el-radio
        model-value={radio.value}
        {...{
          'onUpdate:modelValue': (val: string) => {
            radio.value = val;
            context.emit('radio', radio.value, row);
            context.emit('select', [row]);
          }
        }}
        label={getRowKey(row, context.attrs.rowKey as any, index)}
        disabled={config.selectable ? !config.selectable(row) : false}
      ><span></span></el-radio>
    )
    const renderCellEdit = (row: any, column: TableColumnCtx<any>, config: any) => (
      <cell-edit
        modelValue={getValue(row, column.property, config, props.disableTravel)}
        onBlur={(val: string) => { setValue(row, column.property, val) }}
        onSave={(cell: string) => { instance?.parent?.emit('save', cell, column.property)}}
      />
    )

    const getColumnSlot = (data: RowType, config: any) => {
      if (config.children && config.children.length > 0) {
        return tableColumns(config.children);
      }
      const { row, column, $index } = data;
      if (config.type === 'expand') {
        return context.slots.expand;
      } else if (config.type === 'radio') {
        return renderRadio(row, $index, config);
      } else if (config.editable) {
        return renderCellEdit(row, column, config);
      }
      const slot = context.slots[config.prop];
      return slot
        ? slot(data)
        : <span>{getValue(row, column.property, config, props.disableTravel)}</span>
    };

    const tableColumns = (configList: Record<string, unknown>[]): JSX.Element => (
      <>
        {configList.map((config: any) => {
          return (
            <el-table-column
              show-overflow-tooltip={props.showOverflowTooltip}
              v-slots={{
                default: (data: RowType) => getColumnSlot(data, config),
                header: (({column, $index}: RowType) => {
                  const header = context.slots[`${config.prop}-header`];
                  return header ? header({column, $index}) : <span>{column.label}</span>
                })
              }}
              label={config.label}
              prop={config.prop}
              width={config.width}
              showOverflowTooltip={config.showOverflowTooltip}
            ></el-table-column>
          )
        })}
      </>
    );
    return () => (
      <el-table
        class={['custom-table', { 'cutom-icon': props.customIcon }, { 'current-hover': props.hiddenCurrent }]}
        ref={tableRef}
        border
        data={props.data}
        header-cell-class-name="custom-header"
        {...context.attrs}
      >
        {tableColumns(tableConfig.value)}
      </el-table>
    )
  }
})
