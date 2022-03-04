<template>
  <p><bc-date-picker v-model="value" /></p>
  <p><bc-date-picker v-model="value" width="200px" /></p>
  <p><bc-date-picker v-model="value" :width="200" /></p>
  <p><bc-date-picker v-model="value" width="20vw" /></p>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref('')
</script>
