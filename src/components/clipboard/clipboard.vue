<template>
  <div @click="handleClick"><slot /></div>
</template>

<script lang="ts">
import { copyText } from '../_util/tools';
import { defineComponent, getCurrentInstance } from 'vue';
import { clipboardProps } from './type';
export default defineComponent({
  name: 'BcClipboard',
  props: clipboardProps,
  setup(props) {
    const inst = getCurrentInstance();
    const $message = inst?.appContext.config.globalProperties.$message;
    function handleClick() {
      let text = '';
      if (props.text) {
        text = props.text;
      } else {
        if (!props.dom) {
          console.warn('非法选择器')
          return;
        }
        const contentDom = document.body.querySelector(props.dom);
        text = contentDom?.textContent || (contentDom as HTMLInputElement)?.value;
      }
      copyText(text).then(() => {
        props.success?.();
        $message.success(props.message)
      }).catch(err => {
        console.error(err)
      })
    }
    return {
      handleClick
    }
  },
})
</script>