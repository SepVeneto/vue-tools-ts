<template>
  <div class="code-container">
    <div
      class="language-vue"
      v-html="decode"
    ></div>
    <div class="copy-button" @click="handleCopy">
      <el-icon :size="24" v-if="!copied"><copy-document /></el-icon>
      <el-tooltip content="复制成功" v-else>
        <el-icon :size="24" color="#67C23A"><check /></el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { copyText } from '@basic-components/utils'
export default defineComponent({
  name: 'VPSourceCode',
})
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import { CopyDocument, Check } from '@element-plus/icons-vue'
const props = defineProps({
  rawSource: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  }
})
const decode = computed(() => {
  return decodeURIComponent(props.source)
})
const copied = ref(false)
function handleCopy() {
  if (copied.value) {
    return;
  }
  copyText(decodeURIComponent(props.rawSource)).then(() => {
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1000)
  })
}
</script>

<style lang="scss" scoped>
.copy-button {
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.24s linear;
  position: absolute;
  right: 50px;
  top: 10px;
  z-index: 1;
}
.code-container {
  margin: 1rem -1.5rem;
  position: relative;
  overflow: hidden;
  &:hover .copy-button {
    opacity: 1;
  }
}
</style>
