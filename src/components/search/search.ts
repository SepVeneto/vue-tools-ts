import { PropType, ExtractPropTypes } from 'vue';
export type SearchOperate = 'create' | 'search' | 'reset' | 'upload' | 'export' | 'advance';

export type RenderInputCofnigType = {
  catalog: 'input' | 'select' | 'datepicker',
  prop: string,
  name?: string,
  options?: Record<string, unknown>,
  [key: string]: unknown,
}

export const searchProps = {
  /**
   * 查询操作默认设置页码的字段名，默认是page，可通过config-provider设置
   */
  pageName: String,
  /**
   * 查询的默认值，会影响到重置操作
   */
  defaultValue: {
    type: Object,
    default: () => ({})
  },
  /**
   * 是否需要显示新增按钮
   */
  create: Boolean,
  /**
   * 搜索栏支持的查询内容
   */
  config: {
    type: Array as PropType<RenderInputCofnigType[]>,
    default: () => [],
  },
  /**
   * 查询的具体参数，会自动添加分页页码
   */
  modelValue: {
    type: Object,
    required: true
  },
  /**
   * 搜索按钮的回调函数
   */
  search: Function as PropType<(event?: MouseEvent) => void>,
  /**
   * 是否使用导入（上传）功能
   */
  import: Boolean,
  /**
   * 是否使用导出（下载）功能
   */
  export: {
    type: Boolean,
    default: true,
  },
  /**
   * 高级搜索（暂未实现）
   */
  advance: Boolean,
  /**
   * 高级搜索的字段（暂未实现）
   */
  fields: {
    type: Array,
    default: () => [],
  },
  /**
   * 上传相关配置
   */
  upload: Object,
  /**
   * 搜索栏自带按钮的布局顺序
   */
  layout: {
    type: Array as PropType<SearchOperate[]>,
    default: () => ['create', 'search', 'reset', 'upload', 'export'],
  }
}

export type SearchProps = Partial<ExtractPropTypes<typeof searchProps>>;