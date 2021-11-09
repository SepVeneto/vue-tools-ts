<template>
  <div class="App">
    <VPSidebar />
    <div>
      <div class="app-main">
        <VPContent  class="main-docs" style="max-width: 60rem;" />
        <VPCatalog v-if="page.headers" />
      </div>
    </div>
    <Debug />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'VPApp',
})
</script>

<script lang="ts" setup>
import { useData } from 'vitepress'
import VPContent from './vp-content.vue'
import VPSidebar from './vp-sidebar.vue'
import VPCatalog from './vp-catalog.vue'
const { page } = useData();
</script>

<style lang="scss" scoped>
.App {
  display: flex;
}
.app-main {
  display: flex;
  // max-width: 60rem;
  .constant {
    width: 144px;
  }
}
.main-docs > :deep(div > table) {
  width: 100%;
  border-spacing: 0;
  thead th {
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  tbody td {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    max-width: 240px;
    white-space: pre-wrap;
    word-break: break-word;
  }
}
</style>
