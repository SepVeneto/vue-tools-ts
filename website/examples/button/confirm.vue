<template>
  <bc-button type="danger" @click="handleRemove">删除</bc-button>
  <bc-button
    @click="handleRemove"
    confirm="自定义警告内容"
    style="margin-left: 20px"
  >自定义警告内容</bc-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Confirm',
})
</script>

<script lang="ts" setup>
function handleRemove() {
  console.log('trigger remove')
}
</script>