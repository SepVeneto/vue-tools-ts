import { PropType, ExtractPropTypes } from 'vue';
type IInputBorder = PropType<'none' | 'bottom' | 'all'>;

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
    validator: (val: string) => {
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
   * 密码输入框，通常用于不想触发浏览器的自动填写
   */
  password: Boolean,
}

export type InputProps = Partial<ExtractPropTypes<typeof inputProps>>;