import { ExtractPropTypes } from "vue";
export const dialogProps = {
  /**
   * 是否隐藏底部操作栏
   */
  noFooter: Boolean
}

export type DialogProps = Partial<ExtractPropTypes<typeof dialogProps>>;