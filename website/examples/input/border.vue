<template>
  <bc-input v-model="text" width="183px" class="input" />
  <bc-input v-model="text" border="bottom" width="183px" class="input" />
  <bc-input v-model="text" border="none" width="183px" class="input" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Border',
})
</script>

<script lang="ts" setup>
import { ref } from 'vue'
const text = ref('border-setting')
</script>

<style lang="scss" scoped>
.input:not(:last-child) {
  margin-right: 20px;
}
</style>
