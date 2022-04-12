<template>
  <bc-button @click="handleOpen">打开对话框</bc-button>
  <bc-dialog
    title="对话框"
    v-model="visible"
  >
    <div>body</div>
    <template #footer>
      <bc-button @click="handleClose">关闭</bc-button>
    </template>
  </bc-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const visible = ref(false)
function handleOpen() {
  visible.value = true;
}
function handleClose() {
  visible.value = false;
}
</script>
