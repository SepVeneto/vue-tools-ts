<template>
  <bc-input v-model="text" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Basic',
})
</script>

<script lang="ts" setup>
import { ref } from 'vue'
const text = ref('')
</script>
