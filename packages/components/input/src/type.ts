import { PropType, ExtractPropTypes, DefineComponent } from 'vue';
type IInputBorder = PropType<'none' | 'bottom' | 'all'>;
type ICopyOptions = {
  size?: number,
  color?: string,
  icon?: string,
}

export const inputProps = {
  /**
   * 默认值
   */
  defaultValue: [String, Number],
  /**
   * 只读，和readonly类似，通常用于打印
   */
  onlyDisplay: Boolean,
  /**
   * 是否显示边框
   */
  border: {
    type: String as IInputBorder,
    validator: (val: string): boolean => {
      return ['none', 'bottom', 'all'].includes(val);
    },
    default: 'all',
  },
  /**
   * 输入框的宽度
   */
  width: {
    type: [String, Number],
    default: '100%',
  },
  /**
   * 显示复制按钮，支持自定义图标
   */
  copy: {
    type: [Boolean, Object] as PropType<boolean | ICopyOptions | DefineComponent>,
    default: false,
  }
}

export type InputProps = Partial<ExtractPropTypes<typeof inputProps>>;