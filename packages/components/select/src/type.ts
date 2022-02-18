/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExtractPropTypes, PropType } from 'vue';

export type SelectOption = {
  children?: SelectOption[],
  [key: string]: any,
}

export type SelectOptions = SelectOption[]

export type selectApiType = '';

export const selectProps = {
  /**
   * 选项列表对应的字段名称，可通过config-provider全局设置
   */
  arrayName: String,
  /**
   * 是否需要分组（根据children分组）
   */
  group: Boolean,
  /**
   * 默认值
   */
  defaultValue: String,
  /**
   * 是否自动拉取远程数据
   */
  immediate: {
    type: Boolean,
    default: true,
  },
  /**
   * 只读，与readonly类似，通常用于打印
   */
  onlyDisplay: Boolean,
  /**
   * value为对象时需要设置key
   */
  optionKey: {
    type: String,
    default: 'value',
  },
  /**
   * 选择框的宽度
   */
  width: [String, Number],
  modelValue: [String, Array, Object, Number],
  /**
   * 拉取远程数据时调用的函数，支持promise
   */
  api: {
    type: Function as PropType<() => Promise<ApiResponseType>>,
    validator(val: () => unknown | selectApiType): boolean {
      const allow = ['users', 'groups', 'ips', 'shterm'];
      return typeof val === 'function' || allow.includes(val)
    }
  },
  /**
   * 本地选项列表
   */
  options: {
    type: Array as PropType<SelectOptions>,
  },
  /**
   * 选项中用于展示的字段，可通过config-provider全局设置
   */
  customLabel: {
    type: String,
  },
  /**
   * 选项中用于取值的字段，可通过config-provider全局设置
   */
  customValue: {
    type: String,
  },
  /**
   * 禁用选项的条件
   */
  itemDisabled: Function as PropType<(val: unknown) => boolean>,
}

export type SelectProps = Partial<ExtractPropTypes<typeof selectProps>>;
