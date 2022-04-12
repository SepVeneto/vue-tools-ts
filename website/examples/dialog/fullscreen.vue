<template>
  <bc-button @click="handleOpen">打开对话框</bc-button>
  <bc-dialog
    title="对话框"
    v-model="visible"
    @submit="handleSubmit"
    need-fullscreen
  >
    <div style="height: 200vw; background-image: linear-gradient(to bottom, #fff, crimson);"></div>
  </bc-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const visible = ref(false)
function handleOpen() {
  visible.value = true;
}
function handleSubmit() {
  visible.value = false;
}
</script>
