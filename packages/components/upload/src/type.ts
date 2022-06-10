import { PropType, ExtractPropTypes } from 'vue';
import type { UploadRequestOptions } from 'element-plus'
export type UploadCallbackType = File | UploadRequestOptions | FormData
export const uploadProps = {
  /**
   * 是否展示
   */
  modelValue: Boolean,
  /**
   * 调用模板的下载接口
   */
  templateApi: Function as PropType<() => void>,
  /**
   * 调用文件的上传接口
   */
  uploadApi: Function as PropType<(data: UploadCallbackType) => Promise<ApiResponseType>>,
  callbackType: {
    type: String,
    default: 'form',
  },
  drag: {
    type: Boolean,
    default: true,
  }
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>;
