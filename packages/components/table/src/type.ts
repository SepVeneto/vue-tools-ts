import { PropType, ExtractPropTypes } from 'vue';
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

export const tableProps = {
  /**
   * 远程获取表格数据的字段名，可通过config-provider全局设置，默认rows
   */
  arrayName: {
    type: String,
    default: '',
  },
  /**
   * 列合并的相关设置
   */
  colspanOptions: {
    type: Object as PropType<Colspanoptions>,
    default: () => ({}),
  },
  /**
   * 表格的内边距
   */
  padding: {
    type: Boolean,
    default: true,
  },
  /**
   * 自定义表格数据（也就是常规的elementui table的用法）
   */
  custom: Boolean,
  /**
   * 表格数据
   */
  data: Array,
  /**
   * 表格数据的过滤器
   */
  filter: Function,
  /**
   * 针对远程数据，是否需要自动获取（created阶段请求数据）
   */
  immediate: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否开启分页功能
   */
  pagination: Boolean,
  /**
   * 远程数据获取的回调函数，支持promise
   */
  api: Function,
  /**
   * 分页参数，支持双向绑定
   */
  modelValue: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({ page: 1, rows: 20 })
  },
  /**
   * 表格列的配置
   */
  config: {
    type: Array as PropType<Record<string, unknown>[]>,
    default: () => [],
  },
  /**
   * 常规用法下开启分页功能，需要的总数
   */
  total: {
    type: Number,
    default: 0,
  },
  /**
   * 固定底部的横向滚动条（Beta）
   */
  fixXScroll: Boolean,
  /**
   * 简易表格，支持本地分页
   */
  simple: Boolean,
  /**
   * 是否开启接口请求时的loading过渡
   */
  load: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否禁用activated时自动触发列表更新
   */
  activatedUpdate: {
    type: Boolean,
  }
}

export type TableProps = Partial<ExtractPropTypes<typeof tableProps>>;
