import { ExtractPropTypes } from "vue";
export const clipboardProps = {
  /**
   * css选择器
   */
  dom: String,
  /**
   * 需要复制的文本
   */
  text: String,
  /**
   * 复制成功的提示文本
   */
  message: {
    type: String,
    default: '复制成功',
  },
  /**
   * 复制成功的回调函数
   */
  success: {
    type: Function,
  }
}

export type ClipboardProps = Partial<ExtractPropTypes<typeof clipboardProps>>;