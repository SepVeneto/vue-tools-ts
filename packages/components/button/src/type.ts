import { ExtractPropTypes } from 'vue';
export const buttonProps = {
  /**
   * 是否需要二次操作的确认提示，支持自定义提示文本
   */
  confirm: [Boolean, String],
  /**
   * 是否打开按钮的提示框，一般配合mini使用，通常用于表述操作列操作过多
   */
  tooltip: Boolean,
  /**
   * 自定义图标，只支持通过svg-sprite加载后的图标名称
   */
  icon: String,
  /**
   * 小按钮，只显示图标，一般配置tooltip来提示操作文本
   */
  mini: Boolean,
  /**
   * 按钮类型
   */
  type: {
    type: String,
    default: null,
  }
}

export type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps>>;