<template>
  <bc-input v-model="text" :copy="{ size: 20, color: 'red' }" >
    <template #icon>
      <checked />
    </template>
  </bc-input>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Basic',
})
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import { Checked } from '@element-plus/icons-vue'
const text = ref('')
</script>