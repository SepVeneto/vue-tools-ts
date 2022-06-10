<template>
  <bc-dialog width="480px" v-model="dialogVisible" title="文件导入" append-to-body noFooter>
    <section v-loading="uploading">
      <el-alert type="warning" :closable="false">
        <template #default>
          <div class="text-center">
            <span>您是否有标准的Excel模版，需要依照模版导入，否则会失败。</span><br>
            <el-link type="primary" @click="handleDownloadTemplate">还没有Excel模版?请下载模版</el-link>
          </div>
        </template>
      </el-alert>
      <el-upload
        style="text-align: center; margin-top: 20px"
        action=""
        ref="uploadRef"
        :show-file-list="false"
        with-credentials
        :httpRequest="uploadFile"
        accept=".xlsx,.xls"
        :drag="drag"
      >
        <template v-if="drag">
          <el-icon class="el-icon--upload"><plus /></el-icon>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </template>
        <div class="el-upload-dragger" v-else>
          <el-icon class="el-icon--upload"><plus /></el-icon>
          <div class="el-upload__text"><em>点击上传</em></div>
        </div>
        <!-- <div class="el-upload__tip" slot="tip">只能上传excel文件</div> -->
      </el-upload>
    </section>
  </bc-dialog>
</template>

<script lang="ts">
import { UploadRequestOptions } from 'element-plus'
import { defineComponent, computed, ref } from 'vue';
import { uploadProps } from './type';
import { Plus } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'BcUpload',
  emits: ['update:modelValue', 'success', 'error'],
  props: uploadProps,
  components: {
    Plus,
  },
  setup(props, context) {
    const uploading = ref(false);
    const uploadRef = ref();

    const dialogVisible = computed({
      get() {
        return props.modelValue;
      },
      set(visible) {
        context.emit('update:modelValue', visible);
      }
    });

    function uploadFile(options: UploadRequestOptions) {
      uploading.value = true;
      const upload = uploadRef.value;
      const form = new FormData()

      let callbackData: File | UploadRequestOptions | FormData;
      switch (props.callbackType) {
        case 'file':
          callbackData = options.file
          break;
        case 'raw':
          callbackData = options;
          break;
        default:
          form.append('file', options.file)
          callbackData = form;
      }
      props.uploadApi?.(callbackData).then(() => {
        uploading.value = false;
        context.emit('success');
        context.emit('update:modelValue', false);
      }).catch(() => {
        uploading.value = false;
        context.emit('error');
      }).finally(() => {
        upload.clearFiles();
        // upload.uploadFiles = [];
      })
    }
    function handleDownloadTemplate() {
      props.templateApi?.();
    }
    return {
      dialogVisible,
      uploading,
      uploadRef,

      uploadFile,
      handleDownloadTemplate
    }
  }
})
</script>
