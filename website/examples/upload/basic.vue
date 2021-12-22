<template>
  <bc-button @click="visible = true">上传</bc-button>
  <bc-upload v-model="visible" :upload-api="upload" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'basic',
})
</script>

<script lang="ts" setup>
import { ref } from 'vue'
const visible = ref(false)
function upload(form: FormData) {
  console.log(form.get('file'))
  return Promise.resolve()
}
</script>