<template>
  <p><bc-date-picker v-model="defaultValue" day-end type="datetimerange" /></p>
  <p><bc-date-picker v-model="value" day-end type="datetimerange" /></p>
  <p><bc-date-picker v-model="value" :default-time="defaultTime" type="datetimerange" /></p>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref([])
const defaultTime = ['08:30:00', '17:30:00']
const defaultValue = ref(['2022-03-04', '2022-03-05'])
</script>
