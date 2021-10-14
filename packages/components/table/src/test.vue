<template>
  <dynamic-form :config="config" ></dynamic-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: "test"
})
</script>

<script lang="ts" setup>
const config = {"data":[{"type":"text","label":"文本","prop":"text-1633763474567"},{"type":"text","label":"文本","prop":"text-1633763475429"}],"config":{}}
</script>