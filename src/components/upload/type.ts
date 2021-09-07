import { PropType, ExtractPropTypes } from 'vue';
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
  uploadApi: Function as PropType<(form: FormData) => Promise<ApiResponseType>>,
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>;
