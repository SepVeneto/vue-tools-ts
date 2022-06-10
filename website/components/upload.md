# Upload

上传弹框，自定义上传方式和下载模板

## 基本用法

通过`v-model`可以控制上传弹框的显示与否，同时需要`template-api`和`upload-api`来实现模板下载和文件上传的具体实现。

:::demo

upload/basic

:::

## Upload 属性
| 属性           | 说明                                                      | 类型                | 可选值 | 默认值                  |
| :------------- | :-------------------------------------------------------- | :------------------ | :----- | :---------------------- |
| modelValue/v-model | 控制弹框展示 | boolean | - | - |
| template-api | 下载模板的回调 | (): void | - | - |
| upload-api | 触发文件上传的回调 | (form: File | FormData | UploadRequestOptions): Promise | - | 相当于`el-upload`的`http-request` |
| callback-type | 文件上传回调的参数 | string | 'file','form','raw' | 'form' |