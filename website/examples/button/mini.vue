<template>
  <bc-button
    :icon="Edit"
    mini
    tooltip
    type="primary"
    size="small"
  >编辑</bc-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Mini',
})
</script>

<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue'
console.log(Edit)
</script>