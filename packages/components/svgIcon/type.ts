import { ExtractPropTypes } from "vue";
export const svgIconProps = {
  /**
   * 宽度
   */
  width: [String, Number],
  /**
   * 高度
   */
  height: [String, Number],
  /**
   * 图标名（body中以雪碧图的形式导入）
   */
  icon: {
    type: String,
    default: '',
    required: true,
  },
  /**
   * 类名
   */
  className: {
    default: '',
    type: String,
  },
  /**
   * 标记
   */
  badge: [String, Number],
  /**
   * 是否禁用
   */
  disabled: Boolean,
}

export type SvgIconProps = ExtractPropTypes<typeof svgIconProps>;